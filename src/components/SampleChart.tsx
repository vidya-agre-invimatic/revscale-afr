'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSampleQuery } from '@/hooks/useSampleQuery';

export default function SampleChart() {
  const { data, isLoading, isError } = useSampleQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl h-[300px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-400 text-sm">Loading chart…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl h-[300px] flex items-center justify-center bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-500 text-sm">Failed to load chart data.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sample Chart (recharts + React Query)
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
