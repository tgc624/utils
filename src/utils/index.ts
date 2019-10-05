export const isString = (obj: any): obj is string =>
  typeof obj === "string" || obj instanceof String;

export const yyyymmdd2date = (yyyymmdd: string): Date => {
  if (!(isString(yyyymmdd) && yyyymmdd.length === 8)) {
    return new Date();
  }
  const year: number = +yyyymmdd.substring(0, 4);
  const month: number = +yyyymmdd.substring(4, 6);
  const date: number = +yyyymmdd.substring(6, 8);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(date)) {
    return new Date();
  }
  return new Date(year, month - 1, date);
};

export const isCopyable = (): boolean =>
  !!(navigator && navigator.clipboard && navigator.clipboard.writeText);
