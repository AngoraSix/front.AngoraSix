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
  projects: {
    management: {
      view: '/projects/:projectId/management',
      landing: '/',
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
  },
  profile: {
    view: '/profile/:profileId',
  },
  landings: {
    postRegistration: '/welcome/post-registration',
  }
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
  }
}
