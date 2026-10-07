import { use } from 'react';
import { FilterContext } from '../../contexts/FilterContext.jsx';
import { SECTIONS } from '../../utils/constants.js';

export default function MainContent({ children, activeSection, isPending, showFilterSummary = true }) {
  const section = SECTIONS.find(item => item.id === activeSection);
  let filterSummary = null;
  // use(), на відміну від useContext, дозволяє умовне читання контексту.
  if (showFilterSummary) {
    const { filters } = use(FilterContext);
    filterSummary = <span className="filter-summary">{filters.categories.length} категорії · {filters.regions.length} регіони</span>;
  }
  return <main className="main-content" id="main-content">
    <div className="page-heading"><div><p className="eyebrow">АНАЛІТИКА ВАШОГО БІЗНЕСУ</p><h1>{section.label}</h1><p>{section.description}</p></div>{filterSummary}</div>
    <div className="page-content" aria-busy={isPending} style={{ opacity: isPending ? 0.6 : 1 }}>{children}</div>
    <footer className="main-footer"><span>Analytics Dashboard</span><span>Демонстраційні дані · UAH / ₴</span></footer>
  </main>;
}
