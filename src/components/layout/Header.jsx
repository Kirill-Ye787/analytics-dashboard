import { use } from 'react';
import { DataContext } from '../../contexts/DataContext.jsx';
import { PERIODS } from '../../utils/constants.js';
import Button from '../ui/Button.jsx';
import Select from '../ui/Select.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import Icon from '../ui/Icon.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

export default function Header() {
  const { period, setPeriod, refreshData, isRefreshing, refreshError } = use(DataContext);
  return <>
    <header className="header">
      <a className="brand" href="#main-content"><span className="brand-symbol"><Icon name="analytics" size={25} /></span>
        <span>Analytics <strong>Dashboard</strong></span></a>
      <div className="header-actions">
        {isRefreshing && <LoadingSpinner compact />}
        <Select label="Період" className="header-period" value={period} onChange={event => setPeriod(event.target.value)}>
          {PERIODS.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}
        </Select>
        <Button variant="secondary" onClick={refreshData} disabled={isRefreshing}>
          <Icon name="refresh" /><span>Оновити дані</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
    <ErrorMessage>{refreshError}</ErrorMessage>
  </>;
}
