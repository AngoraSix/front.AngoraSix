import StackoverflowLogo from '../public/logos/thirdparty/stackoverflow.svg';
import TrelloLogo from '../public/logos/thirdparty/trello.svg';

export const PROFILE_ATTRIBUTES = {
  headImage: {
    key: 'headImage',
    label: 'head image',
  },
  headImageThumbnail: {
    key: 'headImage.thumbnail',
    label: 'head image',
  },
  profilePicture: {
    key: 'picture',
    label: 'profile picture',
  },
  profilePictureThumbnail: {
    key: 'picture.thumbnail',
    label: 'profile picture',
  },
};

export const ROUTES = {
  home: "/",
  about: "/about",
  pricing: "/pricing",
  services: "/services",
  auth: {
    signin: '/auth/signin',
  },
  projects: {
    management: {
      view: '/projects/:projectId/management',
      landing: '/',
      new: '/projects/:projectId/management/new',
    },
  },
  management: {
    dashboard: '/managements/:managementId',
    integrations: {
      view: '/managements/:managementId/integrations',
      sourceSync: {
        finish: '/managements/:managementId/integrations/:sourceSyncId/finish',
        usersMatch: '/managements/:managementId/integrations/:sourceSyncId/match-users',
      },
    },
    contributors: '/managements/:managementId/contributors',
    decisions: '/managements/:managementId/decisions',
    financial: '/managements/:managementId/financial',
    new: '/managements/new',
  },
  profile: {
    view: '/profile/:profileId',
  },
  welcome: {
    postRegistration: '/welcome/post-registration',
    venture: '/welcome/venture',
    "community-driven": '/welcome/community-driven',
    manager: '/welcome/manager',
    contributor: '/welcome/contributor',
    ideas: '/welcome/ideas',
    root: "/"
  },
  legal: {
    termsAndConditions: '/legal/terms-and-conditions',
  },
};

export const HEADERS = {
  messages: {
    error: 'A6-REDIRECT-ERROR-MESSAGE',
  },
};

export const THIRD_PARTY = {
  trello: {
    logo: TrelloLogo,
    name: 'Trello',
    color: '#0079BF'
  },
  stackoverflow: {
    logo: StackoverflowLogo,
    name: 'Stackoverflow',
    color: '#F7A664'
  },
}

// Google Calendar Configuration
export const GOOGLE_CALENDAR = {
  EMBED_BASE_URL: "https://calendar.google.com/calendar/appointments/schedules/:googleCalendarId?gv=true",
  STYLE: 'border: 0',
  WIDTH: "100%",
  HEIGHT: "100%",
  FRAMEBORDER: "0",

  // // Replace this with your actual Google Calendar ID
  // CALENDAR_ID: "your-calendar-id@gmail.com",
  // // Calendar embed URL - you can customize the view, colors, etc.
  // EMBED_BASE_URL: "https://calendar.google.com/calendar/embed",
  // // Booking page URL if you prefer to use Google Calendar's booking page
  // BOOKING_URL: "https://calendar.google.com/calendar/u/0/appointments/schedules/YOUR_SCHEDULE_ID",
  // // Default settings for the embedded calendar
  // DEFAULT_SETTINGS: {
  //   height: "600",
  //   wkst: "1", // Week starts on Monday
  //   bgcolor: "%23ffffff",
  //   ctz: "America/New_York", // Change to your timezone
  //   showTitle: "0",
  //   showNav: "1",
  //   showDate: "1",
  //   showPrint: "0",
  //   showTabs: "0",
  //   showCalendars: "0",
  //   showTz: "0",
  //   mode: "AGENDA", // MONTH, WEEK, AGENDA
  // },
}