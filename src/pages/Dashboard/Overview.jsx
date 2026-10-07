import { use, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { currency, number } from '../../utils/formatters.js';
import { getStats } from '../../utils/selectors.js';
import StatsCard from '../../components/widgets/StatsCard.jsx';
import LiveSearch from '../../components/widgets/LiveSearch.jsx';
import OrdersTable from '../../components/widgets/OrdersTable.jsx';
import SalesChart from '../../components/widgets/SalesChart.jsx';

export default function Overview() {
  const { orders, products, users, period } = use(DataContext);
  const { filters } = use(FilterContext);
  const stats = useMemo(() => getStats({ orders, products, users }, filters, period), [orders, products, users, filters, period]);
  return <div className="overview page-grid">
    <div className="stats-grid">
      <StatsCard title="Загальний дохід" value={currency(stats.revenue.value)} change={stats.revenue.change} icon="money" />
      <StatsCard title="Кількість замовлень" value={number(stats.orders.value)} change={stats.orders.change} icon="cart" />
      <StatsCard title="Нові користувачі" value={number(stats.users.value)} change={stats.users.change} icon="users" />
      <StatsCard title="Товари в наявності" value={number(stats.stock.value)} change={0} icon="box" />
    </div>
    <div className="overview-top-grid"><SalesChart /><LiveSearch /></div>
    <OrdersTable />
  </div>;
}
