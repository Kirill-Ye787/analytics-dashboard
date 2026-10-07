import { createContext, useCallback, useMemo, useRef, useState, useTransition } from 'react';
import { fetchAnalyticsData, getSnapshot, loadDashboardData } from '../utils/api.js';

export const DataContext = createContext(null);
export function DataProvider({ children }) {
  const [data, setData] = useState(getSnapshot);
  const [period, setPeriod] = useState('month');
  const [version, setVersion] = useState(0);
  const [refreshError, setRefreshError] = useState('');
  const [isRefreshing, startTransition] = useTransition();
  const promiseCache = useRef(new Map());
  const bumpVersion = useCallback(() => setVersion(current => current + 1), []);
  const commitOrder = useCallback(order => {
    setData(current => ({ ...current, orders: current.orders.map(item => item.id === order.id ? order : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitProduct = useCallback(product => {
    setData(current => ({ ...current, products: current.products.map(item => item.id === product.id ? product : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitSale = useCallback(({ sale, product }) => {
    setData(current => ({ ...current, orders: [sale, ...current.orders],
      products: current.products.map(item => item.id === product.id ? product : item) }));
    bumpVersion();
  }, [bumpVersion]);
  const commitUser = useCallback(user => {
    setData(current => ({ ...current, users: [user, ...current.users] }));
    bumpVersion();
  }, [bumpVersion]);
  const getAnalyticsPromise = useCallback((key, selectedPeriod, filters, forceError) => {
    const cache = promiseCache.current;
    if (!cache.has(key)) {
      if (cache.size > 30) cache.clear();
      const promise = fetchAnalyticsData(selectedPeriod, filters, { forceError });
      // Зберігаємо саме початковий Promise; use() передає помилку ErrorBoundary.
      promise.catch(() => {});
      cache.set(key, promise);
    }
    return cache.get(key);
  }, []);
  const refreshData = useCallback(() => {
    setRefreshError('');
    startTransition(async () => {
      try {
        const snapshot = await loadDashboardData();
        startTransition(() => { setData(snapshot); promiseCache.current.clear(); bumpVersion(); });
      } catch (error) { setRefreshError(error.message); }
    });
  }, [bumpVersion]);
  const value = useMemo(() => ({
    ...data, period, setPeriod, version, isRefreshing, refreshError, refreshData,
    commitOrder, commitProduct, commitSale, commitUser, getAnalyticsPromise,
  }), [data, period, version, isRefreshing, refreshError, refreshData, commitOrder, commitProduct, commitSale, commitUser, getAnalyticsPromise]);
  return <DataContext value={value}>{children}</DataContext>;
}
