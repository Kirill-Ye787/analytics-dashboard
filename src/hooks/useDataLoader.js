import { use } from 'react';
import { DataContext } from '../contexts/DataContext.jsx';

export default function useDataLoader(key, period, filters, forceError = false) {
  const { getAnalyticsPromise } = use(DataContext);
  const dataPromise = getAnalyticsPromise(key, period, filters, forceError);
  // Promise стабільний для одного ключа. Компонент має бути в Suspense.
  return use(dataPromise);
}
