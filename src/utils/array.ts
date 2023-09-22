// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findDuplicatesInArray = (arr: Array<any>) => arr.filter((item, index) => arr.indexOf(item) !== index);
