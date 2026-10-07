import test from 'node:test';
import assert from 'node:assert/strict';
import { submitSale } from '../src/actions/salesActions.js';
import { addUser } from '../src/actions/userActions.js';
import { createUser, getSnapshot, updateOrderStatus } from '../src/utils/api.js';
import { buildChartData, filterProducts, getMetrics } from '../src/utils/selectors.js';
import { percentChange } from '../src/utils/formatters.js';
import { DEFAULT_FILTERS } from '../src/utils/constants.js';

const toFormData = values => {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => form.set(key, String(value)));
  return form;
};

test('Тестових даних достатньо для пагінації та live-фільтрації', () => {
  const snapshot = getSnapshot();
  assert.equal(snapshot.orders.length, 84);
  assert.equal(snapshot.products.length, 36);
  assert.equal(snapshot.users.length, 120);
});

test('Некоректний продаж не змінює замовлення або залишки', async () => {
  const before = getSnapshot();
  const result = await submitSale(null, toFormData({ customer: 'X', product: '1', quantity: '1.5', price: '0.001' }));
  assert.equal(result.success, false);
  assert.ok(result.errors.customer);
  assert.ok(result.errors.quantity);
  assert.ok(result.errors.price);
  assert.deepEqual(getSnapshot(), before);
});

test('Успішний продаж додає замовлення та узгоджено змінює продукт', async () => {
  const before = getSnapshot();
  const product = before.products[0];
  const result = await submitSale(null, toFormData({ customer: 'Тестовий Клієнт', product: product.id, quantity: 2, price: 1000 }));
  assert.equal(result.success, true);
  const after = getSnapshot();
  assert.equal(after.orders.length, before.orders.length + 1);
  assert.equal(after.orders[0].amount, 2000);
  assert.equal(after.products[0].stock, product.stock - 2);
  assert.equal(after.products[0].salesCount, product.salesCount + 2);
  assert.equal(after.products[0].revenue, product.revenue + 2000);
});

test('Відмова API не змінює збережений статус замовлення', async () => {
  const before = getSnapshot().orders[0];
  const status = before.status === 'cancelled' ? 'completed' : 'cancelled';
  await assert.rejects(updateOrderStatus(before.id, status, { forceError: true }), /Не вдалося оновити/);
  assert.equal(getSnapshot().orders.find(order => order.id === before.id).status, before.status);
});

test('Async перевірка email нечутлива до регістру', async () => {
  const before = getSnapshot().users.length;
  const result = await addUser(null, toFormData({ name: 'Тестова Людина', email: ' ADMIN@EXAMPLE.COM ', role: 'user' }));
  assert.equal(result.success, false);
  assert.ok(result.errors.email);
  assert.equal(getSnapshot().users.length, before);
});

test('Одночасні реєстрації не створюють дублікати email', async () => {
  const values = { name: 'Новий Користувач', email: 'unique-test@example.com', role: 'user' };
  const results = await Promise.all([createUser(values), createUser(values)]);
  assert.equal(results.filter(result => result.success).length, 1);
  assert.equal(getSnapshot().users.filter(user => user.email === values.email).length, 1);
});

test('Глобальні фільтри, метрики та графік рахують однаковий дохід', () => {
  const snapshot = getSnapshot();
  const filters = { ...DEFAULT_FILTERS, categories: ['electronics'], regions: ['Київ'], maxPrice: 10000 };
  assert.ok(filterProducts(snapshot.products, filters).every(product => product.category === 'electronics' && product.region === 'Київ' && product.price <= 10000));
  const chart = buildChartData(snapshot, filters, 'year');
  assert.equal(chart.length, 12);
  assert.equal(chart.reduce((sum, point) => sum + point.total, 0), getMetrics(snapshot, filters, 'year').revenue);
  assert.equal(getMetrics(snapshot, { ...filters, categories: [] }, 'year').orders, 0);
});

test('Відсоток зміни не вигадує значення при нульовій базі', () => {
  assert.equal(percentChange(125, 100), 25);
  assert.equal(percentChange(80, 100), -20);
  assert.equal(percentChange(0, 0), 0);
  assert.equal(percentChange(10, 0), null);
});
