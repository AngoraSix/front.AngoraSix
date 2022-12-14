const _mapFlatParam = ([field, value]) => {
  if (!field.includes('.')) {
    return {
      [field]: value,
    };
  } else {
    let separatorIndex = field.indexOf('.'),
      [singleParam, flatParam] = [
        field.slice(0, separatorIndex),
        field.slice(separatorIndex + 1),
      ];
    return {
      [singleParam]: _mapFlatParam([flatParam, value]),
    };
  }
};

const _isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const _resolveKey = (key) => {
  let normalizedKey = key;
  let extractedIndex = key.match(/([^[]+(?=]))/g);

  if (extractedIndex && extractedIndex.length) {
    extractedIndex = extractedIndex[0];
    normalizedKey = key.replace(`[${extractedIndex}]`, '');
  }
  return [normalizedKey, extractedIndex];
};

export function _mergeDeep(target, targetIndex = null, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (_isObject(target) && _isObject(source)) {
    for (const key in source) {
      const [normalizedKey, keyIndex] = _resolveKey(key);
      if (_isObject(source[key])) {
        if (!target[normalizedKey])
          Object.assign(target, { [normalizedKey]: keyIndex ? [{}] : {} });
        _mergeDeep(target[normalizedKey], keyIndex, source[key]);
      } else {
        Object.assign(target, {
          [normalizedKey]: keyIndex ? [source[key]] : source[key],
        });
      }
    }
  } else if (
    Array.isArray(target) &&
    targetIndex != null &&
    _isObject(source)
  ) {
    for (const key in source) {
      const [normalizedKey, keyIndex] = _resolveKey(key);
      if (target[targetIndex] == null) {
        target[targetIndex] = keyIndex ? [{}] : {};
      }
      if (_isObject(source[key])) {
        if (!target[targetIndex][normalizedKey])
          Object.assign(target[targetIndex], {
            [normalizedKey]: keyIndex ? [{}] : {},
          });
        _mergeDeep(target[targetIndex][normalizedKey], keyIndex, source[key]);
      } else {
        Object.assign(target[targetIndex], {
          [normalizedKey]: keyIndex ? [source[key]] : source[key],
        });
      }
    }
  }

  return _mergeDeep(target, null, ...sources);
}

export const createObjectFromFlatParams = (flatObject) => {
  return Object.entries(flatObject)
    .filter(([, value]) =>
      Array.isArray(value) ? value.length : value != null
    )
    .reduce(
      (output, field) => _mergeDeep(output, null, _mapFlatParam(field)),
      {}
    );
};

export const createObjectWithFlatParams = (deepObject) => {
  let result = {};
  for (const field in deepObject) {
    if (Array.isArray(deepObject[field])) {
      deepObject[field].forEach((arrayValue, i) => {
        const temp =
          arrayValue.toFormData?.() || createObjectWithFlatParams(arrayValue);
        if (temp.toFormData) {
          result[`${field}[${i}]`] = temp;
        } else {
          for (const innerField in temp) {
            result[`${field}[${i}].${innerField}`] = temp[innerField];
          }
        }
      });
    } else if (typeof deepObject[field] === 'object') {
      const temp =
        deepObject[field].toFormData?.() ||
        createObjectWithFlatParams(deepObject[field]);
      if (temp.toFormData) {
        result[field] = temp;
      } else {
        for (const innerField in temp) {
          result[field + '.' + innerField] = temp[innerField];
        }
      }
    } else {
      result[field] = deepObject[field];
    }
  }
  // check properties that have "getters"
  Object.entries(
    Object.getOwnPropertyDescriptors(Object.getPrototypeOf(deepObject))
  ).forEach(([protoFieldKey, protoFieldValue]) => {
    if (
      typeof protoFieldValue === 'object' &&
      protoFieldValue.get &&
      !protoFieldKey.startsWith('_')
    ) {
      const fieldValue = protoFieldValue.get.call(deepObject);
      if (Array.isArray(fieldValue)) {
        fieldValue.forEach((arrayValue, i) => {
          const temp =
            arrayValue.toFormData?.() || createObjectWithFlatParams(arrayValue);
          if (temp.toFormData) {
            result[`${protoFieldKey}[${i}]`] = temp;
          } else {
            for (const innerField in temp) {
              result[`${protoFieldKey}[${i}].${innerField}`] = temp[innerField];
            }
          }
        });
      } else if (typeof fieldValue === 'object') {
        const temp =
          fieldValue.toFormData?.() || createObjectWithFlatParams(fieldValue);
        if (temp.toFormData) {
          result[protoFieldKey] = temp;
        } else {
          for (const j in temp) {
            result[protoFieldKey + '.' + j] = temp[j];
          }
        }
      } else {
        result[protoFieldKey] = fieldValue;
      }
    }
  });
  return result;
};

export const asArray = (potentialObject, ifNull = potentialObject) => {
  if (potentialObject != null) {
    return Array.isArray(potentialObject) ? potentialObject : [potentialObject];
  } else {
    return ifNull;
  }
};

const _createIfNotOfType = (input, Type) =>
  input instanceof Type ? input : new Type(input);

export const toType = (input, Type, toSingleElement = false) => {
  if (input == null) return input;
  if (Array.isArray(input)) {
    input = asArray(input, []);
    input = input.map((i) =>
      i instanceof Type ? i : _createIfNotOfType(i, Type)
    );
    return toSingleElement && input.length ? input[0] : input;
  } else {
    return input instanceof Type ? input : _createIfNotOfType(input, Type);
  }
};
