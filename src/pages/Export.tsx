import { useStore } from '../store';
import { bidangList, bulanNama } from '../data/dummy';

export default function Export() {
  const { addToast, selectedTahun } = useStore();

  const handleExport = (type: string, format: string) => {
    addToast(`Export ${type} format ${format} berhasil diunduh`, 'success');
  };

  const reports = [
    { title: 'Laporan Realisasi Kinerja', desc: 'Rekap realisasi per bulan seluruh pegawai', icon: '📊', formats: ['Excel', 'Word'] },
    { title: 'Laporan Capaian per Bidang', desc: 'Perbandingan capaian antar bidang', icon: '🏢', formats: ['Excel', 'PDF'] },
    { title: 'Laporan Kinerja Individu', desc: 'Detail kinerja per pegawai', icon: '👤', formats: ['Word', 'PDF'] },
    { title: 'Rekap Verifikasi', desc: 'Status verifikasi semua laporan', icon: '✅', formats: ['Excel'] },
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-bold text-base" style={{ color: '#111827' }}>Laporan & Export</h2>
        <p className="text-sm" style={{ color: '#6B7280' }}>Generate dan unduh laporan kinerja dalam berbagai format</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-5 shadow-sm border mb-5 flex items-center gap-4 flex-wrap" style={{ borderColor: '#E5E7EB' }}>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Periode</label>
          <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }}>
            <option>Januari – Agustus {selectedTahun}</option>
            {bulanNama.map((b, i) => <option key={i}>{b} {selectedTahun}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Bidang</label>
          <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }}>
            <option value="">Semua Bidang</option>
            {bidangList.map(b => <option key={b.id} value={b.id}>{b.nama}</option>)}
          </select>
        </div>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-2 gap-4">
        {reports.map(r => (
          <div key={r.title} className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#EFF6FF' }}>{r.icon}</div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#111827' }}>{r.title}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{r.desc}</div>
              </div>
            </div>
            <div className="flex gap-2">
              {r.formats.map(f => (
                <button
                  key={f}
                  onClick={() => handleExport(r.title, f)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#D1D5DB', color: '#374151' }}
                >
                  {f === 'Excel' ? '📗' : f === 'Word' ? '📘' : '📕'} {f}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
