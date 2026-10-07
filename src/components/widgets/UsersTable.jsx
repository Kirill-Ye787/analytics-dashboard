import { memo, use, useId, useMemo, useState } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { PAGE_SIZE } from '../../utils/constants.js';
import { date } from '../../utils/formatters.js';
import useDeferredSearch from '../../hooks/useDeferredSearch.js';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import Pagination from '../common/Pagination.jsx';
import Highlight from '../common/Highlight.jsx';

const FilteredUsers = memo(function FilteredUsers({ users, query, activity, sortBy, page, setPage }) {
  const matching = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('uk-UA');
    return users.filter(user => user.name.toLocaleLowerCase('uk-UA').includes(needle)
      && (activity === 'all' || user.isActive === (activity === 'active')))
      .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name, 'uk-UA') : new Date(b[sortBy]) - new Date(a[sortBy]));
  }, [users, query, activity, sortBy]);
  const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = matching.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <>
    <p className="results-count">Знайдено користувачів: <strong>{matching.length}</strong></p>
    <div className="table-scroll"><table className="data-table users-table">
      <caption className="sr-only">Користувачі, відфільтровані за іменем та активністю</caption>
      <thead><tr><th scope="col">Ім’я / Email</th><th scope="col">Роль</th><th scope="col">Статус</th><th scope="col">Реєстрація</th><th scope="col">Активність</th></tr></thead>
      <tbody>{visible.map(user => <tr key={user.id}><td><div className="user-cell"><span className="avatar">{user.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong><Highlight text={user.name} query={query} /></strong><small>{user.email}</small></div></div></td>
        <td><span className="role-badge">{user.role === 'admin' ? 'Admin' : 'User'}</span></td><td><span className={`status-badge ${user.isActive ? 'completed' : 'cancelled'}`}>{user.isActive ? 'Активний' : 'Неактивний'}</span></td><td>{date(user.registeredAt)}</td><td>{date(user.lastActivity)}</td>
      </tr>)}</tbody>
    </table>{visible.length === 0 && <div className="empty-state">Нічого не знайдено</div>}</div>
    <div className="table-footer"><span>{visible.length} з {matching.length} записів</span><Pagination label="Сторінки користувачів" currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} /></div>
  </>;
});
export default function UsersTable() {
  const id = useId();
  const { users } = use(DataContext);
  const { filters } = use(FilterContext);
  const regionalUsers = useMemo(() => users.filter(user => filters.regions.includes(user.region)), [users, filters.regions]);
  const { searchTerm, setSearchTerm, deferredSearchTerm, isPending } = useDeferredSearch();
  const [activity, setActivity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  return <section className="widget">
    <div className="widget-heading"><div><h2>Список користувачів</h2><p>Пошук, активність та історія реєстрацій</p></div><span className="count-badge">{regionalUsers.length}</span></div>
    <div className="search-controls"><Input label="Пошук за іменем" type="search" placeholder="Наприклад, Олександр..." value={searchTerm} onChange={event => { setSearchTerm(event.target.value); setPage(1); }} />
      <Select label="Сортування" value={sortBy} onChange={event => { setSortBy(event.target.value); setPage(1); }}><option value="name">Ім’я</option><option value="registeredAt">Дата реєстрації</option><option value="lastActivity">Активність</option></Select>
    </div>
    <fieldset className="activity-filters"><legend>Активність</legend>
      {[['all', 'Всі'], ['active', 'Активні'], ['inactive', 'Неактивні']].map(([value, label]) => <label key={value} htmlFor={`${id}-${value}`}>
        <input id={`${id}-${value}`} type="radio" name={`${id}-activity`} checked={activity === value} onChange={() => { setActivity(value); setPage(1); }} />{label}
      </label>)}
    </fieldset>
    {isPending && <LoadingSpinner label="Завантаження результатів..." compact />}
    <div aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}><FilteredUsers users={regionalUsers} query={deferredSearchTerm} activity={activity} sortBy={sortBy} page={page} setPage={setPage} /></div>
  </section>;
}
