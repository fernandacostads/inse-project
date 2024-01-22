import { apiClient } from 'core/api';
import { useQuery, UseQueryResult } from 'react-query';
import { SchoolResponse } from 'core/types';
import { useSearchParams } from 'react-router-dom';

export function useItems(): UseQueryResult<SchoolResponse> {
  const [search] = useSearchParams({
    sort: 'name',
    minMedia: '0',
    maxMedia: '50000',
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClient
        .get('items', {
          params: search,
        })
        .then((res) => res.data),
    {
      staleTime: 120000,
    },
  );
}
