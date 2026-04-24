import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', kontribusi: 18, kegiatan: 4, donasi: 300000 },
  { month: 'Feb', kontribusi: 25, kegiatan: 6, donasi: 450000 },
  { month: 'Mar', kontribusi: 22, kegiatan: 5, donasi: 380000 },
  { month: 'Apr', kontribusi: 30, kegiatan: 7, donasi: 520000 },
  { month: 'Mei', kontribusi: 28, kegiatan: 8, donasi: 610000 },
  { month: 'Jun', kontribusi: 35, kegiatan: 6, donasi: 480000 },
  { month: 'Jul', kontribusi: 32, kegiatan: 9, donasi: 700000 },
  { month: 'Agu', kontribusi: 40, kegiatan: 10, donasi: 550000 },
  { month: 'Sep', kontribusi: 38, kegiatan: 8, donasi: 620000 },
  { month: 'Okt', kontribusi: 45, kegiatan: 11, donasi: 750000 },
  { month: 'Nov', kontribusi: 42, kegiatan: 9, donasi: 680000 },
  { month: 'Des', kontribusi: 50, kegiatan: 12, donasi: 820000 },
];

const weeklyData = [
  { day: 'Sen', total: 8 },
  { day: 'Sel', total: 12 },
  { day: 'Rab', total: 6 },
  { day: 'Kam', total: 15 },
  { day: 'Jum', total: 22 },
  { day: 'Sab', total: 18 },
  { day: 'Min', total: 10 },
];

type TabType = 'bulanan' | 'mingguan';

export default function ActivityChart() {
  const [activeTab, setActiveTab] = useState<TabType>('bulanan');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-xl border border-emerald-100 p-3">
          <p className="font-semibold text-emerald-800 text-sm mb-1">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs text-emerald-600">
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString('id-ID')}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <div>
          <h3 className="font-bold text-emerald-900 text-lg">Aktivitas Kontribusi</h3>
          <p className="text-sm text-emerald-500 mt-0.5">Grafik kontribusi Anda selama periode ini</p>
        </div>
        <div className="flex bg-emerald-50 rounded-xl p-1">
          {(['bulanan', 'mingguan'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize
                ${activeTab === tab
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-emerald-500 hover:text-emerald-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'bulanan' ? (
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorKontribusi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorKegiatan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ecfdf5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6ee7b7' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6ee7b7' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="kontribusi"
                name="Kontribusi"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#colorKontribusi)"
              />
              <Area
                type="monotone"
                dataKey="kegiatan"
                name="Kegiatan"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorKegiatan)"
              />
            </AreaChart>
          ) : (
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ecfdf5" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6ee7b7' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6ee7b7' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="total"
                name="Kontribusi"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                barSize={40}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-emerald-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-600">Kontribusi</span>
        </div>
        {activeTab === 'bulanan' && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-xs text-emerald-600">Kegiatan</span>
          </div>
        )}
      </div>
    </div>
  );
}
