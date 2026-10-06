import { useState } from 'react';
import { useStore } from '../store';
import { pegawaiList } from '../data/dummy';

const roleAccounts = [
  { label: 'Super Admin', id: 'p1', color: '#1E3A8A', bg: '#DBEAFE' },
  { label: 'Admin Bidang', id: 'p2', color: '#92400E', bg: '#FEF3C7' },
  { label: 'Pegawai', id: 'p5', color: '#065F46', bg: '#D1FAE5' },
];

export default function Login() {
  const { login } = useStore();
  const [selectedId, setSelectedId] = useState('p1');
  const [loading, setLoading] = useState(false);

  const selectedUser = pegawaiList.find(p => p.id === selectedId);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { login(selectedId); setLoading(false); }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2260 0%, #1E3A8A 60%, #2563EB 100%)' }}>
      <div className="w-full max-w-md mx-4">
        {/* Logo + title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg" style={{ background: '#2563EB' }}>
            BK
          </div>
          <h1 className="text-2xl font-bold text-white">BKPSDM</h1>
          <p className="text-sm mt-1" style={{ color: '#93C5FD' }}>Sistem Laporan Kinerja Pegawai</p>
          <p className="text-xs mt-0.5" style={{ color: '#60A5FA' }}>Pemerintah Daerah — TA 2026</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="font-bold text-lg mb-1" style={{ color: '#111827' }}>Masuk ke Sistem</h2>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Pilih akun demo untuk melanjutkan</p>

          {/* Account picker */}
          <div className="space-y-2 mb-5">
            {roleAccounts.map(acct => {
              const user = pegawaiList.find(p => p.id === acct.id)!;
              const active = selectedId === acct.id;
              return (
                <button
                  key={acct.id}
                  onClick={() => setSelectedId(acct.id)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left"
                  style={{
                    borderColor: active ? '#2563EB' : '#E5E7EB',
                    background: active ? '#EFF6FF' : '#fff',
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: acct.bg, color: acct.color }}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: '#111827' }}>{user.nama.split(',')[0]}</div>
                    <div className="text-xs truncate" style={{ color: '#6B7280' }}>{user.jabatan}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: acct.bg, color: acct.color }}>
                    {acct.label}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedUser && (
            <div className="mb-5 p-3 rounded-lg text-xs" style={{ background: '#F0F4FA', color: '#374151' }}>
              <span className="font-semibold">NIP:</span> {selectedUser.nip} &nbsp;|&nbsp; <span className="font-semibold">Email:</span> {selectedUser.email}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ background: '#1E3A8A' }}
          >
            {loading ? (
              <><span className="animate-spin">⟳</span> Memuat...</>
            ) : (
              <>Masuk ke Sistem →</>
            )}
          </button>

          <p className="text-center text-xs mt-4" style={{ color: '#9CA3AF' }}>
            Sistem ini hanya untuk keperluan prototype demonstrasi
          </p>
        </div>
      </div>
    </div>
  );
}
