import SourceSyncStatusStep from './SourceSyncStatusStep';

export default class SourceSyncStatus {
  constructor({ status, steps }) {
    this.status = status;
    this.steps = steps?.map((step) => new SourceSyncStatusStep(step));
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
