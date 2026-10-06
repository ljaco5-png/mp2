import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchAllBeans } from './api';
import type { Bean } from './types';

interface BeansState {
  beans: Bean[];
  loading: boolean;
  error: string | null;
}

const BeansContext = createContext<BeansState>({ beans: [], loading: true, error: null });

let cache: Bean[] | null = null;

export function BeansProvider({ children }: { children: ReactNode }) {
  const [beans, setBeans] = useState<Bean[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    fetchAllBeans()
      .then((data) => {
        cache = data;
        setBeans(data);
      })
      .catch(() => setError('Could not load jelly beans. The API may be waking up; try again in a moment.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BeansContext.Provider value={{ beans, loading, error }}>
      {children}
    </BeansContext.Provider>
  );
}

export function useBeans() {
  return useContext(BeansContext);
}