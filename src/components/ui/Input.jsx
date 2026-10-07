import { useId } from 'react';

export default function Input({ label, hint, error, id: providedId, className = '', ...props }) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  return <div className={`field ${className}`}>
    <label htmlFor={id}>{label}</label>
    <input id={id} aria-describedby={describedBy} aria-invalid={Boolean(error)} {...props} />
    {hint && <small id={hintId} className="field-hint">{hint}</small>}
    {error && <small id={errorId} className="field-error">{error}</small>}
  </div>;
}
