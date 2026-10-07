import { createContext, useMemo, useState, useTransition } from 'react';
import { DEFAULT_FILTERS } from '../utils/constants.js';

export const FilterContext = createContext(null);
export function FilterProvider({ children }) {
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isPending, startTransition] = useTransition();
  const value = useMemo(() => ({
    filters, draftFilters, isPending,
    updateFilters(patch) {
      const next = { ...draftFilters, ...patch };
      // Контролі оновлюються терміново; зміна даних — у transition.
      setDraftFilters(next);
      startTransition(() => setFilters(next));
    },
    resetFilters() {
      setDraftFilters(DEFAULT_FILTERS);
      startTransition(() => setFilters(DEFAULT_FILTERS));
    },
  }), [draftFilters, filters, isPending]);
  return <FilterContext value={value}>{children}</FilterContext>;
}
