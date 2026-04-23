import { useState } from 'react';
import {
  Scale,
  Shield,
  FileText,
  Users,
  AlertTriangle,
  Cookie,
  Printer,
  Download,
  Share2,
  Clock,
  Check,
  Info,
} from 'lucide-react';

type TabType = 'dasar-hukum' | 'privasi' | 'syarat' | 'komunitas' | 'disclaimer' | 'cookies';

const tabs = [
  { id: 'dasar-hukum' as TabType, label: 'Dasar Hukum', icon: Scale, color: 'text-emerald-600' },
  { id: 'privasi' as TabType, label: 'Kebijakan Privasi', icon: Shield, color: 'text-blue-600' },
  { id: 'syarat' as TabType, label: 'Syarat & Ketentuan', icon: FileText, color: 'text-purple-600' },
  { id: 'komunitas' as TabType, label: 'Pedoman Komunitas', icon: Users, color: 'text-amber-600' },
  { id: 'disclaimer' as TabType, label: 'Disclaimer', icon: AlertTriangle, color: 'text-red-600' },
  { id: 'cookies' as TabType, label: 'Kebijakan Cookies', icon: Cookie, color: 'text-cyan-600' },
];

const lastUpdated = '15 Januari 2026';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dasar-hukum');
  const [notif, setNotif] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({ essential: true, analytics: true, marketing: false, preferences: true });

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const handlePrint = () => {
    showToast('Menyiapkan dokumen untuk dicetak...');
    window.print();
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
        <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
        {title}
      </h3>
      <div className="text-sm text-emerald-700 leading-relaxed space-y-3 pl-4">{children}</div>
    </div>
  );

  const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-emerald-800 mb-2">{title}</h4>
      <div className="text-sm text-emerald-600 leading-relaxed space-y-2">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-emerald-900 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <Scale className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-6 h-6 text-emerald-300" />
            <span className="text-emerald-300 text-xs uppercase tracking-wide font-semibold">Legal & Kebijakan</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Kebijakan & Informasi Hukum</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl">
            Dokumen resmi kebijakan, syarat & ketentuan, serta regulasi yang mengatur penggunaan Portal Digital MWC NU Kecamatan Kedu
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Terakhir diperbarui: {lastUpdated}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">Versi 2.0</span>
          </div>
        </div>
      </div>

      {/* Quick Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all active:scale-95 ${
                activeTab === t.id ? 'ring-2 ring-emerald-500 shadow-lg bg-white' : 'bg-white border border-emerald-100/60 hover:shadow-md'
              }`}
            >
              <Icon className={`w-6 h-6 ${activeTab === t.id ? 'text-emerald-600' : 'text-slate-400'} mb-2`} />
              <p className={`text-xs font-bold leading-tight ${activeTab === t.id ? 'text-emerald-800' : 'text-slate-600'}`}>{t.label}</p>
              {activeTab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar TOC */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 sticky top-24 space-y-1">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">Daftar Dokumen</h3>
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                    activeTab === t.id ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />{t.label}
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-emerald-100 space-y-2">
              <button onClick={handlePrint} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-emerald-600 hover:bg-emerald-50 transition-colors">
                <Printer className="w-3.5 h-3.5" /> Cetak Dokumen
              </button>
              <button onClick={() => showToast('Dokumen diunduh sebagai PDF')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-emerald-600 hover:bg-emerald-50 transition-colors">
                <Download className="w-3.5 h-3.5" /> Unduh PDF
              </button>
              <button onClick={() => showToast('Link dokumen disalin!')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-emerald-600 hover:bg-emerald-50 transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Bagikan
              </button>
            </div>

            <div className="pt-3 mt-3 border-t border-emerald-100 p-3 bg-emerald-50/60 rounded-xl">
              <p className="text-[10px] text-emerald-500 leading-relaxed">
                <Info className="w-3 h-3 inline mr-1" />
                Dokumen ini disusun sesuai peraturan perundang-undangan yang berlaku di Republik Indonesia dan AD/ART NU.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 md:p-8">
            {/* ===== DASAR HUKUM ===== */}
            {activeTab === 'dasar-hukum' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Dasar Hukum</h2>
                    <p className="text-xs text-emerald-500">Landasan hukum pendirian dan operasional portal</p>
                  </div>
                </div>

                <Section title="Landasan Organisasi Nahdlatul Ulama">
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Anggaran Dasar (AD) Nahdlatul Ulama</strong> — Keputusan Muktamar NU tentang dasar organisasi, struktur kepengurusan, dan mekanisme kerja di semua tingkatan dari PBNU hingga Ranting.
                    </li>
                    <li>
                      <strong>Anggaran Rumah Tangga (ART) Nahdlatul Ulama</strong> — Aturan pelaksana AD yang mengatur tata cara, prosedur, dan mekanisme operasional organisasi di setiap jenjang.
                    </li>
                    <li>
                      <strong>Keputusan Konbes NU</strong> — Keputusan Konferensi Besar tentang pengembangan digitalisasi dan modernisasi layanan organisasi.
                    </li>
                    <li>
                      <strong>Keputusan Tanfidziah PBNU tentang Digitalisasi</strong> — Instruksi PBNU tentang pemanfaatan teknologi informasi untuk penguatan jaringan NU di semua tingkatan.
                    </li>
                  </ol>
                </Section>

                <Section title="Landasan Peraturan Perundang-undangan">
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Undang-Undang No. 16 Tahun 2017</strong> tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2017 tentang Perubahan atas Undang-Undang Nomor 17 Tahun 2013 tentang Organisasi Kemasyarakatan menjadi Undang-Undang.
                    </li>
                    <li>
                      <strong>Undang-Undang No. 11 Tahun 2008</strong> tentang Informasi dan Transaksi Elektronik (ITE) sebagaimana diubah dengan UU No. 19 Tahun 2016.
                    </li>
                    <li>
                      <strong>Undang-Undang No. 27 Tahun 2022</strong> tentang Pelindungan Data Pribadi (UU PDP).
                    </li>
                    <li>
                      <strong>Peraturan Pemerintah No. 71 Tahun 2019</strong> tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
                    </li>
                    <li>
                      <strong>Peraturan Menteri Komunikasi dan Informatika No. 5 Tahun 2020</strong> tentang Penyelenggara Sistem Elektronik Lingkup Privat.
                    </li>
                    <li>
                      <strong>Peraturan BSSN No. 8 Tahun 2020</strong> tentang Tata Kelola Keamanan Informasi.
                    </li>
                  </ol>
                </Section>

                <Section title="Landasan Kelembagaan Lokal">
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>SK MWC NU Kedu No. 001/MWC-KDU/I/2022</strong> tentang Pembentukan Kepengurusan MWC NU Kecamatan Kedu Periode 2022-2027.
                    </li>
                    <li>
                      <strong>SK MWC NU Kedu No. 002/MWC-KDU/I/2022</strong> tentang Pembentukan Ranting NU se-Kecamatan Kedu (14 Desa).
                    </li>
                    <li>
                      <strong>Keputusan MWC NU Kedu No. 003/MWC-KDU/III/2024</strong> tentang Pembentukan Portal Digital MWC NU Kedu.
                    </li>
                    <li>
                      <strong>MoU dengan UPZIS LAZISNU Kabupaten Temanggung</strong> tentang pengelolaan zakat, infaq, dan shadaqah secara digital.
                    </li>
                  </ol>
                </Section>

                <Section title="Struktur Kepengurusan yang Berwenang">
                  <p>Portal Digital MWC NU Kedu dikelola oleh pengurus MWC NU Kecamatan Kedu yang sah berdasarkan SK, di bawah pengawasan:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Rais Syuriyah MWC NU Kedu</strong> — Pengawasan syar'i</li>
                    <li><strong>Ketua Tanfidziyah MWC NU Kedu</strong> — Penanggung jawab operasional</li>
                    <li><strong>Sekretaris MWC NU Kedu</strong> — Administrasi dan dokumentasi</li>
                    <li><strong>Bendahara MWC NU Kedu</strong> — Pengelolaan keuangan termasuk LAZISNU</li>
                    <li><strong>Divisi Media Digital</strong> — Pengelola teknis portal</li>
                  </ul>
                </Section>

                <div className="mt-6 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <p className="text-xs text-emerald-700"><strong>Catatan:</strong> Seluruh kebijakan dan operasional portal tunduk pada hukum yang berlaku di Republik Indonesia, AD/ART Nahdlatul Ulama, serta keputusan-keputusan organisasi di tingkat MWC, PC, PW, dan PBNU.</p>
                </div>
              </div>
            )}

            {/* ===== KEBIJAKAN PRIVASI ===== */}
            {activeTab === 'privasi' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Kebijakan Privasi</h2>
                    <p className="text-xs text-emerald-500">Pelindungan data pribadi sesuai UU No. 27/2022 (UU PDP)</p>
                  </div>
                </div>

                <Section title="1. Pengantar">
                  <p>MWC NU Kecamatan Kedu ("kami") berkomitmen untuk melindungi privasi dan data pribadi seluruh pengguna Portal Digital NU Kedu ("Anda"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda sesuai dengan Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>
                </Section>

                <Section title="2. Data Pribadi yang Dikumpulkan">
                  <SubSection title="a. Data Identitas Diri">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Nama lengkap sesuai KTP/KK</li>
                      <li>Tempat dan tanggal lahir</li>
                      <li>Jenis kelamin</li>
                      <li>Nomor KTP/NIK (opsional)</li>
                      <li>Foto profil</li>
                    </ul>
                  </SubSection>
                  <SubSection title="b. Data Kontak">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Alamat email</li>
                      <li>Nomor telepon/WhatsApp</li>
                      <li>Alamat domisili lengkap</li>
                      <li>Desa/Ranting NU</li>
                    </ul>
                  </SubSection>
                  <SubSection title="c. Data Aktivitas">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Riwayat kegiatan yang diikuti</li>
                      <li>Donasi dan transaksi LAZISNU</li>
                      <li>Postingan forum dan artikel</li>
                      <li>Pesan chat dan interaksi</li>
                      <li>Log aktivitas dan login</li>
                    </ul>
                  </SubSection>
                  <SubSection title="d. Data Teknis">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Alamat IP dan perangkat</li>
                      <li>Jenis browser dan sistem operasi</li>
                      <li>Cookies dan data navigasi</li>
                    </ul>
                  </SubSection>
                </Section>

                <Section title="3. Tujuan Penggunaan Data">
                  <p>Data pribadi Anda digunakan untuk:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Verifikasi identitas keanggotaan NU</li>
                    <li>Menyediakan layanan portal (kegiatan, forum, donasi, dll.)</li>
                    <li>Komunikasi terkait kegiatan dan agenda organisasi</li>
                    <li>Pengelolaan donasi dan transparansi LAZISNU</li>
                    <li>Peningkatan layanan dan pengalaman pengguna</li>
                    <li>Pemenuhan kewajiban hukum dan regulasi</li>
                    <li>Keamanan dan pencegahan penyalahgunaan</li>
                  </ol>
                </Section>

                <Section title="4. Dasar Pemrosesan Data">
                  <p>Kami memproses data pribadi Anda berdasarkan:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Persetujuan:</strong> Persetujuan eksplisit Anda saat mendaftar</li>
                    <li><strong>Kontrak:</strong> Perjanjian keanggotaan NU</li>
                    <li><strong>Kepentingan yang sah:</strong> Pengelolaan organisasi yang efektif</li>
                    <li><strong>Kewajiban hukum:</strong> Peraturan perundang-undangan yang berlaku</li>
                  </ul>
                </Section>

                <Section title="5. Penyimpanan dan Keamanan Data">
                  <p>Data Anda disimpan dengan enkripsi dan dilindungi oleh:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Enkripsi SSL/TLS untuk transmisi data</li>
                    <li>Autentikasi berlapis (password + OTP)</li>
                    <li>Akses terbatas berdasarkan role/jabatan</li>
                    <li>Backup berkala dan disaster recovery</li>
                    <li>Monitoring keamanan 24/7</li>
                  </ul>
                  <p>Data disimpan selama masa keanggotaan aktif ditambah 3 tahun setelah keanggotaan berakhir, sesuai kebutuhan arsip organisasi.</p>
                </Section>

                <Section title="6. Pembagian Data kepada Pihak Ketiga">
                  <p>Data Anda <strong>tidak akan dijual atau dibagikan</strong> kepada pihak ketiga untuk tujuan komersial. Data hanya dibagikan kepada:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pengurus NU di tingkat PC, PW, atau PBNU (sesuai kebutuhan organisasi)</li>
                    <li>Penyedia layanan teknis portal (dengan perjanjian kerahasiaan)</li>
                    <li>Pihak berwenang berdasarkan perintah hukum yang sah</li>
                  </ul>
                </Section>

                <Section title="7. Hak-Hak Anda">
                  <p>Sesuai UU PDP, Anda memiliki hak untuk:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Mengakses:</strong> Mendapatkan informasi data pribadi yang kami miliki</li>
                    <li><strong>Memperbaiki:</strong> Mengoreksi data yang tidak akurat</li>
                    <li><strong>Menghapus:</strong> Meminta penghapusan data (dengan ketentuan tertentu)</li>
                    <li><strong>Membatasi:</strong> Membatasi pemrosesan data tertentu</li>
                    <li><strong>Portabilitas:</strong> Meminta data dalam format yang dapat dibaca mesin</li>
                    <li><strong>Menolak:</strong> Menolak pemrosesan data tertentu</li>
                    <li><strong>Mencabut persetujuan:</strong> Kapan saja tanpa mengurangi keabsahan pemrosesan sebelumnya</li>
                  </ul>
                </Section>

                <Section title="8. Cookies dan Pelacakan">
                  <p>Kami menggunakan cookies untuk meningkatkan pengalaman Anda. Silakan lihat <button onClick={() => setActiveTab('cookies')} className="text-emerald-600 underline font-medium hover:text-emerald-800">Kebijakan Cookies</button> kami untuk informasi lengkap.</p>
                </Section>

                <Section title="9. Perubahan Kebijakan">
                  <p>Kebijakan Privasi ini dapat diperbarui sewaktu-waktu. Perubahan material akan diinformasikan melalui notifikasi di portal atau email. Tanggal "Terakhir diperbarui" di bagian atas dokumen ini menunjukkan revisi terakhir.</p>
                </Section>

                <Section title="10. Kontak">
                  <p>Untuk pertanyaan terkait privasi atau penggunaan hak Anda, hubungi:</p>
                  <div className="bg-emerald-50/60 rounded-xl p-4 mt-2">
                    <p className="text-sm font-medium text-emerald-800">Petugas Pelindungan Data (DPO)</p>
                    <p className="text-xs text-emerald-600 mt-1">Email: privacy@mwcnu-kedu.or.id</p>
                    <p className="text-xs text-emerald-600">WhatsApp: +62 812-3456-7890</p>
                    <p className="text-xs text-emerald-600">Alamat: Kantor MWC NU Kedu, Jl. Raya Kedu No. 1, Temanggung</p>
                  </div>
                </Section>
              </div>
            )}

            {/* ===== SYARAT & KETENTUAN ===== */}
            {activeTab === 'syarat' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Syarat & Ketentuan</h2>
                    <p className="text-xs text-emerald-500">Ketentuan penggunaan Portal Digital NU Kedu</p>
                  </div>
                </div>

                <Section title="1. Penerimaan Syarat">
                  <p>Dengan mengakses dan menggunakan Portal Digital MWC NU Kecamatan Kedu ("Portal"), Anda menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan sebagian atau seluruh ketentuan ini, mohon untuk tidak menggunakan Portal.</p>
                </Section>

                <Section title="2. Definisi">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>"Portal"</strong> — Situs web dan seluruh layanan digital MWC NU Kecamatan Kedu</li>
                    <li><strong>"Pengguna"</strong> — Setiap individu yang mengakses Portal</li>
                    <li><strong>"Anggota"</strong> — Pengguna yang telah terdaftar dan terverifikasi sebagai anggota NU</li>
                    <li><strong>"Kontributor"</strong> — Anggota dengan hak akses kontribusi aktif</li>
                    <li><strong>"Pengurus"</strong> — Pejabat struktural NU dengan hak akses administrasi</li>
                    <li><strong>"Konten"</strong> — Seluruh informasi, teks, gambar, video, dan data di Portal</li>
                  </ul>
                </Section>

                <Section title="3. Pendaftaran & Keanggotaan">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Pendaftaran terbuka untuk warga Nahdliyin yang berdomisili di Kecamatan Kedu dan sekitarnya.</li>
                    <li>Calon anggota wajib mengisi data pribadi yang benar dan lengkap.</li>
                    <li>Setiap pendaftaran akan diverifikasi oleh pengurus ranting setempat.</li>
                    <li>Pengurus berhak menolak pendaftaran yang tidak memenuhi syarat.</li>
                    <li>Satu orang hanya boleh memiliki satu akun.</li>
                    <li>Anggota bertanggung jawab atas keamanan akun dan kata sandi masing-masing.</li>
                  </ol>
                </Section>

                <Section title="4. Penggunaan Portal">
                  <SubSection title="a. Penggunaan yang Diizinkan">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Mengakses informasi kegiatan dan agenda NU</li>
                      <li>Berpartisipasi dalam forum diskusi dan chat</li>
                      <li>Berdonasi melalui LAZISNU</li>
                      <li>Membaca dan menulis artikel</li>
                      <li>Mengunduh dokumen arsip yang tersedia</li>
                      <li>Berkomunikasi dengan sesama anggota</li>
                    </ul>
                  </SubSection>
                  <SubSection title="b. Penggunaan yang Dilarang">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Menyebarkan konten yang bertentangan dengan ajaran Ahlussunnah Wal Jamaah</li>
                      <li>Memuat ujaran kebencian, SARA, atau provokasi</li>
                      <li>Menyebarluaskan informasi palsu (hoaks)</li>
                      <li>Melanggar hak kekayaan intelektual orang lain</li>
                      <li>Menggunakan portal untuk aktivitas ilegal</li>
                      <li>Menyalahgunakan data anggota lain</li>
                      <li>Mengganggu operasional atau keamanan sistem</li>
                    </ul>
                  </SubSection>
                </Section>

                <Section title="5. Konten & Kontribusi">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Seluruh konten yang diunggah pengguna menjadi tanggung jawab pengguna tersebut.</li>
                    <li>Pengelola portal berhak mengedit, menolak, atau menghapus konten yang melanggar ketentuan.</li>
                    <li>Dengan mengunggah konten, Anda memberikan lisensi non-eksklusif kepada MWC NU Kedu untuk menampilkan konten tersebut di Portal.</li>
                    <li>Artikel dan tulisan akan melalui proses review sebelum dipublikasikan.</li>
                  </ol>
                </Section>

                <Section title="6. Donasi & Transaksi Keuangan">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Seluruh donasi melalui LAZISNU bersifat sukarela dan tidak dapat ditarik kembali.</li>
                    <li>Bukti donasi akan diterbitkan secara digital melalui portal.</li>
                    <li>Laporan penyaluran donasi dipublikasikan secara transparan.</li>
                    <li>MWC NU Kedu menjamin pengelolaan dana sesuai syariat Islam dan peraturan yang berlaku.</li>
                  </ol>
                </Section>

                <Section title="7. Pembatasan Tanggung Jawab">
                  <p>Portal disediakan "sebagaimana adanya". Kami berusaha menjaga ketersediaan dan akurasi informasi, namun tidak menjamin portal bebas dari gangguan teknis atau kesalahan. MWC NU Kedu tidak bertanggung jawab atas kerugian yang timbul dari:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gangguan teknis atau downtime sistem</li>
                    <li>Kesalahan informasi yang disampaikan pengguna lain</li>
                    <li>Akses tidak sah yang disebabkan kelalaian pengguna</li>
                  </ul>
                </Section>

                <Section title="8. Perubahan Syarat & Ketentuan">
                  <p>Syarat & Ketentuan ini dapat diubah sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui notifikasi portal. Penggunaan portal secara berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.</p>
                </Section>

                <Section title="9. Hukum yang Berlaku">
                  <p>Syarat & Ketentuan ini tunduk pada hukum Negara Kesatuan Republik Indonesia. Setiap sengketa akan diselesaikan secara musyawarah terlebih dahulu, sesuai dengan prinsip NU.</p>
                </Section>

                {/* Accept */}
                <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-purple-700">Saya telah membaca dan menyetujui Syarat & Ketentuan penggunaan Portal Digital MWC NU Kedu.</span>
                  </label>
                </div>
              </div>
            )}

            {/* ===== PEDOMAN KOMUNITAS ===== */}
            {activeTab === 'komunitas' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Pedoman Komunitas</h2>
                    <p className="text-xs text-emerald-500">Etika dan tata berkomunikasi di lingkungan NU Kedu</p>
                  </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { emoji: '🤲', title: 'Ukhuwah', desc: 'Persaudaraan yang mengikat seluruh warga Nahdliyin' },
                    { emoji: '📖', title: 'Tawassuth', desc: 'Jalan tengah, moderat, dan toleran' },
                    { emoji: '🤝', title: 'Tasamuh', desc: 'Saling menghargai dan toleransi' },
                  ].map((v, i) => (
                    <div key={i} className="bg-amber-50/60 rounded-xl p-4 text-center border border-amber-100">
                      <span className="text-2xl">{v.emoji}</span>
                      <h4 className="text-sm font-bold text-amber-800 mt-1">{v.title}</h4>
                      <p className="text-[10px] text-amber-600 mt-0.5">{v.desc}</p>
                    </div>
                  ))}
                </div>

                <Section title="1. Nilai-Nilai Dasar Komunitas">
                  <p>Portal Digital NU Kedu dibangun di atas nilai-nilai Ahlussunnah Wal Jamaah An-Nahdliyah:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Tawassuth (Moderat):</strong> Mengambil jalan tengah, tidak ekstrem</li>
                    <li><strong>Tawazun (Seimbang):</strong> Menyeimbangkan antara urusan dunia dan akhirat</li>
                    <li><strong>I\'tidal (Adil):</strong> Berlaku adil dalam setiap interaksi</li>
                    <li><strong>Tasamuh (Toleran):</strong> Menghargai perbedaan pendapat</li>
                    <li><strong>Ukhuwah (Persaudaraan):</strong> Memperkuat ikatan persaudaraan sesama Muslim</li>
                  </ul>
                </Section>

                <Section title="2. Etika Berkomunikasi">
                  <SubSection title="Yang Dianjurkan">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Menggunakan bahasa yang sopan, santun, dan Islami</li>
                      <li>Mengawali dengan salam dan berdoa</li>
                      <li>Menyampaikan pendapat dengan hujjah dan dalil</li>
                      <li>Menghargai perbedaan pendapat (ikhtilaf)</li>
                      <li>Menjaga silaturahmi meski berbeda pandangan</li>
                      <li>Menggunakan forum untuk hal-hal yang bermanfaat</li>
                      <li>Membantu anggota lain dengan informasi yang benar</li>
                    </ul>
                  </SubSection>
                  <SubSection title="Yang Dilarang">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Menghina, memfitnah, atau mengancam anggota lain</li>
                      <li>Menyebarkan berita bohong/hoaks</li>
                      <li>Berbicara yang menyinggung SARA</li>
                      <li>Spam, iklan, atau promosi tanpa izin</li>
                      <li>Menyebarkan konten pornografi atau asusila</li>
                      <li>Menggunakan identitas palsu</li>
                      <li>Mendiskreditkan ulama, kiai, atau lembaga NU</li>
                      <li>Mempromosikan paham yang bertentangan dengan Aswaja</li>
                    </ul>
                  </SubSection>
                </Section>

                <Section title="3. Konsekuensi Pelanggaran">
                  <div className="space-y-2">
                    {[
                      { level: 'Peringatan 1', color: 'bg-amber-100 text-amber-700', desc: 'Teguran lisan/tulisan untuk pelanggaran ringan' },
                      { level: 'Peringatan 2', color: 'bg-orange-100 text-orange-700', desc: 'Pembatasan fitur (mute/blokir sementara) untuk pelanggaran berulang' },
                      { level: 'Peringatan 3', color: 'bg-red-100 text-red-700', desc: 'Penangguhan akun untuk pelanggaran berat' },
                      { level: 'Blokir Permanen', color: 'bg-gray-200 text-gray-700', desc: 'Pemblokiran permanen untuk pelanggaran sangat berat atau berulang' },
                    ].map((v, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-amber-50/30">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${v.color}`}>{v.level}</span>
                        <span className="text-sm text-emerald-700">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="4. Pelaporan">
                  <p>Jika Anda menemukan konten atau perilaku yang melanggar pedoman komunitas:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Gunakan tombol "Laporkan" pada konten terkait</li>
                    <li>Hubungi pengurus melalui Chat atau formulir di Pusat Bantuan</li>
                    <li>Pengurus akan meninjau laporan dalam 1x24 jam</li>
                    <li>Pelapor identitasnya dijaga kerahasiaannya</li>
                  </ol>
                </Section>
              </div>
            )}

            {/* ===== DISCLAIMER ===== */}
            {activeTab === 'disclaimer' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Disclaimer</h2>
                    <p className="text-xs text-emerald-500">Penafian tanggung jawab dan batasan penggunaan</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700 font-medium">⚠️ PENTING: Harap baca seluruh disclaimer ini sebelum menggunakan Portal Digital MWC NU Kedu.</p>
                </div>

                <Section title="1. Informasi Umum">
                  <p>Portal Digital MWC NU Kecamatan Kedu ("Portal") ini dikelola oleh Pengurus Majelis Wakil Cabang Nahdlatul Ulama Kecamatan Kedu, Kabupaten Temanggung, Jawa Tengah. Portal ini bertujuan sebagai sarana informasi, komunikasi, dan layanan digital bagi warga Nahdliyin.</p>
                </Section>

                <Section title="2. Akurasi Informasi">
                  <p>Kami berusaha menyajikan informasi yang akurat dan terkini di Portal ini. Namun demikian:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Kami <strong>tidak menjamin</strong> bahwa semua informasi di Portal ini 100% akurat, lengkap, atau terkini.</li>
                    <li>Jadwal kegiatan dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.</li>
                    <li>Data statistik bersifat estimasi dan dapat berubah.</li>
                    <li>Informasi dari pengguna lain sepenuhnya menjadi tanggung jawab penulis.</li>
                  </ul>
                </Section>

                <Section title="3. Konten Pengguna">
                  <p>Portal memungkinkan pengguna untuk mempublikasikan konten (artikel, komentar, forum). Konten yang dipublikasikan oleh pengguna:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Tidak mencerminkan</strong> posisi resmi MWC NU Kedu kecuali dinyatakan secara eksplisit.</li>
                    <li>Menjadi tanggung jawab penuh penulis.</li>
                    <li>Dapat diedit atau dihapus jika melanggar ketentuan.</li>
                    <li>Tidak boleh dianggap sebagai fatwa resmi kecuali dari lembaga yang berwenang (LBMNU).</li>
                  </ul>
                </Section>

                <Section title="4. Layanan Keuangan (LAZISNU)">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Donasi melalui LAZISNU bersifat sukarela.</li>
                    <li>MWC NU Kedu berkomitmen mengelola dana secara transparan sesuai syariat Islam.</li>
                    <li>Laporan keuangan LAZISNU dipublikasikan secara berkala.</li>
                    <li>MWC NU Kedu tidak bertanggung jawab atas kesalahan nominal donasi akibat kelalaian pengguna.</li>
                  </ul>
                </Section>

                <Section title="5. Tautan Eksternal">
                  <p>Portal dapat berisi tautan ke situs web pihak ketiga. Kami <strong>tidak bertanggung jawab</strong> atas konten, kebijakan privasi, atau praktik situs web pihak ketiga tersebut.</p>
                </Section>

                <Section title="6. Ketersediaan Layanan">
                  <p>Kami berusaha menjaga ketersediaan Portal 24/7. Namun, kami tidak menjamin Portal akan selalu tersedia tanpa gangguan. Pemeliharaan berkala dan force majeure dapat menyebabkan downtime sementara.</p>
                </Section>

                <Section title="7. Batasan Hukum">
                  <p>Dalam batas maksimum yang diizinkan oleh hukum yang berlaku, MWC NU Kecamatan Kedu dan pengurusnya tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Portal.</p>
                </Section>

                <Section title="8. Hak Kekayaan Intelektual">
                  <p>Seluruh konten resmi Portal (desain, logo, teks resmi) dilindungi hak cipta. Penggunaan konten Portal untuk tujuan non-komersial diperbolehkan dengan mencantumkan sumber. Penggunaan untuk tujuan komersial memerlukan izin tertulis dari MWC NU Kedu.</p>
                </Section>

                <Section title="9. Hukum yang Berlaku">
                  <p>Disclaimer ini tunduk pada hukum Negara Kesatuan Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui musyawarah mufakat, dan jika tidak tercapai, akan diselesaikan melalui Pengadilan Negeri Temanggung.</p>
                </Section>
              </div>
            )}

            {/* ===== KEBIJAKAN COOKIES ===== */}
            {activeTab === 'cookies' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-900">Kebijakan Cookies</h2>
                    <p className="text-xs text-emerald-500">Penggunaan cookies dan teknologi pelacakan</p>
                  </div>
                </div>

                <Section title="1. Apa itu Cookies?">
                  <p>Cookies adalah file teks kecil yang disimpan di perangkat Anda (komputer, tablet, atau ponsel) saat Anda mengunjungi Portal. Cookies membantu kami mengenali perangkat Anda dan meningkatkan pengalaman penggunaan Portal.</p>
                </Section>

                <Section title="2. Jenis Cookies yang Kami Gunakan">
                  <div className="space-y-3">
                    {[
                      { name: 'Cookies Esensial', desc: 'Diperlukan untuk fungsi dasar portal (login, sesi, keamanan). Tidak dapat dinonaktifkan.', required: true, icon: '🔒' },
                      { name: 'Cookies Preferensi', desc: 'Menyimpan pengaturan Anda (bahasa, tema, ukuran teks).', required: false, icon: '⚙️' },
                      { name: 'Cookies Analitik', desc: 'Membantu kami memahami cara pengguna berinteraksi dengan portal untuk perbaikan layanan.', required: false, icon: '📊' },
                      { name: 'Cookies Marketing', desc: 'Digunakan untuk menampilkan konten yang relevan. Kami TIDAK menggunakan cookies ini untuk iklan komersial.', required: false, icon: '📢' },
                    ].map((cookie, i) => (
                      <div key={i} className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{cookie.icon}</span>
                            <h4 className="text-sm font-bold text-emerald-900">{cookie.name}</h4>
                            {cookie.required && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Wajib</span>}
                          </div>
                          <button
                            onClick={() => {
                              if (!cookie.required) {
                                const key = cookie.name.toLowerCase().split(' ')[1] as keyof typeof cookiePrefs;
                                setCookiePrefs(prev => ({ ...prev, [key]: !prev[key] }));
                              }
                            }}
                            className={`w-10 h-5 rounded-full transition-colors relative ${
                              cookie.required ? 'bg-emerald-500' :
                              cookiePrefs[cookie.name.toLowerCase().split(' ')[1] as keyof typeof cookiePrefs] ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                              cookie.required || cookiePrefs[cookie.name.toLowerCase().split(' ')[1] as keyof typeof cookiePrefs] ? 'translate-x-5' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                        <p className="text-xs text-emerald-600">{cookie.desc}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="3. Cookies Pihak Ketiga">
                  <p>Kami dapat menggunakan layanan pihak ketiga yang menempatkan cookies di perangkat Anda:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Google Analytics:</strong> Analisis penggunaan portal (jika diaktifkan)</li>
                    <li><strong>Penyedia Layanan Cloud:</strong> Untuk keamanan dan performa</li>
                  </ul>
                </Section>

                <Section title="4. Mengelola Cookies">
                  <p>Anda dapat mengelola preferensi cookies melalui:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pengaturan cookies di halaman ini</li>
                    <li>Pengaturan browser Anda (Chrome, Firefox, Safari, dll.)</li>
                    <li>Menghapus cookies yang sudah tersimpan melalui pengaturan browser</li>
                  </ul>
                  <p className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">⚠️ Catatan: Menonaktifkan cookies esensial dapat memengaruhi fungsi portal seperti login dan navigasi.</p>
                </Section>

                <Section title="5. Durasi Penyimpanan">
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Session cookies:</strong> Dihapus saat Anda menutup browser</li>
                    <li><strong>Persistent cookies:</strong> Disimpan hingga 30 hari atau hingga dihapus manual</li>
                    <li><strong>Login cookies:</strong> Disimpan selama sesi aktif (maksimal 7 hari)</li>
                  </ul>
                </Section>

                <Section title="6. Perubahan Kebijakan">
                  <p>Kebijakan Cookies ini dapat diperbarui sewaktu-waktu. Perubahan akan diinformasikan melalui banner notifikasi di portal.</p>
                </Section>

                {/* Save Preferences */}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => showToast('Preferensi cookies disimpan!')} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95">
                    <Check className="w-4 h-4" /> Simpan Preferensi
                  </button>
                  <button onClick={() => { setCookiePrefs({ essential: true, analytics: true, marketing: true, preferences: true }); showToast('Semua cookies diaktifkan'); }} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
                    Terima Semua
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-emerald-400">
                <Clock className="w-3 h-3 inline mr-1" />Terakhir diperbarui: {lastUpdated} • Versi 2.0 • MWC NU Kecamatan Kedu
              </p>
              <div className="flex items-center gap-2">
                <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95">
                  <Printer className="w-3.5 h-3.5" /> Cetak
                </button>
                <button onClick={() => showToast('Dokumen diunduh')} className="flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95">
                  <Download className="w-3.5 h-3.5" /> Unduh
                </button>
                <button onClick={() => showToast('Link disalin!')} className="flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95">
                  <Share2 className="w-3.5 h-3.5" /> Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
