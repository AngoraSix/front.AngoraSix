
const LOGO_IMAGE_URI = '/logos/a6-white-500.png';
const LOGO_DARK_IMAGE_URI = '/logos/a6-blue.png';

class Site {
  constructor(env) {
    this.head = {
      title: 'AngoraSix',
      description: 'Live doing what you love',
      image: { logo: LOGO_IMAGE_URI, logoDark: LOGO_DARK_IMAGE_URI },
    };
  }
}

export default Site;
