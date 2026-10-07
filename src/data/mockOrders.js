import { mockProducts } from './mockProducts.js';
import { mockUsers } from './mockUsers.js';

const now = Date.now();
const statuses = ['completed', 'processing', 'completed', 'pending', 'completed', 'cancelled'];

export const mockOrders = Array.from({ length: 84 }, (_, index) => {
  const product = mockProducts[index % mockProducts.length];
  const quantity = 1 + index % 3;
  return {
    id: 1084 - index,
    customer: mockUsers[index % mockUsers.length].name,
    productId: product.id, product: product.name, quantity, price: product.price,
    amount: product.price * quantity, status: statuses[index % statuses.length],
    date: new Date(now - Math.floor(index / 3) * 6 * 86400000 - (index % 3) * 3600000).toISOString(),
    region: product.region, archived: false,
  };
});
