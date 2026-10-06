import { useState } from 'react';
import { useStore } from '../store';
import { realisasiList, indikatorList, pegawaiList, bulanNama, statusConfig, getCapaian, getCapaianColor, getCapaianBg } from '../data/dummy';

const PERIODE_DIBUKA = [1, 2, 3, 4, 5, 6, 7, 8]; // Jan-Agu open
const PERIODE_TERKUNCI = [1, 2, 3, 4, 5, 6]; // Jan-Jun locked

export default function Realisasi() {
  const { currentRole, currentUser, addToast } = useStore();
  const [selectedPegawai, setSelectedPegawai] = useState(currentRole === 'pegawai' ? currentUser?.id ?? '' : '');
  const [selectedBulan, setSelectedBulan] = useState(8);
  const [editRow, setEditRow] = useState<string | null>(null);
  const [nilaiInput, setNilaiInput] = useState<Record<string, string>>({});

  const isPegawai = currentRole === 'pegawai';
  const isAdminBidang = currentRole === 'admin_bidang';

  const availablePegawai = isPegawai
    ? pegawaiList.filter(p => p.id === currentUser?.id)
    : isAdminBidang
    ? pegawaiList.filter(p => p.bidangId === currentUser?.bidangId && p.role === 'pegawai')
    : pegawaiList.filter(p => p.role === 'pegawai');

  const targetPegawai = pegawaiList.find(p => p.id === selectedPegawai);
  const isOwnInput = targetPegawai?.id !== currentUser?.id;
  const periodeDibuka = PERIODE_DIBUKA.includes(selectedBulan);
  const periodeTerkunci = PERIODE_TERKUNCI.includes(selectedBulan);

  const myRealisasi = realisasiList.filter(r => r.pegawaiId === selectedPegawai && r.bulan === selectedBulan && r.tahun === 2026);

  const handleSave = (indikatorId: string) => {
    const val = nilaiInput[indikatorId];
    if (!val) return;
    setEditRow(null);
    addToast(`Realisasi ${bulanNama[selectedBulan - 1]} berhasil disimpan. Nilai: ${val}`);
    if (isOwnInput && targetPegawai) {
      // simulate audit log
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-bold text-base" style={{ color: '#111827' }}>Realisasi Bulanan</h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>Input capaian kinerja per bulan sesuai indikator</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        {!isPegawai && (
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Pegawai</label>
            <select
              value={selectedPegawai}
              onChange={e => setSelectedPegawai(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ borderColor: '#E5E7EB', minWidth: 220 }}
            >
              <option value="">-- Pilih Pegawai --</option>
              {availablePegawai.map(p => <option key={p.id} value={p.id}>{p.nama.split(',')[0]}</option>)}
            </select>
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Periode</label>
          <select
            value={selectedBulan}
            onChange={e => setSelectedBulan(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#E5E7EB' }}
          >
            {bulanNama.map((b, i) => (
              <option key={i} value={i + 1}>{b} 2026</option>
            ))}
          </select>
        </div>
      </div>

      {/* Banner for admin input on behalf */}
      {isAdminBidang && selectedPegawai && isOwnInput && targetPegawai && (
        <div className="mb-4 p-3.5 rounded-xl flex items-center gap-3" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
          <span>⚠️</span>
          <div className="text-sm" style={{ color: '#92400E' }}>
            <strong>Perhatian:</strong> Anda sedang menginput atas nama <strong>{targetPegawai.nama.split(',')[0]}</strong>. Aktivitas ini akan tercatat di Audit Trail.
          </div>
        </div>
      )}

      {/* Periode locked warning */}
      {periodeTerkunci && (
        <div className="mb-4 p-3.5 rounded-xl flex items-center gap-3" style={{ background: '#DBEAFE', border: '1px solid #3B82F6' }}>
          <span>🔒</span>
          <div className="text-sm" style={{ color: '#1E3A8A' }}>
            Periode <strong>{bulanNama[selectedBulan - 1]} 2026</strong> telah <strong>dikunci</strong>. Data tidak dapat diubah.
          </div>
        </div>
      )}

      {/* Not open */}
      {!periodeDibuka && (
        <div className="mb-4 p-3.5 rounded-xl flex items-center gap-3" style={{ background: '#FEE2E2', border: '1px solid #EF4444' }}>
          <span>🚫</span>
          <div className="text-sm" style={{ color: '#991B1B' }}>
            Periode <strong>{bulanNama[selectedBulan - 1]} 2026</strong> belum dibuka. Input realisasi tidak tersedia.
          </div>
        </div>
      )}

      {selectedPegawai && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
          <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: '#F3F4F6', background: '#F9FAFB' }}>
            <div>
              <span className="font-semibold text-sm" style={{ color: '#111827' }}>{targetPegawai?.nama}</span>
              <span className="text-xs ml-2" style={{ color: '#9CA3AF' }}>— {bulanNama[selectedBulan - 1]} 2026</span>
            </div>
            {myRealisasi.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: statusConfig[myRealisasi[0].status].bg, color: statusConfig[myRealisasi[0].status].color }}>
                {myRealisasi[0].status}
              </span>
            )}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F0F4FA' }}>
                {['No', 'Indikator', 'Satuan', 'Target', 'Realisasi', 'Capaian %', 'Keterangan', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {indikatorList.map((ind, i) => {
                const rel = myRealisasi.find(r => r.indikatorId === ind.id);
                const target = 5 + (i * 3); // dummy
                const realisasi = rel?.nilai ?? 0;
                const capaian = getCapaian(realisasi, target);
                const isEditing = editRow === ind.id;
                const canEdit = periodeDibuka && !periodeTerkunci;

                return (
                  <tr key={ind.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F3F4F6' }}>
                    <td className="px-4 py-3 text-xs" style={{ color: '#9CA3AF' }}>{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-xs" style={{ color: '#111827', maxWidth: 200 }}>{ind.nama}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: '#EFF6FF', color: '#2563EB' }}>{ind.satuan}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#374151' }}>{target}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          autoFocus
                          type="number"
                          value={nilaiInput[ind.id] ?? ''}
                          onChange={e => setNilaiInput(prev => ({ ...prev, [ind.id]: e.target.value }))}
                          className="w-20 border rounded px-2 py-1 text-sm focus:outline-none"
                          style={{ borderColor: '#2563EB' }}
                        />
                      ) : (
                        <span className="font-semibold text-sm" style={{ color: realisasi > 0 ? '#111827' : '#9CA3AF' }}>
                          {realisasi > 0 ? realisasi : '—'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {realisasi > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
                            <div className="h-full rounded-full" style={{ width: `${Math.min(capaian, 100)}%`, background: getCapaianColor(capaian) }} />
                          </div>
                          <span className="text-xs font-semibold" style={{ color: getCapaianColor(capaian) }}>{capaian}%</span>
                        </div>
                      ) : <span className="text-xs" style={{ color: '#D1D5DB' }}>—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#6B7280', maxWidth: 140 }}>{rel?.keterangan ?? '—'}</td>
                    <td className="px-4 py-3">
                      {canEdit ? (
                        isEditing ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleSave(ind.id)} className="text-xs px-2 py-1 rounded font-medium text-white" style={{ background: '#1E3A8A' }}>Simpan</button>
                            <button onClick={() => setEditRow(null)} className="text-xs px-2 py-1 rounded border" style={{ borderColor: '#E5E7EB', color: '#374151' }}>Batal</button>
                          </div>
                        ) : (
                          <button onClick={() => { setEditRow(ind.id); setNilaiInput(prev => ({ ...prev, [ind.id]: String(realisasi || '') })); }} className="text-xs font-medium hover:underline" style={{ color: '#2563EB' }}>
                            {realisasi > 0 ? 'Edit' : 'Input'}
                          </button>
                        )
                      ) : (
                        <span className="text-xs" style={{ color: '#D1D5DB' }}>{periodeTerkunci ? 'Terkunci' : 'Belum dibuka'}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {periodeDibuka && !periodeTerkunci && (
            <div className="px-5 py-3 border-t flex justify-end" style={{ borderColor: '#F3F4F6' }}>
              <button onClick={() => addToast(`Laporan ${bulanNama[selectedBulan - 1]} berhasil disubmit untuk verifikasi`, 'success')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#1E3A8A' }}>
                📤 Submit untuk Verifikasi
              </button>
            </div>
          )}
        </div>
      )}

      {!selectedPegawai && !isPegawai && (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <div className="text-4xl mb-3">📋</div>
          <div className="font-semibold text-sm" style={{ color: '#374151' }}>Pilih pegawai untuk melihat realisasi</div>
          <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>Gunakan filter di atas untuk memilih pegawai dan periode</div>
        </div>
      )}
    </div>
  );
}
