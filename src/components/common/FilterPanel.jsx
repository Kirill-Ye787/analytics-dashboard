import { use, useId } from 'react';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { CATEGORIES, MAX_PRICE, REGIONS } from '../../utils/constants.js';
import { currency } from '../../utils/formatters.js';
import Button from '../ui/Button.jsx';
import Select from '../ui/Select.jsx';

export default function FilterPanel() {
  const id = useId();
  const { draftFilters, updateFilters, resetFilters, isPending } = use(FilterContext);
  function toggleCategory(category) {
    const categories = draftFilters.categories.includes(category)
      ? draftFilters.categories.filter(item => item !== category) : [...draftFilters.categories, category];
    updateFilters({ categories });
  }
  return <section className="filter-panel" aria-labelledby={`${id}-title`}>
    <div className="sidebar-heading"><h2 id={`${id}-title`}>Фільтри</h2><Button variant="text" onClick={resetFilters}>Скинути</Button></div>
    <fieldset><legend>Категорії продуктів</legend>
      {CATEGORIES.map(category => <label className="check-label" key={category.id} htmlFor={`${id}-${category.id}`}>
        <input id={`${id}-${category.id}`} type="checkbox" checked={draftFilters.categories.includes(category.id)} onChange={() => toggleCategory(category.id)} />
        <span className="category-dot" style={{ background: category.color }} />{category.label}
      </label>)}
    </fieldset>
    <div className="price-filter">
      <label htmlFor={`${id}-price`}>Ціна продукту до <strong>{currency(draftFilters.maxPrice)}</strong></label>
      <input id={`${id}-price`} type="range" min="0" max={MAX_PRICE} step="500" value={draftFilters.maxPrice}
        aria-valuetext={currency(draftFilters.maxPrice)} onChange={event => updateFilters({ maxPrice: Number(event.target.value) })} />
      <div className="range-labels"><span>0 ₴</span><span>60 000 ₴</span></div>
    </div>
    <Select label="Регіони" multiple size="4" value={draftFilters.regions}
      hint="Кілька регіонів: Ctrl + клік (на Mac — Cmd)."
      onChange={event => updateFilters({ regions: Array.from(event.target.selectedOptions, option => option.value) })}>
      {REGIONS.map(region => <option value={region} key={region}>{region}</option>)}
    </Select>
    <p className="sidebar-note" role="status">{isPending ? 'Оновлення фільтрів...' : 'Фільтри застосовуються до даних дашборду.'}</p>
  </section>;
}
