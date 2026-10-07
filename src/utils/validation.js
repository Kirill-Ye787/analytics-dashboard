export function validateSale(values, products) {
  const errors = {};
  if (values.customer.trim().length < 2) errors.customer = 'Введіть ім’я клієнта (мінімум 2 символи).';
  const product = products.find(item => item.id === Number(values.product));
  if (!product) errors.product = 'Оберіть продукт.';
  const quantity = Number(values.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) errors.quantity = 'Кількість — ціле число від 1.';
  else if (product && quantity > product.stock) errors.quantity = `У наявності лише ${product.stock} шт.`;
  const price = Number(values.price);
  if (!Number.isFinite(price) || price < 0.01 || price > 10000000) errors.price = 'Вкажіть ціну від 0,01 до 10 000 000 грн.';
  return errors;
}

export function validateUser(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Ім’я має містити мінімум 2 символи.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Введіть коректний email.';
  if (!['admin', 'user'].includes(values.role)) errors.role = 'Оберіть роль Admin або User.';
  return errors;
}
