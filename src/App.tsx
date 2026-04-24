import { useState } from 'react';
import { AuthProvider, useAuth } from './firebase/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilPage from './pages/ProfilPage';
import KegiatanPage from './pages/KegiatanPage';
import ForumPage from './pages/ForumPage';
import LazisnuPage from './pages/LazisnuPage';
import ArtikelPage from './pages/ArtikelPage';
import PengajianPage from './pages/PengajianPage';
import NotifikasiPage from './pages/NotifikasiPage';
import PengaturanPage from './pages/PengaturanPage';
import KelembagaanPage from './pages/KelembagaanPage';
import JaringanRantingPage from './pages/JaringanRantingPage';
import PendaftaranPage from './pages/PendaftaranPage';
import HakAksesPage from './pages/HakAksesPage';
import ChatPage from './pages/ChatPage';
import MasaHidmatPage from './pages/MasaHidmatPage';
import ArsipPage from './pages/ArsipPage';
import GalleryPage from './pages/GalleryPage';
import BantuanPage from './pages/BantuanPage';
import LegalPage from './pages/LegalPage';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center mx-auto mb-4 border border-emerald-100 animate-pulse">
            <img
              src="https://blogger.googleusercontent.com/img/a/AVvXsEikG35dotK_WNbgzE5vy4Q-9jWR1OlXf4p15XQDgN9lmx-0rY-trv76AA1L3WfZpLd-1djjLhzd_nqoznWh3WeTmegX144L5QoL3nGSHW5Wv8c8d_Z_tQCwxZqKBicaXYtORbEEOIDvai-OcVeZ8FX5jf7guBCUAMdp43oBztqG-gR0R4akiEiJnjSrsXAL"
              alt="MWC NU Kedu"
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-emerald-600 text-sm font-medium animate-pulse">Memuat portal...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Authenticated — show main app
  const navigateTo = (menu: string) => {
    setActiveMenu(menu);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard': return <DashboardPage onNavigate={navigateTo} />;
      case 'profil': return <ProfilPage />;
      case 'kegiatan': return <KegiatanPage />;
      case 'forum': return <ForumPage />;
      case 'lazisnu': return <LazisnuPage />;
      case 'artikel': return <ArtikelPage />;
      case 'pengajian': return <PengajianPage />;
      case 'notifikasi': return <NotifikasiPage />;
      case 'pengaturan': return <PengaturanPage />;
      case 'kelembagaan': return <KelembagaanPage />;
      case 'ranting': return <JaringanRantingPage />;
      case 'pendaftaran': return <PendaftaranPage />;
      case 'hak-akses': return <HakAksesPage />;
      case 'chat': return <ChatPage />;
      case 'masa-hidmat': return <MasaHidmatPage />;
      case 'arsip': return <ArsipPage />;
      case 'gallery': return <GalleryPage />;
      case 'bantuan': return <BantuanPage />;
      case 'legal': return <LegalPage />;
      default: return <DashboardPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
      />

      <div className="lg:ml-72 min-h-screen">
        <Header onMenuToggle={() => setSidebarOpen(true)} onNavigate={navigateTo} />

        <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
          {renderPage()}

          <footer className="text-center py-8 text-sm text-emerald-600/60 border-t border-emerald-100">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4 text-xs">
              {[
                { label: 'Dasar Hukum', tab: 'dasar-hukum' },
                { label: 'Kebijakan Privasi', tab: 'privasi' },
                { label: 'Syarat & Ketentuan', tab: 'syarat' },
                { label: 'Pedoman Komunitas', tab: 'komunitas' },
                { label: 'Disclaimer', tab: 'disclaimer' },
                { label: 'Kebijakan Cookies', tab: 'cookies' },
              ].map((link) => (
                <button
                  key={link.tab}
                  onClick={() => { setActiveMenu('legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-emerald-500 hover:text-emerald-700 hover:underline transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <p>© 2026 MWC NU Kecamatan Kedu, Temanggung — Portal Digital Nahdliyin</p>
            <p className="mt-1">Dibangun dengan ❤️ untuk kemajuan umat</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
