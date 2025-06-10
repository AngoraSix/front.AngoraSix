// Utility functions for Google Analytics and Google Ads tracking
import config from "../config";

/**
 * Track a page view in Google Analytics
 * @param {string} url - The URL to track
 */
export const trackPageView = (url) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("config", config.google.measurementId, {
      page_path: url,
    })
  }
}

/**
 * Track an event in Google Analytics
 * @param {string} action - The action name
 * @param {object} params - Event parameters
 */
export const trackEvent = (action, params = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", action, params)
  }
}

/**
 * Track a conversion in Google Ads
 * @param {string} conversionLabel - The conversion label
 */
export const trackConversion = (conversionLabel = config.google.conversionLabel) => {
  if (
    typeof window !== "undefined" &&
    typeof window.gtag !== "undefined" &&
    config.google.conversionId
  ) {
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
