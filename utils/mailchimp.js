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
  console.log("Formatting merge fields:", fields, user)

  if (fields.firstName || user?.givenName) {
    mergeFields.FNAME = fields.firstName || user?.givenName
  }

  if (fields.lastName || user?.familyName) {
    mergeFields.LNAME = fields.lastName || user?.familyName
  }

  if (fields.source) {
    mergeFields.SOURCE = fields.source
  }

  if (user) {
    mergeFields.CONTR_ID = user.id
  }

  if (fields.newsletterList) {
    mergeFields.L_NEWS = "YES"
  }

  if (fields.betaList) {
    mergeFields.L_BETA = "YES"
  }

  return mergeFields
}
