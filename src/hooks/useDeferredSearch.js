import { useDeferredValue, useState } from 'react';

export default function useDeferredSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  return { searchTerm, setSearchTerm, deferredSearchTerm, isPending: searchTerm !== deferredSearchTerm };
}
