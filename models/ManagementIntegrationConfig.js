export default class ManagementIntegrationConfig {
  constructor({ sourceStrategyConfigData }) {
    this.sourceStrategyConfigData = sourceStrategyConfigData;
  }
  
  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}sourceStrategyConfigData`]: this.sourceStrategyConfigData,
    };
  }

  toJSON() {
    return {
      sourceStrategyConfigData: this.sourceStrategyConfigData,
    };
  }
}
