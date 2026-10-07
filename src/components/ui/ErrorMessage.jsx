export default function ErrorMessage({ children }) {
  return children ? <div className="message message-error" role="alert">{children}</div> : null;
}
