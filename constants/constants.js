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
  welcome: {
    postRegistration: '/welcome/post-registration',
    venture: '/welcome/venture',
    cooperative: '/welcome/cooperative',
    manager: '/welcome/manager',
    contributor: '/welcome/contributor',
    root: "/"
  },
  legal:
  {
    termsAndConditions: '/legal/terms-and-conditions',
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
  },
  stackoverflow: {
    logo: StackoverflowLogo,
    name: 'Stackoverflow',
    color: '#F7A664'
  },
}
