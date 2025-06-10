/**
 * Subscribe a user to Mailchimp
 * @param {string} email - User's email address
 * @param {object} additionalFields - Additional fields to send to Mailchimp
 * @returns {Promise} - Promise resolving to the Mailchimp API response
 */
export const subscribeToMailchimp = async (email, additionalFields = {}) => {
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        ...additionalFields,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error)
    throw error
  }
}

/**
 * Format Mailchimp merge fields
 * @param {object} fields - Fields to format
 * @returns {object} - Formatted merge fields
 */
export const formatMergeFields = (fields) => {
  const mergeFields = {}

  if (fields.firstName) {
    mergeFields.FNAME = fields.firstName
  }

  if (fields.lastName) {
    mergeFields.LNAME = fields.lastName
  }

  if (fields.planType) {
    mergeFields.PLANTYPE = fields.planType
  }

  if (fields.source) {
    mergeFields.SOURCE = fields.source
  }

  return mergeFields
}
