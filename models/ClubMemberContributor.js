import { toType } from '../utils/helpers';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';
import Media from './Media';
import Contributor from './Contributor';

export default class ClubMemberContributor extends Contributor {
  constructor(memberContributorObject) {
    super(memberContributorObject);
    const {
      contributorId,
      roles,
      data,
      status,
    } = memberContributorObject;
    this.contributorId = contributorId;
    this.roles = roles;
    this.data = data;
    this.status = status;
  }


  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
