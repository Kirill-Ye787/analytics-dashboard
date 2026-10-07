import { use } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import Icon from './Icon.jsx';
import Button from './Button.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = use(ThemeContext);
  return <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}
    aria-label={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
    aria-pressed={theme === 'dark'}>
    <Icon name={theme === 'light' ? 'sun' : 'moon'} />
    <span>{theme === 'light' ? 'Світла' : 'Темна'}</span>
  </Button>;
}
