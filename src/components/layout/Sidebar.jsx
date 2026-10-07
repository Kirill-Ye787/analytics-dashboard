import { SECTIONS } from '../../utils/constants.js';
import FilterPanel from '../common/FilterPanel.jsx';
import Icon from '../ui/Icon.jsx';

export default function Sidebar({ activeSection, onSectionChange, isPending }) {
  return <aside className="sidebar">
    <p className="nav-caption">РОБОЧИЙ ПРОСТІР</p>
    <nav className="section-nav" aria-label="Розділи дашборду" aria-busy={isPending}>
      {SECTIONS.map(section => <button key={section.id} type="button"
        className={activeSection === section.id ? 'nav-item active' : 'nav-item'}
        aria-current={activeSection === section.id ? 'page' : undefined}
        onClick={() => onSectionChange(section.id)}>
        <Icon name={section.icon} /><span>{section.label}</span>
        {activeSection === section.id && <span className="active-dot" />}
      </button>)}
    </nav>
    <FilterPanel />
    <div className="sidebar-footer"><span className="live-dot" />Mock API підключено<br /><small>Навчальний проєкт · React 19</small></div>
  </aside>;
}
