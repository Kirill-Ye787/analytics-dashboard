export default function Highlight({ text, query }) {
  const needle = query.trim().toLocaleLowerCase('uk-UA');
  if (!needle) return text;
  const source = text.toLocaleLowerCase('uk-UA');
  const parts = [];
  let cursor = 0;
  let position = source.indexOf(needle);
  while (position !== -1) {
    parts.push(text.slice(cursor, position));
    parts.push(<mark key={position}>{text.slice(position, position + needle.length)}</mark>);
    cursor = position + needle.length;
    position = source.indexOf(needle, cursor);
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
