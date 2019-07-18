
export function combineClasses(...arr: any[]|string[]|undefined[]|null[]): string {
  return arr.filter((val) => !!val).join(' ');
}

/**
 * Removes null or undefined properties from the given object.
 * @param obj A new object with null or undefined properties taken out.
 */
export function stripOptionals(obj: object): object {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export function log(message: any, ...optionalParams: any[]) {
  // tslint:disable-next-line:no-console
  console.log(message, optionalParams);
}
