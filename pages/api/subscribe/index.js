import config from "../../../config"
import { formatMergeFields } from "../../../utils/mailchimp"

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, ...additionalFields } = req.body

  // Validate email
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" })
  }

  try {
    // Prepare data for Mailchimp API
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: formatMergeFields(additionalFields),
    }

    // Make request to Mailchimp API
    const response = await fetch(`https://${config.mailchimp.serverPrefix}.api.mailchimp.com/3.0/lists/${config.mailchimp.audienceId}/members`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${config.mailchimp.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    // Handle already subscribed users
    if (response.status === 400 && responseData.title === "Member Exists") {
      return res.status(200).json({ success: true, message: "Already subscribed" })
    }

    if (response.status >= 400) {
      return res.status(400).json({ error: responseData.detail || "Error subscribing to the newsletter" })
    }

    return res.status(201).json({ success: true, message: "Successfully subscribed" })
  } catch (error) {
    console.error("Mailchimp subscription error:", error)
    return res.status(500).json({ error: "Error subscribing to the newsletter" })
  }
}
