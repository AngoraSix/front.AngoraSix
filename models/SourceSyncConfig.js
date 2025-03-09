import SourceSyncStatusStep from './SourceSyncConfigStep';

export default class SourceSyncConfig {
  constructor({ steps, accessToken }) {
    this.accessToken = accessToken;
    this.steps = steps?.map((step) => new SourceSyncStatusStep(step));
  }
}
