export default function LoadingSpinner({ label = 'Завантаження...', compact = false }) {
  return <span className={`loading-spinner ${compact ? 'compact' : ''}`} role="status">
    <span className="spinner" aria-hidden="true" />{label}
  </span>;
}
