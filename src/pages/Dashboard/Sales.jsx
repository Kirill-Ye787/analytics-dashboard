import SalesForm from '../../components/widgets/SalesForm.jsx';
import TopProducts from '../../components/widgets/TopProducts.jsx';
import OrdersTable from '../../components/widgets/OrdersTable.jsx';

export default function Sales() {
  return <div className="page-grid"><div className="split-grid"><SalesForm /><TopProducts /></div><OrdersTable /></div>;
}
