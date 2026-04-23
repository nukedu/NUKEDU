import { TrendingUp, TrendingDown, Calendar, Heart, MessageSquare, Award } from 'lucide-react';

const stats = [
  {
    label: 'Total Kontribusi',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    label: 'Kegiatan Diikuti',
    value: '34',
    change: '+5',
    trend: 'up',
    icon: Calendar,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Donasi LAZISNU',
    value: 'Rp 2.4Jt',
    change: '+8%',
    trend: 'up',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    label: 'Post Forum',
    value: '89',
    change: '-2',
    trend: 'down',
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
        return (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-emerald-100/60 shadow-sm hover:shadow-lg hover:shadow-emerald-100/40 transition-all duration-300 group hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.bgLight} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
                ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}
              >
                <TrendIcon className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-900">{stat.value}</h3>
            <p className="text-sm text-emerald-500 mt-1">{stat.label}</p>
            <div className="mt-3 w-full bg-emerald-50 rounded-full h-1">
              <div
                className={`bg-gradient-to-r ${stat.color} h-1 rounded-full transition-all duration-1000`}
                style={{ width: `${60 + i * 10}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
