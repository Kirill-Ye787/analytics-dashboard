import { memo, useMemo } from 'react';
import { currency } from '../../utils/formatters.js';
import Highlight from './Highlight.jsx';
import Icon from '../ui/Icon.jsx';

const SearchResults = memo(function SearchResults({ data, query }) {
  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('uk-UA');
    return data.filter(item => item.name.toLocaleLowerCase('uk-UA').includes(needle));
  }, [data, query]);
  return <>
    <p className="results-count">Знайдено: {matches.length}{matches.length > 8 && ' · показано перші 8'}</p>
    {matches.length === 0 ? <div className="empty-state">Нічого не знайдено</div> : <ul className="search-results">
      {matches.slice(0, 8).map(item => <li key={`${item.kind}-${item.id}`}>
        <span className="result-icon"><Icon name={item.kind === 'product' ? 'box' : 'users'} size={18} /></span>
        <div><strong><Highlight text={item.name} query={query} /></strong><small>{item.kind === 'product' ? `${item.stock} шт. у наявності · ${item.region}` : item.email}</small></div>
        <span className="result-meta">{item.kind === 'product' ? currency(item.price) : item.role === 'admin' ? 'Admin' : 'User'}</span>
      </li>)}
    </ul>}
  </>;
});
export default SearchResults;
