const LOGO_IMAGE_URI = '/logos/a6-white-500.png';

class Site {
  constructor(env) {
    this.head = {
      title: 'AngoraSix',
      description: 'Live doing what you love',
      image: { logo: LOGO_IMAGE_URI },
    };
  }
}

export default Site;
