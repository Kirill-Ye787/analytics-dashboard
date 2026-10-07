import { CATEGORIES } from './constants.js';
import { percentChange } from './formatters.js';

export function periodBounds(period, offset = 0, now = new Date()) {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  if (period === 'year') {
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 11 - offset * 12, 1);
    const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1 - offset * 12, 1);
    return { start, end };
  }
  const days = { today: 1, week: 7, month: 30 }[period] ?? 30;
  const end = midnight + 86400000 - offset * days * 86400000;
  return { start: end - days * 86400000, end };
}

export function inPeriod(value, period, offset = 0, now) {
  const time = new Date(value).getTime();
  const { start, end } = periodBounds(period, offset, now);
  return time >= start && time < end;
}

export function filterProducts(products, filters) {
  return products.filter(product => filters.categories.includes(product.category)
    && product.price <= filters.maxPrice && filters.regions.includes(product.region));
}

export function filterOrders(orders, products, filters, period, { includeArchived = false, offset = 0 } = {}) {
  const productIds = new Set(filterProducts(products, filters).map(product => product.id));
  return orders.filter(order => productIds.has(order.productId)
    && filters.regions.includes(order.region)
    && (includeArchived || !order.archived) && inPeriod(order.date, period, offset));
}

export function getMetrics(snapshot, filters, period, offset = 0) {
  const orders = filterOrders(snapshot.orders, snapshot.products, filters, period, { offset });
  const completed = orders.filter(order => order.status === 'completed');
  const revenue = completed.reduce((sum, order) => sum + order.amount, 0);
  return {
    revenue, orders: orders.length,
    users: snapshot.users.filter(user => filters.regions.includes(user.region)
      && inPeriod(user.registeredAt, period, offset)).length,
    stock: filterProducts(snapshot.products, filters).reduce((sum, product) => sum + product.stock, 0),
    averageOrder: completed.length ? revenue / completed.length : 0,
    conversion: orders.length ? completed.length / orders.length * 100 : 0,
  };
}

export function getStats(snapshot, filters, period) {
  const current = getMetrics(snapshot, filters, period);
  const previous = getMetrics(snapshot, filters, period, 1);
  return Object.keys(current).reduce((result, key) => ({
    ...result, [key]: { value: current[key], change: key === 'stock' ? 0 : percentChange(current[key], previous[key]) },
  }), {});
}

export function buildChartData(snapshot, filters, period) {
  const { start, end } = periodBounds(period);
  const count = { today: 12, week: 7, month: 30, year: 12 }[period] ?? 30;
  const points = Array.from({ length: count }, (_, index) => {
    const time = period === 'year'
      ? Date.UTC(new Date(start).getUTCFullYear(), new Date(start).getUTCMonth() + index, 1)
      : start + index * ((end - start) / count);
    const label = new Intl.DateTimeFormat('uk-UA', period === 'today'
      ? { hour: '2-digit', timeZone: 'UTC' }
      : period === 'year' ? { month: 'short', timeZone: 'UTC' }
        : { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(time);
    return { time, label, total: 0, ...Object.fromEntries(CATEGORIES.map(category => [category.id, 0])) };
  });
  const catalog = new Map(snapshot.products.map(product => [product.id, product]));
  filterOrders(snapshot.orders, snapshot.products, filters, period).forEach(order => {
    if (order.status !== 'completed') return;
    const time = new Date(order.date).getTime();
    const index = Math.max(0, points.findLastIndex(point => point.time <= time));
    points[index][catalog.get(order.productId).category] += order.amount;
    points[index].total += order.amount;
  });
  return points;
}
