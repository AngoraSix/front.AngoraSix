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

export const resolveRoute = (route, ...args) => {
  const isAbsoluteUrl = new RegExp('^(?:[a-z+]+:)?//', 'i');
  if (isAbsoluteUrl.test(route)) {
    const absUrl = new URL(route);
    return `${absUrl.protocol}//${absUrl.host}${replacePathParams(
      absUrl.pathname,
      ...args
    )}`;
  } else {
    return replacePathParams(route, ...args);
  }
};

const replacePathParams = (path, ...args) => {
  return args.reduce(
    // replace each path pattern
    (url, replaceString) => url.replace(/:\w+/, replaceString),
    path
  );
};

export const ROUTES = {
  projects: {
    management: {
      view: '/projects/:projectId/management',
      landing: '/',
    },
  },
  profile: {
    view: '/profile/:profileId',
  },
};

export const HEADERS = {
  messages: {
    error: 'A6-REDIRECT-ERROR-MESSAGE',
  },
};
