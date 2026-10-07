import { Suspense, use, useId, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import useDataLoader from '../../hooks/useDataLoader.js';
import { currency, number } from '../../utils/formatters.js';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorBoundary from '../common/ErrorBoundary.jsx';

function DataDisplay({ resourceKey, period, filters, forceError }) {
  const data = useDataLoader(resourceKey, period, filters, forceError);
  const maxRevenue = Math.max(...data.regions.map(item => item.revenue), 1);
  return <div className="async-content">
    <div className="analytics-metrics">
      <div><span>Середній чек</span><strong>{currency(data.averageOrder)}</strong><small>Виконані замовлення</small></div>
      <div><span>Частка виконаних</span><strong>{data.conversion.toFixed(1)}%</strong><small>Від усіх замовлень періоду</small></div>
      <div><span>Активні користувачі</span><strong>{number(data.activeUsers)}</strong><small>У вибраних регіонах</small></div>
    </div>
    <h3>Дохід за регіонами</h3>
    <ul className="region-metrics">{data.regions.map(item => <li key={item.region}><div><span>{item.region}</span><strong>{currency(item.revenue)}</strong></div><progress value={item.revenue} max={maxRevenue} aria-label={`Дохід у регіоні ${item.region}`} /></li>)}</ul>
    {data.regions.length === 0 && <div className="empty-state">Оберіть регіони у фільтрах</div>}
    <p className="field-hint">Оновлено: {new Date(data.updatedAt).toLocaleTimeString('uk-UA')}</p>
  </div>;
}
export default function AsyncDataWidget() {
  const id = useId();
  const { period, version } = use(DataContext);
  const { filters } = use(FilterContext);
  const [reload, setReload] = useState(0);
  const [forceError, setForceError] = useState(false);
  const resourceKey = JSON.stringify([period, filters, version, reload, forceError]);
  function retry() { setForceError(false); setReload(current => current + 1); }
  return <section className="widget async-widget">
    <div className="widget-heading"><div><h2>Поглиблена аналітика</h2><p>Асинхронні дані з mock API</p></div><Button variant="secondary" onClick={() => setReload(current => current + 1)}><Icon name="refresh" />Перезавантажити</Button></div>
    <label className="check-label demo-control" htmlFor={`${id}-fail`}><input id={`${id}-fail`} type="checkbox" checked={forceError} onChange={event => setForceError(event.target.checked)} />Імітувати помилку аналітики</label>
    <ErrorBoundary key={resourceKey} onRetry={retry}>
      <Suspense fallback={<div className="async-loading"><LoadingSpinner label="Завантаження аналітики..." /><p>Готуємо показники за обраний період</p></div>}>
        <DataDisplay resourceKey={resourceKey} period={period} filters={filters} forceError={forceError} />
      </Suspense>
    </ErrorBoundary>
  </section>;
}
