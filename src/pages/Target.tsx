import { useState } from 'react';
import { useStore } from '../store';
import { indikatorList, pegawaiList, sasaranList, bulanSingkat } from '../data/dummy';

const TARGET_DATA: Record<string, number[]> = {
  'p5-i1': [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  'p5-i2': [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
  'p8-i3': [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  'p8-i4': [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
  'p12-i5': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  'p12-i6': [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
};

export default function Target() {
  const { currentRole, currentUser, addToast } = useStore();
  const [selectedPegawai, setSelectedPegawai] = useState(currentRole === 'pegawai' ? currentUser?.id ?? '' : '');

  const availablePegawai = currentRole === 'pegawai'
    ? pegawaiList.filter(p => p.id === currentUser?.id)
    : pegawaiList.filter(p => p.role === 'pegawai');

  const pegawaiTargets = Object.entries(TARGET_DATA)
    .filter(([key]) => !selectedPegawai || key.startsWith(selectedPegawai))
    .map(([key, months]) => {
      const [pId, iId] = key.split('-');
      const pegawai = pegawaiList.find(p => p.id === pId);
      const indikator = indikatorList.find(i => i.id === iId);
      const sasaran = sasaranList.find(s => s.id === indikator?.sasaranId);
      return { key, pegawai, indikator, sasaran, months };
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-base" style={{ color: '#111827' }}>Target & Revisi</h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>Target kinerja per indikator, dibagi 12 bulan</p>
        </div>
      </div>

      {currentRole !== 'pegawai' && (
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Filter Pegawai</label>
          <select
            value={selectedPegawai}
            onChange={e => setSelectedPegawai(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#E5E7EB', minWidth: 240 }}
          >
            <option value="">Semua Pegawai</option>
            {availablePegawai.map(p => <option key={p.id} value={p.id}>{p.nama.split(',')[0]}</option>)}
          </select>
        </div>
      )}

      <div className="space-y-4">
        {pegawaiTargets.map(({ key, pegawai, indikator, sasaran, months }) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#111827' }}>{indikator?.nama}</div>
                <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{sasaran?.nama} · {pegawai?.nama.split(',')[0]} · Satuan: {indikator?.satuan}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#D1FAE5', color: '#065F46' }}>Aktif</span>
                {currentRole === 'super_admin' && (
                  <button onClick={() => addToast('Target berhasil direvisi')} className="text-xs px-3 py-1 rounded-lg border font-medium" style={{ borderColor: '#D1D5DB', color: '#374151' }}>Revisi</button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#F0F4FA' }}>
                    <th className="text-left px-4 py-2 text-xs font-semibold" style={{ color: '#6B7280', minWidth: 80 }}>Bulan</th>
                    {bulanSingkat.map(b => (
                      <th key={b} className="text-center px-3 py-2 text-xs font-semibold" style={{ color: '#6B7280' }}>{b}</th>
                    ))}
                    <th className="text-center px-3 py-2 text-xs font-semibold" style={{ color: '#6B7280' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t" style={{ borderColor: '#F3F4F6' }}>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: '#374151' }}>Target</td>
                    {months.map((v, i) => (
                      <td key={i} className="text-center px-3 py-3 text-sm font-semibold" style={{ color: '#111827' }}>{v}</td>
                    ))}
                    <td className="text-center px-3 py-3 text-sm font-bold" style={{ color: '#1E3A8A' }}>{months.reduce((a, b) => a + b, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
