import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { FilterProvider } from './contexts/FilterContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <DataProvider><Dashboard /></DataProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
