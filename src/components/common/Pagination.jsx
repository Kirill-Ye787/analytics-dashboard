import { useId } from 'react';
import Button from '../ui/Button.jsx';

export default function Pagination({ currentPage, totalPages, onPageChange, label = 'Пагінація' }) {
  const labelId = useId();
  const pages = Math.max(1, totalPages);
  return <nav className="pagination" aria-labelledby={labelId}>
    <span id={labelId} className="sr-only">{label}</span>
    <Button variant="secondary" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Попередня сторінка">←</Button>
    <span aria-live="polite">Сторінка <strong>{currentPage}</strong> з {pages}</span>
    <Button variant="secondary" disabled={currentPage >= pages} onClick={() => onPageChange(currentPage + 1)} aria-label="Наступна сторінка">→</Button>
  </nav>;
}
