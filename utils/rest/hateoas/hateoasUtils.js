import { FieldMakerModel } from 'react-mui-fieldmaker';
import HateoasCollectionDto from './hateoasDtos';

const ADMIN_REQUIRED_KEY = 'admin';

export const processHateoasActions = (hateoasResponse = {}) => {
  const actions = hateoasResponse._links;
  Object.entries(hateoasResponse._templates || {}).forEach(
    ([key, template]) => {
      if (key !== 'default') {
        actions[key] = {
          ...actions[key],
          template: {
            fields: template.properties
              ?.filter((p) => !_isAdminProperty(p))
              .map((p) => hateoasPropertyToFieldMakerField(p)),
            ...template,
          },
          adminRequired: template.properties?.some((p) => _isAdminProperty(p)),
        };
      }
    }
  );
  return actions || {};
};

export const hateoasPropertyToFieldMakerField = (hateoasProperty) => {
  return new FieldMakerModel({
    key: hateoasProperty.key || hateoasProperty.name,
    label: hateoasProperty.name,
    type: hateoasProperty.type,

    options: hateoasProperty.options?.inline,
    config: {
      valueKey: hateoasProperty.config?.valueKey || 'value',
      labelKey: hateoasProperty.config?.labelKey || 'prompt',
    },

    withPickOneOption: hateoasProperty.withPickOneOption || false,
    pickOneOptionValue: hateoasProperty.pickOneOptionValue || null,
    pickOneOptionPrompt: hateoasProperty.pickOneOptionPrompt || 'Select',
  })
};

const _isAdminProperty = (property) => {
  return property.name === ADMIN_REQUIRED_KEY && property.type == null;
};

export const mapToHateoasCollectionDto = (
  hateoasResponse = {},
  Type,
  embeddedField
) => {
  return new HateoasCollectionDto(hateoasResponse, Type, embeddedField);
};
