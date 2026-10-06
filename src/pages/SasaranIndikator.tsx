import { useState } from 'react';
import { useStore } from '../store';
import { sasaranList, indikatorList, bidangList } from '../data/dummy';

export default function SasaranIndikator() {
  const { addToast } = useStore();
  const [expanded, setExpanded] = useState<string | null>('s1');
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-base" style={{ color: '#111827' }}>Sasaran & Indikator Kinerja</h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>Kelola sasaran strategis dan indikator kinerja pegawai</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#1E3A8A' }}>
          <span>＋</span> Tambah Sasaran
        </button>
      </div>

      <div className="space-y-4">
        {sasaranList.map(s => {
          const bidang = bidangList.find(b => b.id === s.bidangId);
          const indikators = indikatorList.filter(i => i.sasaranId === s.id);
          const open = expanded === s.id;

          return (
            <div key={s.id} className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
              <button
                onClick={() => setExpanded(open ? null : s.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: '#1E3A8A' }}>
                    {s.id.replace('s', 'S')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#111827' }}>{s.nama}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{bidang?.nama} · {indikators.length} indikator</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#D1FAE5', color: '#065F46' }}>Aktif</span>
                  <span className="text-gray-400 transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                </div>
              </button>

              {open && (
                <div className="border-t" style={{ borderColor: '#F3F4F6' }}>
                  <div className="px-5 py-3 text-sm" style={{ color: '#6B7280', background: '#F9FAFB' }}>
                    {s.deskripsi}
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#F0F4FA' }}>
                        {['No', 'Nama Indikator', 'Satuan', 'Aksi'].map(h => (
                          <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {indikators.map((ind, i) => (
                        <tr key={ind.id} className="border-t hover:bg-gray-50" style={{ borderColor: '#F3F4F6' }}>
                          <td className="px-5 py-3 text-xs" style={{ color: '#9CA3AF' }}>{i + 1}</td>
                          <td className="px-5 py-3 font-medium" style={{ color: '#111827' }}>{ind.nama}</td>
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: '#EFF6FF', color: '#2563EB' }}>{ind.satuan}</span>
                          </td>
                          <td className="px-5 py-3">
                            <button onClick={() => addToast(`Indikator "${ind.nama}" diperbarui`)} className="text-xs font-medium hover:underline" style={{ color: '#2563EB' }}>Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-3 border-t" style={{ borderColor: '#F3F4F6' }}>
                    <button onClick={() => addToast('Indikator baru ditambahkan')} className="text-xs font-medium flex items-center gap-1" style={{ color: '#2563EB' }}>
                      <span>＋</span> Tambah Indikator
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F3F4F6' }}>
              <h3 className="font-bold text-base" style={{ color: '#111827' }}>Tambah Sasaran Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Nama Sasaran</label>
                <input placeholder="Nama sasaran strategis" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi sasaran..." className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" style={{ borderColor: '#E5E7EB' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Bidang</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }}>
                  {bidangList.map(b => <option key={b.id} value={b.id}>{b.nama}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: '#F3F4F6' }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-lg border font-medium" style={{ borderColor: '#E5E7EB', color: '#374151' }}>Batal</button>
              <button onClick={() => { setShowModal(false); addToast('Sasaran baru berhasil ditambahkan'); }} className="px-4 py-2 text-sm rounded-lg font-semibold text-white" style={{ background: '#1E3A8A' }}>
                Simpan Sasaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
