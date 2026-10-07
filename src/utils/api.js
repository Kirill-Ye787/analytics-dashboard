// Навчальний mock API: асинхронні запити, затримки, кеш і localStorage.
// Це клієнтські async Actions, а не справжній бекенд / Server Functions.
import { mockOrders } from '../data/mockOrders.js';
import { mockProducts } from '../data/mockProducts.js';
import { mockUsers } from '../data/mockUsers.js';
import { mockSalesData } from '../data/mockSalesData.js';
import { STATUSES, DEFAULT_FILTERS, REGIONS } from './constants.js';
import { buildChartData, filterOrders, getMetrics } from './selectors.js';
import { validateSale, validateUser } from './validation.js';

const STORAGE_KEY = 'analytics-dashboard-data-v1';
const clone = value => structuredClone(value);
const initialDatabase = () => clone({ orders: mockOrders, products: mockProducts, users: mockUsers });
function readDatabase() {
  try {
    if (typeof localStorage === 'undefined') return initialDatabase();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved?.orders) && saved.products?.length && saved.users?.length) return saved;
  } catch { /* Якщо сховище недоступне, працюємо в пам’яті. */ }
  return initialDatabase();
}
let database = readDatabase();
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const nextId = items => Math.max(0, ...items.map(item => Number(item.id))) + 1;
function persist() {
  try { if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(database)); }
  catch { /* Сховище може бути переповнене або заблоковане. */ }
}
function maybeFail(forceError, message) {
  if (forceError || Math.random() < 0.1) throw new Error(message);
}
export function getSnapshot() { return clone(database); }
export async function loadDashboardData() { await wait(650); return getSnapshot(); }

export async function updateOrderStatus(orderId, newStatus, { forceError = false } = {}) {
  if (!STATUSES.some(status => status.id === newStatus)) throw new Error('Невідомий статус.');
  await wait(1000);
  maybeFail(forceError, 'Не вдалося оновити статус. Спробуйте ще раз.');
  const order = database.orders.find(item => item.id === orderId);
  if (!order) throw new Error('Замовлення не знайдено.');
  order.status = newStatus;
  persist();
  return clone(order);
}
export async function archiveOrder(orderId, archived, { forceError = false } = {}) {
  await wait(1000);
  maybeFail(forceError, 'Не вдалося змінити архів. Зміни відкочено.');
  const order = database.orders.find(item => item.id === orderId);
  if (!order) throw new Error('Замовлення не знайдено.');
  order.archived = archived;
  persist();
  return clone(order);
}
export async function createSale(values) {
  await wait(1200);
  const errors = validateSale(values, database.products);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  const product = database.products.find(item => item.id === Number(values.product));
  const quantity = Number(values.quantity);
  const price = Math.round(Number(values.price) * 100) / 100;
  const sale = {
    id: nextId(database.orders), customer: values.customer.trim(),
    productId: product.id, product: product.name, quantity, price,
    amount: Math.round(price * quantity * 100) / 100, status: 'completed',
    date: new Date().toISOString(), region: product.region, archived: false,
  };
  product.stock -= quantity;
  product.salesCount += quantity;
  product.revenue += sale.amount;
  database.orders.unshift(sale);
  persist();
  return { success: true, message: 'Продаж додано!', sale: clone(sale), product: clone(product), errors: {} };
}
export async function checkEmailExists(email) {
  await wait(500);
  const normalized = email.trim().toLowerCase();
  return ['admin@example.com', 'test@example.com'].includes(normalized)
    || database.users.some(user => user.email.toLowerCase() === normalized);
}
export async function createUser(values) {
  await wait(1000);
  const errors = validateUser(values);
  if (Object.keys(errors).length) return { success: false, error: 'Перевірте поля форми.', errors };
  const email = values.email.trim().toLowerCase();
  // Повторна перевірка під час запису захищає від одночасних запитів.
  if (['admin@example.com', 'test@example.com'].includes(email)
    || database.users.some(user => user.email.toLowerCase() === email)) {
    return { success: false, error: 'Email вже зареєстрований.', errors: { email: 'Цей email уже використовується.' } };
  }
  const user = {
    id: nextId(database.users), name: values.name.trim(), email, role: values.role,
    isActive: true, registeredAt: new Date().toISOString(), lastActivity: new Date().toISOString(),
    region: REGIONS[0],
  };
  database.users.unshift(user);
  persist();
  return { success: true, message: 'Користувача додано!', user: clone(user), errors: {} };
}
export async function loadChartData(period, filters = DEFAULT_FILTERS) {
  await wait(900);
  // Підтримуємо також назви наборів даних з умови завдання.
  if (Object.hasOwn(mockSalesData, period)) return clone(mockSalesData[period]);
  return buildChartData(getSnapshot(), filters, period);
}
export async function loadPeriodComparison(periodA, periodB, filters) {
  await wait(950);
  const snapshot = getSnapshot();
  return [getMetrics(snapshot, filters, periodA), getMetrics(snapshot, filters, periodB)];
}
export async function fetchAnalyticsData(period, filters, { forceError = false } = {}) {
  await wait(1400);
  if (forceError) throw new Error('Тестова помилка завантаження аналітики.');
  const snapshot = getSnapshot();
  const orders = filterOrders(snapshot.orders, snapshot.products, filters, period);
  return {
    ...getMetrics(snapshot, filters, period), updatedAt: new Date().toISOString(),
    regions: filters.regions.map(region => ({
      region, revenue: orders.filter(order => order.region === region && order.status === 'completed')
        .reduce((sum, order) => sum + order.amount, 0),
    })),
    activeUsers: snapshot.users.filter(user => user.isActive && filters.regions.includes(user.region)).length,
  };
}
export async function setProductLike(productId, liked, { forceError = false } = {}) {
  await wait(800);
  maybeFail(forceError, 'Не вдалося зберегти вподобання.');
  const product = database.products.find(item => item.id === productId);
  if (!product) throw new Error('Продукт не знайдено.');
  product.liked = liked;
  persist();
  return clone(product);
}
export async function createComment(productId, text, { forceError = false } = {}) {
  await wait(1000);
  maybeFail(forceError, 'Не вдалося додати коментар. Зміни відкочено.');
  const product = database.products.find(item => item.id === productId);
  if (!product) throw new Error('Продукт не знайдено.');
  if (text.trim().length < 2 || text.trim().length > 300) throw new Error('Коментар: від 2 до 300 символів.');
  product.comments.push({ id: nextId(product.comments), text: text.trim(), date: new Date().toISOString() });
  persist();
  return clone(product);
}
