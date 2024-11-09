import DataExchangeStatusStep from './DataExchangeStatusStep';

export default class DataExchangeStatus {
  constructor({ status, steps }) {
    this.status = status;
    this.steps = steps?.map((step) => new DataExchangeStatusStep(step));
  }
  
  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}status`]: this.status,
      [`${fieldSuffix}steps`]: this.steps?.map(step => step.toFormData()),
    };
  }

  toJSON() {
    return {
      status: this.status,
      steps: this.steps,
    };
  }
}
