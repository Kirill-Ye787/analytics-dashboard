import { useState, useTransition } from 'react';
import Header from '../../components/layout/Header.jsx';
import Sidebar from '../../components/layout/Sidebar.jsx';
import MainContent from '../../components/layout/MainContent.jsx';
import Overview from './Overview.jsx';
import Sales from './Sales.jsx';
import Users from './Users.jsx';
import Analytics from './Analytics.jsx';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isPending, startTransition] = useTransition();
  const pages = { overview: Overview, sales: Sales, users: Users, analytics: Analytics };
  const ActivePage = pages[activeSection];
  return <div className="dashboard">
    <a className="skip-link" href="#main-content">Перейти до вмісту</a>
    <Header />
    <div className="dashboard-body"><Sidebar activeSection={activeSection} onSectionChange={section => startTransition(() => setActiveSection(section))} isPending={isPending} />
      <MainContent activeSection={activeSection} isPending={isPending} showFilterSummary={activeSection !== 'users'}><ActivePage /></MainContent>
    </div>
  </div>;
}
