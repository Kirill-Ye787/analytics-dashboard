import PeriodComparison from '../../components/widgets/PeriodComparison.jsx';
import AsyncDataWidget from '../../components/widgets/AsyncDataWidget.jsx';
import SalesChart from '../../components/widgets/SalesChart.jsx';

export default function Analytics() {
  return <div className="page-grid"><PeriodComparison /><AsyncDataWidget /><SalesChart /></div>;
}
