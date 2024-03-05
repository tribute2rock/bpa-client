export function getObjectValueByPath(obj, path) {
  const keys = path.split(".");
  let currentObj = obj;

  for (const key of keys) {
    if (currentObj.hasOwnProperty(key)) {
      currentObj = currentObj[key];
    } else {
      // Handle invalid path or missing keys as needed.
      return undefined;
    }
  }

  return currentObj;
}