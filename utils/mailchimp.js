/**
 * Subscribe a user to Mailchimp
 * @param {string} email - User's email address
 * @param {object} additionalFields - Additional fields to send to Mailchimp
 * @returns {Promise} - Promise resolving to the Mailchimp API response
 */

/**
 * Format Mailchimp merge fields
 * @param {object} fields - Fields to format
 * @returns {object} - Formatted merge fields
 */
export const formatMergeFields = (fields, user) => {
  if (!user) {
    throw new Error("User object is required to register mailchimp subscription");
  }
  const mergeFields = {}

  if (fields.firstName || user?.givenName) {
    mergeFields.FNAME = fields.firstName || user?.givenName
  }

  if (fields.lastName || user?.familyName) {
    mergeFields.LNAME = fields.lastName || user?.familyName
  }

  mergeFields.SOURCE = "A6"

  mergeFields.CONTR_ID = user.id

  return mergeFields
}

/**
 * Format Mailchimp merge fields
 * @param {object} fields - Fields to format
 * @returns {object} - Formatted merge fields
 */
export const formatTags = (fields, user) => {
  if (!user) {
    throw new Error("User object is required to register mailchimp subscription");
  }
  const tags = [];

  if (fields.newsletterList) {
    tags.push({ name: "newsletter", status: "active" });
  }

  if (fields.betaList) {
    tags.push({ name: "beta-program", status: "active" });
  }

  return tags
}
