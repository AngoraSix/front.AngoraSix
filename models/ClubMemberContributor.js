import { toType } from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import Media from './Media';

export default class ClubMemberContributor {
  constructor(memberContributorObject) {
    const {
      id,
      contributorId,
      roles,
      data,
      status,
      providerUsers,
      email,
      firstName,
      lastName,
      profileMedia,
      headMedia
    } = memberContributorObject;

    this.id = id;
    this.contributorId = contributorId;
    this.roles = roles;
    this.data = data;
    this.status = status;
    this.providerUsers = providerUsers;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileMedia = toType(profileMedia, Media, true);
    this.headMedia = toType(headMedia, Media, true);
    this.actions = processHateoasActions(memberContributorObject);
  }


  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
