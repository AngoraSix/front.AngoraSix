
const LOGO_IMAGE_URI = '/logos/a6-white-500.png';
const LOGO_DARK_IMAGE_URI = '/logos/a6-blue.png';
const LOGO_SQUARE_IMAGE_URI = '/logos/a6-square-1000.png';

class Site {
  constructor(env) {
    this.head = {
      title: 'AngoraSix',
      description: 'Live doing what you love',
      image: { logo: LOGO_IMAGE_URI, logoDark: LOGO_DARK_IMAGE_URI, logoSquare: LOGO_SQUARE_IMAGE_URI },
    };
  }
}

export default Site;
