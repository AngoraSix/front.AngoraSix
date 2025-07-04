// Utility functions for Google Analytics GA4 tracking
import config from "../config"

/**
 * Track a page view in Google Analytics
 * @param {string} url - The URL to track
 */
export const trackPageView = (url) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined" && config.google.analyticsPropertyId) {
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
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined" && config.google.analyticsPropertyId) {
    window.gtag("event", eventName, parameters)
  }
}

// ===== WELCOME LANDING EVENTS =====

/**
 * Track explore options button click
 */
export const trackExploreOptionsClick = () => {
  trackEvent("explore_options_click", {
    event_category: "engagement",
    event_label: "welcome_landing",
    page_location: "hero_section",
    value: 50,
    currency: "ARS"
  })
}

// ===== LANDING PAGES EVENTS =====

/**
 * Track CTA clicks that lead to registration/login
 * @param {string} landingType - Type of landing (contributor, cooperative, manager, team)
 * @param {string} ctaText - Text of the CTA button
 */
export const trackLandingCTAClick = (landingType, ctaText) => {
  trackEvent("landing_cta_click", {
    event_category: "engagement",
    event_label: landingType,
    cta_text: ctaText,
    conversion_intent: "registration",
    value: 500,
    currency: "ARS"
  })
}

// ===== LOGIN PAGES EVENTS =====

/**
 * Track CTA clicks that lead to registration/login
 * @param {string} landingType - Type of landing (contributor, cooperative, manager, team)
 * @param {string} ctaText - Text of the CTA button
 */
export const trackLoginClick = (forProfile) => {
  trackEvent("login_click", {
    event_category: "engagement",
    event_label: forProfile,
    conversion_intent: "registration",
    value: 4000,
    currency: "ARS"
  })
}

// ===== PRICING EVENTS =====

/**
 * Track free plan selection
 */
export const trackFreePlanClick = () => {
  trackEvent("plan_selection", {
    event_category: "engagement",
    event_label: "free_plan",
    plan_type: "free",
    conversion_intent: "registration",
    value: 500,
    currency: "ARS"
  })
}

/**
 * Track plus/premium plan selection
 */
export const trackPlusPlanClick = () => {
  trackEvent("plan_selection", {
    event_category: "engagement",
    event_label: "plus_plan",
    plan_type: "plus",
    conversion_intent: "registration",
    value: 500,
    currency: "ARS"
  })
}

// Add the following function to the "PRICING EVENTS" section

export const trackCustomPlanClick = () => {
  trackEvent("plan_selection", {
    event_category: "engagement",
    event_label: "custom_plan",
    plan_type: "custom",
    conversion_intent: "registration",
    value: 500,
    currency: "ARS"
  })
}

// ===== POST-REGISTRATION EVENTS =====

/**
 * Track beta dialog opening
 */
export const trackBetaDialogOpen = () => {
  trackEvent("beta_dialog_open", {
    event_category: "engagement",
    event_label: "post_registration",
    dialog_type: "beta_program",
    value: 5000,
    currency: "ARS"
  })
}

/**
 * Track beta form submission
 */
export const trackBetaFormSubmit = () => {
  trackEvent("beta_form_submit", {
    event_category: "conversion",
    event_label: "post_registration",
    form_type: "beta_application",
    value: 15000,
    currency: "ARS"
  })
}

/**
 * Track newsletter signup click
 */
export const trackNewsletterSignupClick = () => {
  trackEvent("newsletter_signup_click", {
    event_category: "engagement",
    event_label: "post_registration",
    signup_type: "newsletter",
    value: 3000,
    currency: "ARS"
  })
}

/**
 * Track contact message submit
 */
export const trackContactMessageSubmit = () => {
  trackEvent("contact_message_submit", {
    event_category: "engagement",
    event_label: "post_registration",
    form_type: "contact_message",
    value: 3000,
    currency: "ARS"
  })
}

/**
 * Track social media follow clicks
 * @param {string} platform - Social platform (linkedin, instagram, github, youtube)
 */
export const trackSocialFollowClick = (platform) => {
  trackEvent("social_follow_click", {
    event_category: "engagement",
    event_label: "post_registration",
    social_platform: platform,
    action_type: "follow",
    value: 100,
    currency: "ARS"
  })
}

export const trackBetaProgramClick = () => {
  trackEvent("beta_program_click", {
    event_category: "engagement",
    event_label: "pricing_page",
    value: 500,
    currency: "ARS"
  })
}