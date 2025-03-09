import moment from 'moment';

export default class SourceSyncStatus {
  constructor({ status, expirationDate }) {
    this.status = status;
    this.expirationDate = expirationDate && moment(expirationDate);
  }
}
