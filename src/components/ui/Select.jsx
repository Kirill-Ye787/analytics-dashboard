import { useId } from 'react';

export default function Select({ label, error, hint, children, id: providedId, className = '', ...props }) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  return <div className={`field ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <select id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props}>{children}</select>
    {hint && <small id={`${id}-hint`} className="field-hint">{hint}</small>}
    {error && <small id={`${id}-error`} className="field-error">{error}</small>}
  </div>;
}
