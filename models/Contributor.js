import { toType } from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import Media from './Media';

export default class Contributor {
  constructor(contributorObject) {
    const {
      id,
      providerUsers,
      email,
      firstName,
      lastName,
      profileMedia,
      headMedia
    } = contributorObject;

    this.id = id;
    this.contributorId = id;
    this.providerUsers = providerUsers;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileMedia = toType(profileMedia, Media, true);
    this.headMedia = toType(headMedia, Media, true);
    this.actions = processHateoasActions(contributorObject);
  }


  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
