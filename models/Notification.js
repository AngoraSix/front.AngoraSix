import moment from 'moment';
import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';

export default class Notification {
  constructor(notificationObject) {
    const {
      id,
      targetId,
      targetType,
      objectId,
      objectType,
      topic,
      isUnique,
      title,
      message,
      creationInstant,
      media,
      alertLevel,
      issuanceInstant,
      needsExplicitDismiss,
      dismissedForUser,
    } = notificationObject;
    this.id = id;
    this.targetId = targetId;
    this.targetType = targetType;
    this.objectId = objectId;
    this.objectType = objectType;
    this.topic = topic;
    this.isUnique = isUnique;
    this.title = title;
    this.message = message;
    this.creationInstant = creationInstant && moment(creationInstant);
    this.media = media;
    this.alertLevel = alertLevel;
    this.issuanceInstant = issuanceInstant && moment(issuanceInstant);
    this.needsExplicitDismiss = needsExplicitDismiss;
    this.dismissedForUser = dismissedForUser;
    this.actions = processHateoasActions(notificationObject);
  }
}
