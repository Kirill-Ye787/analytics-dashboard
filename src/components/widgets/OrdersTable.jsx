import { use, useId, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import useOptimisticOrder from '../../hooks/useOptimisticOrder.js';
import { PAGE_SIZE, STATUSES } from '../../utils/constants.js';
import { filterOrders } from '../../utils/selectors.js';
import { currency } from '../../utils/formatters.js';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Pagination from '../common/Pagination.jsx';

export default function OrdersTable() {
  const id = useId();
  const { orders, products, period, commitOrder } = use(DataContext);
  const { filters } = use(FilterContext);
  const { optimisticOrders, changeStatus, changeArchive, isPending, error } = useOptimisticOrder(orders, commitOrder);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [showArchive, setShowArchive] = useState(false);
  const [forceError, setForceError] = useState(false);
  const matching = useMemo(() => filterOrders(optimisticOrders, products, filters, period, { includeArchived: showArchive })
    .filter(order => Boolean(order.archived) === showArchive && (status === 'all' || order.status === status))
    .sort((a, b) => new Date(b.date) - new Date(a.date)), [optimisticOrders, products, filters, period, status, showArchive]);
  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = matching.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <section className="widget orders-widget">
    <div className="widget-heading"><div><h2>Останні замовлення</h2><p>Статуси зберігаються автоматично</p></div><span className="count-badge">{matching.length}</span></div>
    <div className="table-filters">
      <Select label="Статус" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}>
        <option value="all">Усі статуси</option>{STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </Select>
      <label className="check-label" htmlFor={`${id}-archive`}><input id={`${id}-archive`} type="checkbox" checked={showArchive} onChange={event => { setShowArchive(event.target.checked); setPage(1); }} />Показати архів</label>
      <label className="check-label demo-control" htmlFor={`${id}-fail`}><input id={`${id}-fail`} type="checkbox" checked={forceError} onChange={event => setForceError(event.target.checked)} />Імітувати помилку запиту</label>
    </div>
    <ErrorMessage>{error}</ErrorMessage>
    {isPending && <LoadingSpinner label="Збереження змін..." compact />}
    <div className="table-scroll"><table className="data-table">
      <caption className="sr-only">Останні замовлення за обраний період</caption>
      <thead><tr><th scope="col">ID</th><th scope="col">Клієнт</th><th scope="col">Продукт</th><th scope="col">Сума</th><th scope="col">Статус</th><th scope="col">Дії</th></tr></thead>
      <tbody>{visible.map(order => <tr key={order.id} className={order.saving ? 'optimistic-saving' : ''}>
        <td className="order-id">#{order.id}</td><td>{order.customer}</td><td className="product-cell">{order.product}<small>{order.quantity} шт. · {order.region}</small></td><td className="amount-cell">{currency(order.amount)}</td>
        <td><Select className={`status-select ${order.status}`} aria-label={`Статус замовлення #${order.id}`} value={order.status} disabled={order.saving}
          onChange={event => changeStatus(order.id, event.target.value, forceError)}>
          {STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
        </Select>{order.saving && <small className="saving-text">збереження...</small>}</td>
        <td><Button variant="text" disabled={order.saving} aria-label={`${showArchive ? 'Відновити' : 'Архівувати'} замовлення #${order.id}`}
          onClick={() => changeArchive(order.id, !showArchive, forceError)}>{showArchive ? 'Відновити' : 'Архів'}</Button></td>
      </tr>)}</tbody>
    </table>{visible.length === 0 && <div className="empty-state">Замовлень за цими фільтрами немає</div>}</div>
    <div className="table-footer"><span>{visible.length} з {matching.length} записів</span><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} label="Сторінки замовлень" /></div>
  </section>;
}
