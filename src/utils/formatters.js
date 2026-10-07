export const currency = value => new Intl.NumberFormat('uk-UA', {
  style: 'currency', currency: 'UAH', maximumFractionDigits: 0,
}).format(value);
export const number = value => new Intl.NumberFormat('uk-UA').format(value);
export const date = value => new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit', month: 'short', year: 'numeric',
}).format(new Date(value));
export const percentChange = (current, previous) => previous === 0
  ? (current === 0 ? 0 : null)
  : Math.round(((current - previous) / previous) * 1000) / 10;
