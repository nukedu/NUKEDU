import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Check } from 'lucide-react';

interface UpcomingEventsProps {
  onNotif?: (msg: string) => void;
}

const initialEvents = [
  {
    date: { day: '15', month: 'Jan' },
    title: 'Pengajian Rutin Ahad Wage',
    time: '20:00 - 22:00 WIB',
    location: 'Masjid Al-Ikhlas, Kedu',
    attendees: 85,
    color: 'border-l-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    badgeText: 'Pengajian',
  },
  {
    date: { day: '18', month: 'Jan' },
    title: 'Rapat Koordinasi MWC NU',
    time: '09:00 - 12:00 WIB',
    location: 'Kantor MWC NU Kedu',
    attendees: 24,
    color: 'border-l-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    badgeText: 'Rapat',
  },
  {
    date: { day: '20', month: 'Jan' },
    title: 'Bakti Sosial & Santunan Yatim',
    time: '08:00 - 14:00 WIB',
    location: 'Gedung NU Kecamatan Kedu',
    attendees: 120,
    color: 'border-l-rose-500',
    badge: 'bg-rose-100 text-rose-700',
    badgeText: 'Sosial',
  },
  {
    date: { day: '25', month: 'Jan' },
    title: 'Pelatihan Digitalisasi Ranting',
    time: '13:00 - 16:00 WIB',
    location: 'Aula MWC NU Kedu',
    attendees: 40,
    color: 'border-l-amber-500',
    badge: 'bg-amber-100 text-amber-700',
    badgeText: 'Pelatihan',
  },
];

export default function UpcomingEvents({ onNotif }: UpcomingEventsProps) {
  const [registered, setRegistered] = useState<number[]>([]);

  const handleRegister = (i: number) => {
    if (!registered.includes(i)) {
      setRegistered([...registered, i]);
      onNotif?.(`Berhasil mendaftar: ${initialEvents[i].title}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-emerald-900 text-lg">Jadwal Kegiatan</h3>
          <p className="text-sm text-emerald-500 mt-0.5">Agenda yang akan datang</p>
        </div>
        <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          Kalender
        </button>
      </div>

      <div className="space-y-3">
        {initialEvents.map((event, i) => (
          <div
            key={i}
            className={`flex gap-4 p-3.5 rounded-xl border-l-4 ${event.color} bg-gradient-to-r from-emerald-50/30 to-transparent hover:from-emerald-50/80 transition-all cursor-pointer group`}
          >
            {/* Date */}
            <div className="text-center shrink-0">
              <div className="text-2xl font-bold text-emerald-800 leading-none">{event.date.day}</div>
              <div className="text-[10px] uppercase text-emerald-500 font-semibold mt-0.5">{event.date.month}</div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-emerald-800 leading-tight">{event.title}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${event.badge}`}>
                  {event.badgeText}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-emerald-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees} peserta</span>
                </div>
                {registered.includes(i) ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Terdaftar
                  </span>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRegister(i); }}
                    className="text-xs text-emerald-600 font-medium hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Daftar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
