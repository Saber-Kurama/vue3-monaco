export const addCssUtils = (val: string | number) => {
  val.toString().endsWith;
  if (/.*(px|rem|%)/i.test(val.toString())) {
    return val;
  }
  if (!isNaN(Number.parseFloat(val.toString()))) {
    return `${val}px`;
  }
  return val;
};