export default class ManagementIntegrationStatus {
  constructor({ status, expirationDate }) { // expirationDate }) {
    this.status = status;
    this.expirationDate = expirationDate;
  }
  
  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}status`]: this.status,
      [`${fieldSuffix}expirationDate`]: this.expirationDate,
    };
  }

  toJSON() {
    return {
      status: this.status,
      expirationDate: this.expirationDate,
    };
  }
}
