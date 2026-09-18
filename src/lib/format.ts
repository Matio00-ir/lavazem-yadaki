const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toFaDigits = (input: string | number) =>
  String(input).replace(/[0-9]/g, (d) => faDigits[Number(d)]);

export const formatToman = (value: number) => toFaDigits(value.toLocaleString("en-US"));

export const formatPrice = (value: number) => `${formatToman(value)} تومان`;

export const discountPercent = (price: number, oldPrice?: number) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};
