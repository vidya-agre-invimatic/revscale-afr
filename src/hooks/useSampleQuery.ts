import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';

export interface SampleDataItem {
  id: number;
  label: string;
  value: number;
}

const fetchSampleData = (): Promise<SampleDataItem[]> =>
  Promise.resolve([
    { id: 1, label: 'Jan', value: 400 },
    { id: 2, label: 'Feb', value: 300 },
    { id: 3, label: 'Mar', value: 600 },
    { id: 4, label: 'Apr', value: 800 },
    { id: 5, label: 'May', value: 500 },
    { id: 6, label: 'Jun', value: 700 },
  ]);

export function useSampleQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.SAMPLE],
    queryFn: fetchSampleData,
  });
}
