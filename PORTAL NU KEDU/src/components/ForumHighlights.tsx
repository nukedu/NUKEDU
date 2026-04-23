import { MessageSquare, ThumbsUp, Eye, ChevronRight } from 'lucide-react';

interface ForumHighlightsProps {
  onNavigate?: (menu: string) => void;
}

const posts = [
  {
    title: "Hikmah Isra Mi'raj untuk Generasi Milenial",
    author: 'Ustadz Nur H.',
    replies: 24,
    likes: 56,
    views: 340,
    hot: true,
  },
  {
    title: 'Program Beasiswa Anak Yatim NU Kedu',
    author: 'Siti Aminah',
    replies: 18,
    likes: 42,
    views: 210,
    hot: false,
  },
  {
    title: 'Jadwal Khotmil Quran Bulan Ini',
    author: 'Muhammad Rizki',
    replies: 12,
    likes: 31,
    views: 180,
    hot: false,
  },
];

export default function ForumHighlights({ onNavigate }: ForumHighlightsProps) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-emerald-900 text-lg">Forum Populer</h3>
          <p className="text-sm text-emerald-500 mt-0.5">Diskusi terhangat saat ini</p>
        </div>
        <MessageSquare className="w-5 h-5 text-emerald-300" />
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <button
            key={i}
            onClick={() => onNavigate?.('forum')}
            className="w-full text-left p-3 rounded-xl border border-emerald-50 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium text-emerald-800 leading-tight group-hover:text-emerald-900">
                {post.hot && <span className="text-red-500 mr-1">🔥</span>}
                {post.title}
              </h4>
              <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5 group-hover:text-emerald-500" />
            </div>
            <p className="text-[10px] text-emerald-400 mt-1">oleh {post.author}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <MessageSquare className="w-3 h-3" />
                {post.replies}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <ThumbsUp className="w-3 h-3" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <Eye className="w-3 h-3" />
                {post.views}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onNavigate?.('forum')}
        className="w-full mt-4 py-2.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors active:scale-95"
      >
        Buka Forum Diskusi →
      </button>
    </div>
  );
}
