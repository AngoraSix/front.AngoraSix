export const hateoasFormToActions = (hateoasResponse = {}) => {
  const actions = hateoasResponse._links;
  Object.entries(hateoasResponse._templates || {}).forEach(
    ([key, template]) => {
      if (key !== 'default') {
        actions[key] = {
          ...actions[key],
          template: {
            fields: template.properties?.map((p) =>
              hateoasPropertyToFieldMakerField(p)
            ),
            ...template
          },
        };
      }
    }
  );
  return actions || {};
};

const hateoasPropertyToFieldMakerField = (hateoasProperty) => ({
  key: hateoasProperty.name,
  label: hateoasProperty.name,
  type: hateoasProperty.type,
});
