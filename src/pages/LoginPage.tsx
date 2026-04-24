import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  LogIn,
  UserPlus,
  ArrowLeft,
  Shield,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';

const villages = [
  'Desa Kedu', 'Desa Candimulyo', 'Desa Salamsari', 'Desa Danurejo',
  'Desa Mojotengah', 'Desa Karangtejo', 'Desa Mergowati', 'Desa Kutoanyar',
  'Desa Bandunggede', 'Desa Gondangwayang', 'Desa Kalisari', 'Desa Kundisari',
  'Desa Ngadimulyo', 'Desa Tegalsari',
];

export default function LoginPage() {
  const { login, loginWithGoogle, register, resetPassword } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', village: 'Desa Kedu',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err: any) {
      setError(
        err.code === 'auth/user-not-found' ? 'Email tidak terdaftar' :
        err.code === 'auth/wrong-password' ? 'Kata sandi salah' :
        err.code === 'auth/invalid-email' ? 'Format email tidak valid' :
        err.code === 'auth/too-many-requests' ? 'Terlalu banyak percobaan. Coba lagi nanti' :
        'Terjadi kesalahan. Silakan coba lagi'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.phone) {
      setError('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    if (form.password.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        village: form.village,
      });
    } catch (err: any) {
      setError(
        err.code === 'auth/email-already-in-use' ? 'Email sudah terdaftar' :
        err.code === 'auth/weak-password' ? 'Kata sandi terlalu lemah' :
        err.code === 'auth/invalid-email' ? 'Format email tidak valid' :
        'Terjadi kesalahan. Silakan coba lagi'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Google Login Error:', err); // Log detail error ke konsol
      if (err.code === 'auth/operation-not-allowed') {
        setError('Login Google belum diaktifkan di Firebase Console.');
      } else if (err.code !== 'auth/popup-closed-by-user') {
        setError(`Login gagal: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.email) {
      setError('Masukkan email Anda');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(form.email);
      setSuccess('Link reset password telah dikirim ke email Anda. Silakan cek inbox/spam.');
    } catch (err: any) {
      setError(
        err.code === 'auth/user-not-found' ? 'Email tidak terdaftar' :
        'Terjadi kesalahan. Silakan coba lagi'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <img
              src="https://blogger.googleusercontent.com/img/a/AVvXsEikG35dotK_WNbgzE5vy4Q-9jWR1OlXf4p15XQDgN9lmx-0rY-trv76AA1L3WfZpLd-1djjLhzd_nqoznWh3WeTmegX144L5QoL3nGSHW5Wv8c8d_Z_tQCwxZqKBicaXYtORbEEOIDvai-OcVeZ8FX5jf7guBCUAMdp43oBztqG-gR0R4akiEiJnjSrsXAL"
              alt="MWC NU Kedu"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-emerald-900">Portal Digital NU Kedu</h1>
          <p className="text-sm text-emerald-500 mt-1">MWC NU Kecamatan Kedu, Temanggung</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-xl shadow-emerald-100/30 overflow-hidden">
          {/* Tab Switcher */}
          {mode !== 'forgot' && (
            <div className="flex border-b border-emerald-100">
              <button
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-3.5 text-sm font-medium transition-all ${
                  mode === 'login' ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/30' : 'text-emerald-400 hover:text-emerald-600'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                className={`flex-1 py-3.5 text-sm font-medium transition-all ${
                  mode === 'register' ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/30' : 'text-emerald-400 hover:text-emerald-600'
                }`}
              >
                Daftar Baru
              </button>
            </div>
          )}

          <div className="p-6">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-xs text-emerald-600">{success}</p>
              </div>
            )}

            {/* LOGIN */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@contoh.com"
                      className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Masukkan kata sandi"
                      className="w-full bg-emerald-50 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">
                    Lupa kata sandi?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-emerald-100" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-emerald-400">atau</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-emerald-200 py-3 rounded-xl text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Masuk dengan Google
                </button>
              </form>
            )}

            {/* REGISTER */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama sesuai KTP" className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">No. WhatsApp *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Ranting/Desa *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <select value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 appearance-none">
                      {villages.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kata Sandi * (min. 6 karakter)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Buat kata sandi" className="w-full bg-emerald-50 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" required minLength={6} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 mb-2">
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Masuk
                </button>
                <div className="text-center mb-4">
                  <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h3 className="font-bold text-emerald-900">Reset Kata Sandi</h3>
                  <p className="text-xs text-emerald-500 mt-1">Masukkan email Anda dan kami akan mengirimkan link reset</p>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" className="w-full bg-emerald-50 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" required />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-4 text-center">
            <p className="text-[10px] text-emerald-400">
              Dengan masuk, Anda menyetujui <button className="underline">Syarat & Ketentuan</button> dan <button className="underline">Kebijakan Privasi</button> kami.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-emerald-400 mt-6">
          © 2026 MWC NU Kecamatan Kedu, Temanggung
        </p>
      </div>
    </div>
  );
}
