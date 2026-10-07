import { use, useEffect, useRef, useState, useTransition } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { loadPeriodComparison } from '../../utils/api.js';
import { PERIODS } from '../../utils/constants.js';
import { getMetrics } from '../../utils/selectors.js';
import { currency, number, percentChange } from '../../utils/formatters.js';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function PeriodComparison() {
  const data = use(DataContext);
  const { filters } = use(FilterContext);
  const [periodA, setPeriodA] = useState('week');
  const [periodB, setPeriodB] = useState('month');
  const [comparison, setComparison] = useState(() => [getMetrics(data, filters, 'week'), getMetrics(data, filters, 'month')]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const latestRequest = useRef(0);
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setError('');
    startTransition(async () => {
      try {
        const next = await loadPeriodComparison(periodA, periodB, filters);
        if (latestRequest.current === requestId) startTransition(() => setComparison(next));
      } catch (requestError) {
        if (latestRequest.current === requestId) setError(requestError.message);
      }
    });
    return () => { latestRequest.current += 1; };
  }, [periodA, periodB, filters, data.version]);
  const metrics = [['revenue', 'Дохід', currency], ['orders', 'Замовлення', number], ['users', 'Нові користувачі', number], ['averageOrder', 'Середній чек', currency]];
  return <section className="widget">
    <div className="widget-heading"><div><h2>Порівняння періодів</h2><p>Зміна показників періоду B відносно A</p></div>{isPending && <LoadingSpinner compact label="Оновлення..." />}</div>
    <div className="form-row">
      <Select label="Період A" value={periodA} onChange={event => setPeriodA(event.target.value)}>{PERIODS.map(period => <option key={period.id} value={period.id}>{period.label}</option>)}</Select>
      <Select label="Період B" value={periodB} onChange={event => setPeriodB(event.target.value)}>{PERIODS.map(period => <option key={period.id} value={period.id}>{period.label}</option>)}</Select>
    </div>
    <ErrorMessage>{error}</ErrorMessage>
    <div className="table-scroll" aria-busy={isPending} style={{ opacity: isPending ? 0.5 : 1 }}><table className="data-table comparison-table"><caption className="sr-only">Показники двох періодів</caption>
      <thead><tr><th scope="col">Показник</th><th scope="col">Період A</th><th scope="col">Період B</th><th scope="col">Зміна B / A</th></tr></thead>
      <tbody>{metrics.map(([key, label, format]) => {
        const change = percentChange(comparison[1][key], comparison[0][key]);
        return <tr key={key}><th scope="row">{label}</th><td>{format(comparison[0][key])}</td><td>{format(comparison[1][key])}</td><td className={`stats-change ${change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'}`}>
          {change === null ? 'Немає бази' : `${change > 0 ? '↑ +' : change < 0 ? '↓ ' : '→ '}${change}%`}
        </td></tr>;
      })}</tbody>
    </table></div>
    <p className="field-hint comparison-note">Тиждень — останні 7 днів, місяць — 30 днів, рік — 12 календарних місяців. Нульова база не дає визначеного відсотка зростання.</p>
  </section>;
}
