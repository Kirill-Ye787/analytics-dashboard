import { mockOrders } from './mockOrders.js';
import { mockProducts } from './mockProducts.js';
import { mockUsers } from './mockUsers.js';
import { DEFAULT_FILTERS } from '../utils/constants.js';
import { buildChartData } from '../utils/selectors.js';

const snapshot = { orders: mockOrders, products: mockProducts, users: mockUsers };
export const mockSalesData = {
  daily: buildChartData(snapshot, DEFAULT_FILTERS, 'today'),
  weekly: buildChartData(snapshot, DEFAULT_FILTERS, 'week'),
  monthly: buildChartData(snapshot, DEFAULT_FILTERS, 'month'),
  yearly: buildChartData(snapshot, DEFAULT_FILTERS, 'year'),
};
