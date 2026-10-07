import { use, useEffect, useId, useRef, useState, useTransition } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { loadChartData } from '../../utils/api.js';
import { CATEGORIES, PERIODS } from '../../utils/constants.js';
import { buildChartData } from '../../utils/selectors.js';
import { currency } from '../../utils/formatters.js';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Select from '../ui/Select.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function SalesChart() {
  const titleId = useId();
  const descriptionId = useId();
  const data = use(DataContext);
  const { filters } = use(FilterContext);
  const [chartData, setChartData] = useState(() => buildChartData(data, filters, data.period));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const latestRequest = useRef(0);
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setError('');
    startTransition(async () => {
      try {
        const next = await loadChartData(data.period, filters);
        if (latestRequest.current === requestId) startTransition(() => setChartData(next));
      } catch (requestError) {
        if (latestRequest.current === requestId) setError(requestError.message);
      }
    });
    return () => { latestRequest.current += 1; };
  }, [data.period, data.version, filters]);
  const total = chartData.reduce((sum, point) => sum + point.total, 0);
  const maximum = Math.max(1000, Math.ceil(Math.max(...chartData.map(point => point.total), 1) / 5000) * 5000);
  const plot = { left: 66, top: 18, width: 580, height: 192 };
  const step = plot.width / chartData.length;
  const barWidth = Math.max(3, Math.min(32, step * 0.62));
  return <section className="widget sales-chart">
    <div className="widget-heading"><div><h2>Динаміка продажів</h2><p>Дохід від виконаних замовлень</p></div>
      <Select label="Період графіка" className="compact-field" value={data.period} onChange={event => data.setPeriod(event.target.value)}>
        {PERIODS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </Select>
    </div>
    <div className="chart-summary"><strong>{currency(total)}</strong>{isPending && <LoadingSpinner compact label="Оновлення графіка..." />}</div>
    <ErrorMessage>{error}</ErrorMessage>
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.5 : 1 }} className="chart-body">
      <svg viewBox="0 0 670 248" role="img" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <title id={titleId}>Продажі за категоріями</title><desc id={descriptionId}>Загальний дохід {currency(total)}. Детальні суми доступні у підписах стовпчиків.</desc>
        {[0, 1, 2, 3, 4].map(tick => {
          const y = plot.top + plot.height - tick * plot.height / 4;
          return <g key={tick}><line x1={plot.left} x2={plot.left + plot.width} y1={y} y2={y} className="chart-grid" />
            <text x={plot.left - 12} y={y + 4} textAnchor="end" className="chart-label">{new Intl.NumberFormat('uk-UA', { notation: 'compact', maximumFractionDigits: 0 }).format(maximum * tick / 4)}</text></g>;
        })}
        {chartData.map((point, index) => {
          let accumulated = 0;
          const x = plot.left + index * step + (step - barWidth) / 2;
          return <g key={point.time}><title>{`${point.label}: ${currency(point.total)}`}</title>
            {CATEGORIES.map(category => {
              const height = point[category.id] / maximum * plot.height;
              const y = plot.top + plot.height - accumulated - height;
              accumulated += height;
              return <rect key={category.id} x={x} y={y} width={barWidth} height={height} fill={category.color} rx="2" />;
            })}
            {index % Math.ceil(chartData.length / 7) === 0 && <text x={x + barWidth / 2} y="236" textAnchor="middle" className="chart-label">{point.label}</text>}
          </g>;
        })}
      </svg>
      {total === 0 && <p className="chart-empty">За цей період немає виконаних замовлень</p>}
    </div>
    <ul className="chart-legend">{CATEGORIES.map(category => <li key={category.id}><span style={{ background: category.color }} />{category.label}</li>)}</ul>
  </section>;
}
