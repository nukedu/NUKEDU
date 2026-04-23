import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Search,
  X,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Image as ImageIcon,
  CheckCheck,
  Check,
  ChevronLeft,
  Pin,
  Bell,
  BellOff,
  Trash2,
  Reply,
  Mic,
  Info,
  Plus,
  Camera,
  Hash,
  VolumeX,
} from 'lucide-react';

// ========================
// TYPES
// ========================
interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  date?: string;
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
  reactions?: { emoji: string; count: number }[];
  isSystem?: boolean;
}

interface ChatContact {
  id: number;
  name: string;
  initials: string;
  gradient: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing: boolean;
  village: string;
  role: string;
  isGroup?: boolean;
  members?: number;
  pinned?: boolean;
  muted?: boolean;
}

// ========================
// DATA
// ========================
const contacts: ChatContact[] = [
  { id: 100, name: 'Pengurus MWC NU Kedu', initials: 'MWC', gradient: 'from-violet-500 to-purple-600', lastMessage: 'H. Nur: Rapat ditunda ke Sabtu ya', time: '10:30', unread: 5, online: true, typing: false, village: 'MWC', role: 'Grup', isGroup: true, members: 15, pinned: true },
  { id: 101, name: 'Ketua Ranting Se-Kedu', initials: 'KR', gradient: 'from-blue-500 to-indigo-600', lastMessage: 'Rizki: Laporan sudah saya kirim', time: '09:15', unread: 0, online: true, typing: false, village: 'Kecamatan', role: 'Grup', isGroup: true, members: 14, pinned: true },
  { id: 102, name: 'LAZISNU Kedu', initials: 'LAZ', gradient: 'from-rose-500 to-pink-600', lastMessage: 'Donasi bulan ini Alhamdulillah capai target', time: 'Kemarin', unread: 0, online: false, typing: false, village: 'LAZISNU', role: 'Grup', isGroup: true, members: 8 },
  { id: 1, name: 'Ustadz Nur Hidayat', initials: 'UN', gradient: 'from-emerald-500 to-teal-600', lastMessage: 'Baik, insya Allah kita bahas besok...', time: '10:15', unread: 2, online: true, typing: false, village: 'Desa Kedu', role: 'Admin MWC' },
  { id: 2, name: 'Siti Aminah', initials: 'SA', gradient: 'from-blue-500 to-cyan-600', lastMessage: 'Jazakallah khair atas informasinya', time: '09:58', unread: 0, online: true, typing: true, village: 'Desa Candimulyo', role: 'Kontributor' },
  { id: 3, name: 'Muhammad Rizki', initials: 'MR', gradient: 'from-purple-500 to-violet-600', lastMessage: 'Sudah saya upload materinya', time: '08:30', unread: 0, online: false, typing: false, village: 'Desa Danurejo', role: 'Ketua Ranting' },
  { id: 4, name: 'Fatimah Azzahra', initials: 'FA', gradient: 'from-rose-500 to-red-600', lastMessage: 'Mohon doanya untuk acara besok', time: 'Kemarin', unread: 0, online: true, typing: false, village: 'Desa Kedu', role: 'Sekretaris' },
  { id: 5, name: 'H. Slamet Riyadi', initials: 'SR', gradient: 'from-amber-500 to-orange-600', lastMessage: 'Alhamdulillah, bantuan sudah tersalurkan', time: 'Kemarin', unread: 0, online: false, typing: false, village: 'Desa Mojotengah', role: 'Ketua Ranting' },
  { id: 6, name: 'Budi Santoso', initials: 'BS', gradient: 'from-teal-500 to-cyan-600', lastMessage: 'Insya Allah saya hadir', time: 'Sen', unread: 0, online: false, typing: false, village: 'Desa Salamsari', role: 'Anggota' },
  { id: 7, name: 'Dr. H. Ahmad Fauzi', initials: 'AF', gradient: 'from-indigo-500 to-blue-600', lastMessage: 'Silakan koordinasikan dg bendahara', time: 'Min', unread: 0, online: false, typing: false, village: 'MWC NU Kedu', role: 'Ketua Tanfidziyah' },
];

const allMessages: Record<number, Message[]> = {
  1: [
    { id: 1, text: 'Assalamu\'alaikum ustadz 🌙', sender: 'me', time: '09:00', date: 'Hari ini', status: 'read' },
    { id: 2, text: 'Wa\'alaikumussalam Ahmad, wa rahmatullahi wa barakatuh', sender: 'other', time: '09:02', status: 'read' },
    { id: 3, text: 'Saya ingin bertanya tentang jadwal pengajian minggu ini', sender: 'me', time: '09:03', status: 'read' },
    { id: 4, text: 'Insya Allah tetap Ahad Wage\n\n📍 Masjid Al-Ikhlas, Kedu\n🕐 Pukul 20:00 - 22:00 WIB\n📖 Kitab Ihya Ulumiddin — Bab Taubat', sender: 'other', time: '09:05', status: 'read' },
    { id: 5, text: 'Baik ustadz, apakah ada materi khusus yang perlu dipersiapkan?', sender: 'me', time: '09:07', status: 'read' },
    { id: 6, text: 'Silakan bawa kitab Ihya Ulumiddin jilid 4. Kalau tidak punya, bisa pinjam di perpustakaan masjid', sender: 'other', time: '09:10', status: 'read' },
    { id: 7, text: 'Siap ustadz, saya akan persiapkan\nJazakallah khair 🙏', sender: 'me', time: '09:12', status: 'read', reactions: [{ emoji: '🤲', count: 1 }] },
    { id: 8, text: 'Baik, insya Allah kita bahas besok malam. Semoga Allah mudahkan ilmunya. Aamiin ya Rabbal Alamiin', sender: 'other', time: '10:15', status: 'delivered' },
  ],
  100: [
    { id: 1, text: 'Assalamu\'alaikum semua pengurus MWC NU Kedu 🌙', sender: 'other', time: '08:00', date: 'Hari ini', status: 'read', isSystem: false },
    { id: 2, text: 'Saya ingin menyampaikan agenda rapat bulanan MWC NU Kedu untuk bulan Januari 2026', sender: 'other', time: '08:02', status: 'read' },
    { id: 3, text: '📅 Rapat Koordinasi Bulanan\n\nHari: Sabtu, 18 Januari 2026\nWaktu: 09:00 - 12:00 WIB\nTempat: Kantor MWC NU Kedu\n\nAgenda:\n1. Evaluasi program kerja Q4 2025\n2. Rencana kerja Q1 2026\n3. Laporan keuangan LAZISNU\n4. Koordinasi kegiatan Isra Mi\'raj', sender: 'other', time: '08:05', status: 'read' },
    { id: 4, text: 'Mohon konfirmasi kehadirannya ya 🙏', sender: 'other', time: '08:06', status: 'read' },
    { id: 5, text: 'Siap, insya Allah hadir ✅', sender: 'me', time: '08:15', status: 'read' },
    { id: 6, text: 'Saya juga insya Allah hadir 👍', sender: 'other', time: '08:20', status: 'read' },
    { id: 7, text: 'Mohon maaf, ada perubahan jadwal.\nRapat ditunda ke Sabtu depan karena ada beberapa pengurus yang berhalangan hadir.\n\nTerima kasih atas pengertiannya 🙏', sender: 'other', time: '10:30', status: 'delivered' },
  ],
};

// ========================
// COMPONENT
// ========================
export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState(allMessages);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [pinnedChats, setPinnedChats] = useState<number[]>([100, 101]);
  const [mutedChats, setMutedChats] = useState<number[]>([]);
  const [notif, setNotif] = useState<string | null>(null);
  const [contactList, setContactList] = useState(contacts);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const selectedContact = contactList.find((c) => c.id === selectedChat);
  const chatMessages = selectedChat ? (messages[selectedChat] || []) : [];

  const filteredContacts = contactList.filter(
    (c) => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedContacts = filteredContacts.filter(c => pinnedChats.includes(c.id));
  const regularContacts = filteredContacts.filter(c => !pinnedChats.includes(c.id));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chatMessages.length]);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChat) return;
    const newMsg: Message = {
      id: Date.now(),
      text: replyTo ? `↩ ${replyTo}\n\n${inputText}` : inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    // Update last message in contact
    setContactList(prev => prev.map(c =>
      c.id === selectedChat ? { ...c, lastMessage: inputText.slice(0, 40), time: newMsg.time, typing: false } : c
    ));
    setInputText('');
    setReplyTo(null);
    setShowEmoji(false);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChat]: prev[selectedChat]?.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' as const } : m) || [],
      }));
    }, 800);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedChat]: prev[selectedChat]?.map(m => m.id === newMsg.id ? { ...m, status: 'read' as const } : m) || [],
      }));
    }, 2000);

    // Simulate typing & reply for personal chats
    if (!selectedContact?.isGroup) {
      setTimeout(() => {
        setContactList(prev => prev.map(c => c.id === selectedChat ? { ...c, typing: true } : c));
      }, 1500);

      setTimeout(() => {
        setContactList(prev => prev.map(c => c.id === selectedChat ? { ...c, typing: false } : c));
        const replies = [
          'Baik, terima kasih infonya 🙏',
          'Insya Allah, saya catat ya',
          'Siap, semoga Allah mudahkan',
          'Jazakallah khair, sangat membantu',
          'Alhamdulillah, saya setuju',
          'Baik, nanti saya sampaikan ke yang lain',
        ];
        const replyMsg: Message = {
          id: Date.now() + 1,
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: 'other',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
        };
        setMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), replyMsg],
        }));
        setContactList(prev => prev.map(c =>
          c.id === selectedChat ? { ...c, lastMessage: replyMsg.text.slice(0, 40), time: replyMsg.time } : c
        ));
      }, 3500);
    }
  };

  const handlePin = (id: number) => {
    setPinnedChats(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    showToast(pinnedChats.includes(id) ? 'Chat di-unpin' : 'Chat dipin ke atas');
  };

  const handleMute = (id: number) => {
    setMutedChats(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    showToast(mutedChats.includes(id) ? 'Notifikasi diaktifkan' : 'Notifikasi dimatikan');
  };

  const handleDeleteChat = (id: number) => {
    setMessages(prev => ({ ...prev, [id]: [] }));
    setSelectedChat(null);
    showToast('Riwayat chat dihapus');
  };

  const emojis = ['🤲', '🕌', '🌙', '✅', '🙏', '❤️', '😊', '👍', '💪', '🔥', '👏', '💯', '🎉', '✨', '📖'];

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'sent') return <Check className="w-3 h-3 text-slate-400" />;
    if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
    return <CheckCheck className="w-3.5 h-3.5 text-sky-400" />;
  };

  const formatDateSeparator = (date: string) => {
    return date || 'Hari ini';
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';
  chatMessages.forEach((msg) => {
    const d = msg.date || 'Hari ini';
    if (d !== currentDate) {
      currentDate = d;
      groupedMessages.push({ date: d, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="-mx-4 md:-mx-6 lg:-mx-8 -mt-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium animate-bounce backdrop-blur-xl">
          {notif}
        </div>
      )}

      <div className="flex h-screen" style={{ height: 'calc(100vh - 80px)' }}>
        {/* ======== SIDEBAR (Contacts) ======== */}
        <div className={`${showSidebar ? 'w-full md:w-[340px] lg:w-[360px]' : 'w-0 overflow-hidden'} flex-shrink-0 border-r border-slate-200/80 bg-white/60 backdrop-blur-2xl flex flex-col transition-all duration-300`}>
          {/* Sidebar Header — macOS style */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chat</h1>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search — macOS style pill */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-slate-100/80 rounded-xl pl-9 pr-9 py-2 text-sm outline-none text-slate-800 placeholder:text-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-sky-200 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin">
            {/* Pinned */}
            {pinnedContacts.length > 0 && (
              <div className="px-3 pt-2 pb-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pinned</p>
              </div>
            )}
            {pinnedContacts.map((chat) => (
              <ContactItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChat === chat.id}
                isMuted={mutedChats.includes(chat.id)}
                isPinned={pinnedChats.includes(chat.id)}
                onClick={() => { setSelectedChat(chat.id); setShowSidebar(false); setTimeout(() => inputRef.current?.focus(), 100); }}
                onPin={() => handlePin(chat.id)}
                onMute={() => handleMute(chat.id)}
                onDelete={() => handleDeleteChat(chat.id)}
              />
            ))}

            {/* All Messages */}
            <div className="px-3 pt-3 pb-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">All Messages</p>
            </div>
            {regularContacts.map((chat) => (
              <ContactItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChat === chat.id}
                isMuted={mutedChats.includes(chat.id)}
                isPinned={pinnedChats.includes(chat.id)}
                onClick={() => { setSelectedChat(chat.id); setShowSidebar(false); setTimeout(() => inputRef.current?.focus(), 100); }}
                onPin={() => handlePin(chat.id)}
                onMute={() => handleMute(chat.id)}
                onDelete={() => handleDeleteChat(chat.id)}
              />
            ))}

            {filteredContacts.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                Tidak ada chat ditemukan
              </div>
            )}
          </div>
        </div>

        {/* ======== CHAT AREA ======== */}
        {selectedChat && selectedContact ? (
          <div className={`flex-1 flex flex-col ${showSidebar ? 'hidden md:flex' : 'flex'} bg-gradient-to-b from-slate-50 to-white`}>
            {/* Chat Header — macOS Tahoe style */}
            <div className="flex-shrink-0 px-5 py-3 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowSidebar(true)} className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-[14px] bg-gradient-to-br ${selectedContact.gradient} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                      {selectedContact.initials}
                    </div>
                    {selectedContact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-[2.5px] border-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-slate-900 leading-tight">{selectedContact.name}</h2>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {selectedContact.typing ? (
                        <span className="text-emerald-500 font-medium">typing...</span>
                      ) : selectedContact.isGroup ? (
                        `${selectedContact.members} members`
                      ) : selectedContact.online ? (
                        'Online'
                      ) : (
                        selectedContact.role
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <button onClick={() => showToast('Panggilan suara')} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
                    <Phone className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => showToast('Panggilan video')} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500">
                    <Video className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => setShowInfo(!showInfo)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${showInfo ? 'bg-sky-100 text-sky-600' : 'hover:bg-slate-100 text-slate-500'}`}>
                    <Info className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 space-y-1">
                {/* Group intro */}
                {selectedContact.isGroup && (
                  <div className="text-center py-6">
                    <div className={`w-16 h-16 rounded-[22px] bg-gradient-to-br ${selectedContact.gradient} flex items-center justify-center text-white text-lg font-bold mx-auto mb-3 shadow-lg`}>
                      {selectedContact.initials}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{selectedContact.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{selectedContact.members} anggota • Grup {selectedContact.village}</p>
                  </div>
                )}

                {/* Messages */}
                {groupedMessages.map((group) => (
                  <div key={group.date}>
                    {/* Date Separator — iMessage style */}
                    <div className="flex items-center justify-center my-4">
                      <span className="text-[11px] font-medium text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-slate-100">
                        {formatDateSeparator(group.date)}
                      </span>
                    </div>

                    {group.messages.map((msg, idx) => {
                      const isMe = msg.sender === 'me';
                      const prevMsg = idx > 0 ? group.messages[idx - 1] : null;
                      const nextMsg = idx < group.messages.length - 1 ? group.messages[idx + 1] : null;
                      const isConsecutive = prevMsg?.sender === msg.sender;
                      const isLast = !nextMsg || nextMsg.sender !== msg.sender;

                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mt-[2px]' : 'mt-3'}`}
                        >
                          {/* Avatar for group chats (other sender) */}
                          {!isMe && selectedContact.isGroup && (
                            <div className="w-7 flex-shrink-0 mr-2 self-end">
                              {isLast ? (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-[9px] font-bold">
                                  UN
                                </div>
                              ) : null}
                            </div>
                          )}

                          <div className={`relative max-w-[75%] group ${isMe ? 'items-end' : 'items-start'}`}>
                            {/* Sender name for group */}
                            {!isMe && selectedContact.isGroup && !isConsecutive && (
                              <p className="text-[11px] font-semibold text-slate-500 mb-0.5 ml-1">
                                {selectedContact.name.split(' ').slice(0, 2).join(' ')}
                              </p>
                            )}

                            {/* Bubble — iMessage style */}
                            <div
                              className={`px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
                                isMe
                                  ? `bg-gradient-to-br from-sky-500 to-blue-600 text-white ${isLast ? 'rounded-[22px] rounded-br-[6px]' : 'rounded-[22px]'} shadow-sm`
                                  : `bg-white text-slate-800 ${isLast ? 'rounded-[22px] rounded-bl-[6px]' : 'rounded-[22px]'} shadow-sm border border-slate-100/80`
                              }`}
                            >
                              {msg.text}
                            </div>

                            {/* Reactions */}
                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className={`flex gap-1 mt-0.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                {msg.reactions.map((r, ri) => (
                                  <span key={ri} className="bg-white rounded-full px-1.5 py-0.5 text-xs shadow-sm border border-slate-100 cursor-pointer hover:scale-110 transition-transform">
                                    {r.emoji} {r.count > 1 ? r.count : ''}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Timestamp + Status — iMessage style */}
                            {isLast && (
                              <div className={`flex items-center gap-1 mt-0.5 ${isMe ? 'justify-end' : 'justify-start'} px-1`}>
                                <span className="text-[10px] text-slate-400">{msg.time}</span>
                                {isMe && <StatusIcon status={msg.status} />}
                              </div>
                            )}

                            {/* Hover Actions — macOS style */}
                            <div className={`absolute top-0 ${isMe ? '-left-10' : '-right-10'} hidden group-hover:flex items-center gap-0.5 bg-white rounded-xl shadow-lg border border-slate-100 p-0.5 z-10`}>
                              <button onClick={() => setReplyTo(msg.text.slice(0, 30))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                                <Reply className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => showToast('Reaksi ditambahkan')} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                                <Smile className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Typing Indicator */}
                {selectedContact.typing && (
                  <div className="flex items-end gap-2 mt-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                      {selectedContact.initials}
                    </div>
                    <div className="bg-white rounded-[22px] rounded-bl-[6px] px-4 py-3 shadow-sm border border-slate-100/80">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Emoji Bar */}
            {showEmoji && (
              <div className="px-4 py-3 bg-white/80 backdrop-blur-xl border-t border-slate-100">
                <div className="max-w-3xl mx-auto flex flex-wrap gap-1.5">
                  {emojis.map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => setInputText(inputText + emoji)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl hover:bg-slate-100 transition-all hover:scale-110 active:scale-95"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reply Preview */}
            {replyTo && (
              <div className="px-4 py-2 bg-sky-50/80 border-t border-sky-100 flex items-center gap-3">
                <div className="w-0.5 h-8 bg-sky-400 rounded-full" />
                <Reply className="w-4 h-4 text-sky-500 shrink-0" />
                <p className="text-xs text-sky-600 flex-1 truncate font-medium">{replyTo}...</p>
                <button onClick={() => setReplyTo(null)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-sky-100 text-sky-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Input Bar — macOS/iMessage style */}
            <div className="flex-shrink-0 px-4 pb-4 pt-2">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-300 transition-all">
                  {/* Left Actions */}
                  <button onClick={() => showToast('Buka kamera')} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 shrink-0 mb-0.5">
                    <Camera className="w-5 h-5" />
                  </button>
                  <button onClick={() => showToast('Lampiran file')} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 shrink-0 mb-0.5">
                    <Plus className="w-5 h-5" />
                  </button>

                  {/* Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Message"
                    className="flex-1 bg-transparent outline-none text-[15px] text-slate-800 placeholder:text-slate-400 py-1.5 min-w-0"
                  />

                  {/* Right Actions */}
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 mb-0.5 ${showEmoji ? 'bg-sky-100 text-sky-500' : 'hover:bg-slate-100 text-slate-400'}`}
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {inputText.trim() ? (
                    <button
                      onClick={handleSend}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all active:scale-90 shrink-0 mb-0.5"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast('Rekam suara')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 shrink-0 mb-0.5"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State — macOS style */
          <div className={`flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white ${showSidebar ? 'hidden md:flex' : 'flex'}`}>
            <div className="w-20 h-20 rounded-[26px] bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mb-5 shadow-sm">
              <Send className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">Chat Anggota NU Kedu</h2>
            <p className="text-sm text-slate-400 max-w-xs text-center leading-relaxed">
              Pilih percakapan dari sidebar atau mulai chat baru dengan sesama anggota NU Kecamatan Kedu
            </p>
            <button onClick={() => showToast('Buat chat baru')} className="mt-5 flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm active:scale-95">
              <Plus className="w-4 h-4" /> Mulai Chat Baru
            </button>
          </div>
        )}

        {/* ======== INFO PANEL — macOS style ======== */}
        {showInfo && selectedContact && (
          <div className="w-[280px] border-l border-slate-200/80 bg-white/60 backdrop-blur-2xl flex flex-col overflow-y-auto hidden lg:flex flex-shrink-0">
            {/* Close */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-sm font-semibold text-slate-500">Info</span>
              <button onClick={() => setShowInfo(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile */}
            <div className="text-center px-4 py-4">
              <div className={`w-[72px] h-[72px] rounded-[22px] bg-gradient-to-br ${selectedContact.gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-lg`}>
                {selectedContact.initials}
              </div>
              <h3 className="font-bold text-slate-900 text-[17px]">{selectedContact.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedContact.village}</p>
              <p className="text-xs text-slate-400">{selectedContact.role}</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 px-4 pb-4">
              {[
                { icon: Bell, label: 'Mute', action: () => handleMute(selectedChat!), active: mutedChats.includes(selectedChat!) },
                { icon: Pin, label: 'Pin', action: () => handlePin(selectedChat!), active: pinnedChats.includes(selectedChat!) },
                { icon: Search, label: 'Search', action: () => showToast('Cari pesan') },
                { icon: Trash2, label: 'Delete', action: () => handleDeleteChat(selectedChat!) },
              ].map((a, i) => {
                const AIcon = a.icon;
                return (
                  <button key={i} onClick={a.action} className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${a.active ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500'}`}>
                      <AIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-400">{a.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-px bg-slate-100 mx-4" />

            {/* Details */}
            <div className="px-4 py-4 space-y-3">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Details</h4>
              {[
                { label: 'Village', value: selectedContact.village },
                { label: 'Role', value: selectedContact.role },
                { label: selectedContact.isGroup ? 'Members' : 'Status', value: selectedContact.isGroup ? `${selectedContact.members} anggota` : selectedContact.online ? 'Online' : 'Offline' },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span className="text-xs text-slate-400">{d.label}</span>
                  <span className="text-xs font-medium text-slate-700">{d.value}</span>
                </div>
              ))}
            </div>

            {/* Shared Media */}
            <div className="px-4 pb-4">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Shared Media</h4>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    <ImageIcon className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================
// CONTACT ITEM COMPONENT
// ========================
function ContactItem({ chat, isSelected, isMuted, isPinned, onClick, onPin, onMute, onDelete }: {
  chat: ChatContact;
  isSelected: boolean;
  isMuted: boolean;
  isPinned: boolean;
  onClick: () => void;
  onPin: () => void;
  onMute: () => void;
  onDelete: () => void;
}) {
  const [showCtx, setShowCtx] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onContextMenu={(e) => { e.preventDefault(); setShowCtx(!showCtx); }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
          isSelected
            ? 'bg-gradient-to-r from-sky-50 to-blue-50 shadow-sm'
            : 'hover:bg-slate-50'
        }`}
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-[46px] h-[46px] rounded-[15px] bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-white font-bold text-xs shadow-sm ${isMuted ? 'opacity-60' : ''}`}>
            {chat.initials}
          </div>
          {chat.online && !chat.isGroup && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[2.5px] border-white" />
          )}
          {chat.isGroup && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
              <Hash className="w-2.5 h-2.5 text-slate-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className={`text-[15px] truncate ${chat.unread > 0 ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
              {isMuted && <VolumeX className="w-3 h-3 inline mr-1 text-slate-400" />}
              {chat.name}
            </p>
            <span className={`text-[11px] flex-shrink-0 ml-2 ${chat.unread > 0 ? 'text-sky-500 font-semibold' : 'text-slate-400'}`}>
              {chat.time}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-[13px] truncate ${chat.unread > 0 ? 'text-slate-600' : 'text-slate-400'}`}>
              {chat.typing ? (
                <span className="text-emerald-500 font-medium italic">typing...</span>
              ) : (
                chat.lastMessage
              )}
            </p>
            {chat.unread > 0 && (
              <span className="ml-2 w-5 h-5 bg-sky-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold flex-shrink-0">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Context Menu */}
      {showCtx && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowCtx(false)} />
          <div className="absolute right-2 top-12 z-20 bg-white rounded-xl shadow-xl border border-slate-100 p-1 w-40 animate-in fade-in slide-in-from-top-2">
            {[
              { icon: Pin, label: isPinned ? 'Unpin' : 'Pin', action: () => { onPin(); setShowCtx(false); } },
              { icon: isMuted ? Bell : BellOff, label: isMuted ? 'Unmute' : 'Mute', action: () => { onMute(); setShowCtx(false); } },
              { icon: Trash2, label: 'Delete', action: () => { onDelete(); setShowCtx(false); }, danger: true },
            ].map((item, i) => {
              const IIcon = item.icon;
              return (
                <button key={i} onClick={item.action} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <IIcon className="w-3.5 h-3.5" /> {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
