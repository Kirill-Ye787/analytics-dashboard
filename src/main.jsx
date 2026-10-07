import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/themes.css';
import './styles/dashboard.css';
import './styles/widgets.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
