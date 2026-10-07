import { useOptimistic, useRef, useState, useTransition } from 'react';
import { archiveOrder, updateOrderStatus } from '../actions/orderActions.js';

export function optimisticOrderReducer(orders, { id, patch }) {
  return orders.map(order => order.id === id ? { ...order, ...patch, saving: true } : order);
}
export default function useOptimisticOrder(orders, commitOrder) {
  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(orders, optimisticOrderReducer);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const inFlight = useRef(new Set());
  function mutate(id, patch, request) {
    if (inFlight.current.has(id)) return;
    inFlight.current.add(id);
    setError('');
    // Optimistic setter обов’язково всередині Action/transition.
    startTransition(async () => {
      updateOptimisticOrders({ id, patch });
      try {
        const updated = await request();
        // Оновлення після await теж явно позначаємо transition.
        startTransition(() => commitOrder(updated));
      } catch (requestError) {
        setError(requestError.message);
        // Базовий orders не змінено — React автоматично відкочує UI.
      } finally { inFlight.current.delete(id); }
    });
  }
  return {
    optimisticOrders, isPending, error,
    changeStatus: (id, status, forceError) => mutate(id, { status }, () => updateOrderStatus(id, status, { forceError })),
    changeArchive: (id, archived, forceError) => mutate(id, { archived }, () => archiveOrder(id, archived, { forceError })),
  };
}
