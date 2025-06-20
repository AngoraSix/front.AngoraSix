// Enhanced utility functions for Google Analytics and Google Ads tracking
import config from "../config"

/**
 * Track a page view in Google Analytics
 * @param {string} url - The URL to track
 */
export const trackPageView = (url) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("config", config.google.analyticsPropertyId, {
      page_path: url,
    })
  }
}

/**
 * Track a custom event in Google Analytics
 * @param {string} eventName - The event name
 * @param {object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, parameters)
  }
}

/**
 * Track a conversion in Google Ads
 * @param {string} conversionLabel - The conversion label
 */
export const trackConversion = (conversionLabel = config.google.conversionLabel) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined" && config.google.conversionId) {
    window.gtag("event", "conversion", {
      send_to: `${config.google.conversionId}/${conversionLabel}`,
    })
  }
}

/**
 * Track a signup conversion
 */
export const trackSignupConversion = () => {
  trackConversion(config.google.conversionLabel)
  trackEvent("sign_up", {
    method: "Google",
    event_category: "engagement",
  })
}

/**
 * Track a countdown interaction
 * @param {string} location - Where the countdown is located
 */
export const trackCountdownInteraction = (location) => {
  trackEvent("countdown_interaction", {
    event_category: "engagement",
    event_label: location,
  })
}

/**
 * Track a CTA click
 * @param {string} ctaText - The text of the CTA
 * @param {string} location - Where the CTA is located
 */
export const trackCTAClick = (ctaText, location) => {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaText,
    location: location,
  })
}

/**
 * Track form submissions
 * @param {string} formName - Name of the form
 * @param {string} formLocation - Where the form is located
 */
export const trackFormSubmission = (formName, formLocation) => {
  trackEvent("form_submit", {
    event_category: "engagement",
    event_label: formName,
    form_location: formLocation,
  })
}

/**
 * Track newsletter signups
 * @param {string} location - Where the signup occurred
 */
export const trackNewsletterSignup = (location) => {
  trackEvent("newsletter_signup", {
    event_category: "engagement",
    event_label: "newsletter",
    signup_location: location,
  })
}

/**
 * Track beta program applications
 * @param {string} location - Where the application occurred
 */
export const trackBetaApplication = (location) => {
  trackEvent("beta_application", {
    event_category: "engagement",
    event_label: "beta_program",
    application_location: location,
  })
}

/**
 * Track social media clicks
 * @param {string} platform - Social media platform
 * @param {string} location - Where the click occurred
 */
export const trackSocialClick = (platform, location) => {
  trackEvent("social_click", {
    event_category: "engagement",
    event_label: platform,
    click_location: location,
  })
}

/**
 * Track landing page interactions
 * @param {string} landingType - Type of landing page (contributor, manager, etc.)
 * @param {string} action - Action taken
 */
export const trackLandingInteraction = (landingType, action) => {
  trackEvent("landing_interaction", {
    event_category: "landing_pages",
    event_label: landingType,
    action: action,
  })
}

/**
 * Track authentication events
 * @param {string} action - Auth action (login, logout, register)
 * @param {string} method - Auth method (google, email, etc.)
 */
export const trackAuthEvent = (action, method = "unknown") => {
  trackEvent(action, {
    event_category: "authentication",
    method: method,
  })
}

/**
 * Track project management actions
 * @param {string} action - Management action
 * @param {string} projectType - Type of project
 */
export const trackProjectManagement = (action, projectType) => {
  trackEvent("project_management", {
    event_category: "project_actions",
    event_label: action,
    project_type: projectType,
  })
}

/**
 * Track integration events
 * @param {string} integration - Integration type (trello, github, etc.)
 * @param {string} action - Action taken
 */
export const trackIntegrationEvent = (integration, action) => {
  trackEvent("integration_event", {
    event_category: "integrations",
    event_label: integration,
    action: action,
  })
}

/**
 * Track user engagement time
 * @param {number} timeSpent - Time spent in seconds
 * @param {string} page - Page where time was spent
 */
export const trackEngagementTime = (timeSpent, page) => {
  trackEvent("engagement_time", {
    event_category: "user_engagement",
    value: timeSpent,
    custom_parameter_page: page,
  })
}

/**
 * Track scroll depth
 * @param {number} scrollPercentage - Percentage scrolled
 * @param {string} page - Page where scrolling occurred
 */
export const trackScrollDepth = (scrollPercentage, page) => {
  trackEvent("scroll", {
    event_category: "user_engagement",
    event_label: `${scrollPercentage}%`,
    page: page,
  })
}

/**
 * Track file downloads
 * @param {string} fileName - Name of downloaded file
 * @param {string} fileType - Type of file
 */
export const trackFileDownload = (fileName, fileType) => {
  trackEvent("file_download", {
    event_category: "downloads",
    event_label: fileName,
    file_type: fileType,
  })
}

/**
 * Track search events
 * @param {string} searchTerm - What was searched
 * @param {string} location - Where search occurred
 */
export const trackSearch = (searchTerm, location) => {
  trackEvent("search", {
    event_category: "site_search",
    search_term: searchTerm,
    search_location: location,
  })
}

/**
 * Track error events
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 * @param {string} page - Page where error occurred
 */
export const trackError = (errorType, errorMessage, page) => {
  trackEvent("exception", {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    page: page,
  })
}
