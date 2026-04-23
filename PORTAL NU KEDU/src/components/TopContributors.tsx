import { Crown, Medal, Award } from 'lucide-react';

const contributors = [
  { name: 'Ustadz Nur Hidayat', role: 'Ranting Kedu', points: 1250, rank: 1, initials: 'UN', color: 'from-amber-400 to-yellow-500' },
  { name: 'Ahmad Hidayat', role: 'Ranting Kedu', points: 780, rank: 2, initials: 'AH', color: 'from-emerald-400 to-teal-500' },
  { name: 'Siti Aminah', role: 'Ranting Kedu Utara', points: 720, rank: 3, initials: 'SA', color: 'from-blue-400 to-indigo-500' },
  { name: 'Muhammad Rizki', role: 'Ranting Kedu Selatan', points: 650, rank: 4, initials: 'MR', color: 'from-purple-400 to-pink-500' },
  { name: 'Fatimah Azzahra', role: 'Ranting Ngadirejo', points: 590, rank: 5, initials: 'FA', color: 'from-rose-400 to-red-500' },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-4 h-4 text-amber-500" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
  if (rank === 3) return <Award className="w-4 h-4 text-amber-700" />;
  return <span className="text-xs font-bold text-emerald-400 w-4 text-center">#{rank}</span>;
};

export default function TopContributors() {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6">
      <div className="mb-5">
        <h3 className="font-bold text-emerald-900 text-lg">Top Kontributor</h3>
        <p className="text-sm text-emerald-500 mt-0.5">Peringkat kontribusi bulan ini</p>
      </div>

      <div className="space-y-2">
        {contributors.map((person, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer
              ${i === 1 ? 'bg-emerald-50/80 ring-1 ring-emerald-200' : 'hover:bg-emerald-50/50'}`}
          >
            <div className="w-6 flex justify-center">
              <RankIcon rank={person.rank} />
            </div>
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
              {person.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${i === 1 ? 'text-emerald-800' : 'text-emerald-700'}`}>
                {person.name} {i === 1 && <span className="text-[10px] text-emerald-600">(Anda)</span>}
              </p>
              <p className="text-[10px] text-emerald-400">{person.role}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-700">{person.points}</span>
              <p className="text-[10px] text-emerald-400">poin</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
