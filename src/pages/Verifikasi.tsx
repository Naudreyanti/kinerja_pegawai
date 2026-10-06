import { useState } from 'react';
import { useStore } from '../store';
import { realisasiList, bulanSingkat, bulanNama, pegawaiList, statusConfig } from '../data/dummy';
import type { StatusLaporan } from '../data/dummy';

const TERKUNCI = [1, 2, 3, 4, 5, 6];

export default function Verifikasi() {
  const { addToast } = useStore();
  const [selectedBulan, setSelectedBulan] = useState(7);

  const bulanStatus: StatusLaporan[] = bulanSingkat.map((_, i) => {
    const bulan = i + 1;
    if (TERKUNCI.includes(bulan)) return 'Terkunci';
    const items = realisasiList.filter(r => r.bulan === bulan);
    if (items.length === 0) return 'Draft';
    const allVerif = items.every(r => r.status === 'Terverifikasi');
    if (allVerif) return 'Terverifikasi';
    const hasWaiting = items.some(r => r.status === 'Menunggu Verifikasi');
    if (hasWaiting) return 'Menunggu Verifikasi';
    return 'Draft';
  });

  const periodeItems = realisasiList.filter(r => r.bulan === selectedBulan && r.tahun === 2026);
  const canVerify = !TERKUNCI.includes(selectedBulan);

  const handleVerify = (id: string, nama: string) => {
    addToast(`Laporan ${nama} - ${bulanNama[selectedBulan - 1]} berhasil diverifikasi`);
  };

  const handleLock = () => {
    addToast(`Periode ${bulanNama[selectedBulan - 1]} 2026 berhasil dikunci 🔒`, 'success');
  };

  const handleReject = (nama: string) => {
    addToast(`Laporan ${nama} dikembalikan untuk perbaikan`, 'warning');
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-bold text-base" style={{ color: '#111827' }}>Verifikasi & Lock Periode</h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>Verifikasi laporan realisasi dan kunci periode yang sudah selesai</p>
      </div>

      {/* Month chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {bulanSingkat.map((b, i) => {
          const bulan = i + 1;
          const status = bulanStatus[i];
          const sc = statusConfig[status];
          const active = selectedBulan === bulan;
          return (
            <button
              key={bulan}
              onClick={() => setSelectedBulan(bulan)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2"
              style={{
                borderColor: active ? '#1E3A8A' : sc.dot,
                background: active ? '#1E3A8A' : sc.bg,
                color: active ? '#fff' : sc.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: active ? '#93C5FD' : sc.dot }} />
              {b}
              {status === 'Terkunci' && ' 🔒'}
            </button>
          );
        })}
      </div>

      {/* Selected period content */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F3F4F6', background: '#F9FAFB' }}>
          <div>
            <span className="font-semibold text-sm" style={{ color: '#111827' }}>Periode: {bulanNama[selectedBulan - 1]} 2026</span>
            <span className="ml-3 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: statusConfig[bulanStatus[selectedBulan - 1]].bg, color: statusConfig[bulanStatus[selectedBulan - 1]].color }}>
              {bulanStatus[selectedBulan - 1]}
            </span>
          </div>
          {canVerify && !TERKUNCI.includes(selectedBulan) && (
            <button onClick={handleLock} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: '#1E3A8A' }}>
              🔒 Kunci Periode
            </button>
          )}
        </div>

        {TERKUNCI.includes(selectedBulan) ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <div className="font-semibold text-sm" style={{ color: '#1E3A8A' }}>Periode {bulanNama[selectedBulan - 1]} 2026 Terkunci</div>
            <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Data tidak dapat diubah. Semua laporan sudah final.</div>
          </div>
        ) : periodeItems.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-semibold text-sm" style={{ color: '#374151' }}>Belum ada laporan masuk</div>
            <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Periode ini belum memiliki data realisasi</div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F0F4FA' }}>
                {['Pegawai', 'Indikator', 'Nilai', 'Keterangan', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periodeItems.map(r => {
                const pegawai = pegawaiList.find(p => p.id === r.pegawaiId);
                const sc = statusConfig[r.status];
                return (
                  <tr key={r.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F3F4F6' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ background: '#1E3A8A' }}>{pegawai?.avatar}</div>
                        <div>
                          <div className="font-medium text-xs" style={{ color: '#111827' }}>{pegawai?.nama.split(',')[0]}</div>
                          <div className="text-xs" style={{ color: '#9CA3AF' }}>{pegawai?.jabatan.split(' ').slice(0, 2).join(' ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: '#374151', maxWidth: 180 }}>
                      {/* show indikator name */}
                      {r.indikatorId}
                    </td>
                    <td className="px-5 py-3 font-semibold text-sm" style={{ color: '#111827' }}>{r.nilai}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: '#6B7280' }}>{r.keterangan}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: sc.bg, color: sc.color }}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      {r.status === 'Menunggu Verifikasi' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleVerify(r.id, pegawai?.nama.split(',')[0] ?? '')} className="text-xs px-2 py-1 rounded font-medium text-white" style={{ background: '#10B981' }}>Verifikasi</button>
                          <button onClick={() => handleReject(pegawai?.nama.split(',')[0] ?? '')} className="text-xs px-2 py-1 rounded font-medium text-white" style={{ background: '#EF4444' }}>Kembalikan</button>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: '#D1D5DB' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
