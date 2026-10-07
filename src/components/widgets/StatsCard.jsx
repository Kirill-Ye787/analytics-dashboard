import { useId } from 'react';
import Icon from '../ui/Icon.jsx';

export default function StatsCard({ title, value, change, icon }) {
  const titleId = useId();
  const valueId = useId();
  const direction = change === null ? 'neutral' : change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
  const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→';
  return <div className="stats-card" role="region" aria-labelledby={titleId} aria-describedby={valueId}>
    <div className="stats-top"><h3 id={titleId}>{title}</h3><span className={`stats-icon ${icon}`}><Icon name={icon} /></span></div>
    <div id={valueId} className="stats-value">{value}</div>
    <div className="stats-bottom"><span className={`stats-change ${direction}`}>
      {change === null ? 'Немає бази порівняння' : `${arrow} ${change > 0 ? '+' : ''}${change}%`}
    </span><span>{icon === 'box' ? 'поточний залишок' : 'до попереднього періоду'}</span></div>
  </div>;
}
