const paths = {
  overview: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  sales: ['M3 3v18h18', 'M7 16V11', 'M12 16V7', 'M17 16V4'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  analytics: ['M3 3v18h18', 'M6 15l4-5 4 3 6-8'],
  refresh: ['M20 7v5h-5', 'M4 17v-5h5', 'M6 7a7 7 0 0 1 11-2l3 3', 'M18 17a7 7 0 0 1-11 2l-3-3'],
  sun: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5'],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z'],
  search: ['M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15', 'M16 16l5 5'],
  money: ['M3 5h18v14H3z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M6 12h.01M18 12h.01'],
  cart: ['M2 3h3l3 12h10l3-9H6', 'M9 19h.01M18 19h.01'],
  box: ['M12 2l10 5-10 5L2 7l10-5Z', 'M2 7v10l10 5 10-5V7', 'M12 12v10', 'M7 4.5l10 5'],
  plus: ['M12 5v14M5 12h14'],
  heart: ['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z'],
};
export default function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {(paths[name] ?? paths.analytics).map((path, index) => <path key={index} d={path} />)}
  </svg>;
}
