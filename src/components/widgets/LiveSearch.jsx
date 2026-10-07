import { use, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { filterProducts } from '../../utils/selectors.js';
import useDeferredSearch from '../../hooks/useDeferredSearch.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import SearchResults from '../common/SearchResults.jsx';

export default function LiveSearch() {
  const { products, users } = use(DataContext);
  const { filters } = use(FilterContext);
  const [type, setType] = useState('products');
  const { searchTerm, setSearchTerm, deferredSearchTerm, isPending } = useDeferredSearch();
  const data = useMemo(() => type === 'products'
    ? filterProducts(products, filters).map(item => ({ ...item, kind: 'product' }))
    : users.filter(user => filters.regions.includes(user.region)).map(item => ({ ...item, kind: 'user' })), [products, users, filters, type]);
  return <section className="widget live-search">
    <div className="widget-heading"><div><h2>Швидкий пошук</h2><p>Знайдіть потрібний продукт або користувача</p></div><span className="small-badge">LIVE</span></div>
    <div className="search-controls">
      <Input label="Пошук" type="search" placeholder="Введіть назву або ім’я..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <Select label="Шукати серед" value={type} onChange={event => setType(event.target.value)}><option value="products">Продуктів</option><option value="users">Користувачів</option></Select>
    </div>
    {isPending && <LoadingSpinner label="Завантаження результатів..." compact />}
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}>
      <SearchResults data={data} query={deferredSearchTerm} />
    </div>
  </section>;
}
