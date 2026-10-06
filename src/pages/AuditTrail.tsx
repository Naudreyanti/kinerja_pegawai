import { useState } from 'react';
import { auditLogs } from '../data/dummy';

export default function AuditTrail() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = auditLogs.filter(l =>
    l.pengguna.toLowerCase().includes(search.toLowerCase()) ||
    l.aksi.toLowerCase().includes(search.toLowerCase()) ||
    l.detail.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const aksiColor: Record<string, string> = {
    'INPUT REALISASI': '#2563EB',
    'INPUT ATAS NAMA': '#F59E0B',
    'VERIFIKASI': '#10B981',
    'KUNCI PERIODE': '#1E3A8A',
    'SUBMIT LAPORAN': '#8B5CF6',
    'TAMBAH PEGAWAI': '#06B6D4',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-base" style={{ color: '#111827' }}>Audit Trail</h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>Log seluruh aktivitas dalam sistem</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#F3F4F6' }}>
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Cari pengguna, aksi, detail..."
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none"
              style={{ borderColor: '#E5E7EB' }}
            />
          </div>
          <span className="text-xs" style={{ color: '#9CA3AF' }}>{total} log</span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#F0F4FA' }}>
              {['Waktu', 'Pengguna', 'Role', 'Aksi', 'Target', 'Detail'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map(log => (
              <tr key={log.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F3F4F6' }}>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: '#6B7280', whiteSpace: 'nowrap' }}>{log.waktu}</td>
                <td className="px-4 py-3 font-medium text-xs" style={{ color: '#111827' }}>{log.pengguna.split(',')[0]}</td>
                <td className="px-4 py-3 text-xs" style={{ color: '#6B7280' }}>{log.role}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded font-semibold font-mono" style={{ background: (aksiColor[log.aksi] ?? '#6B7280') + '18', color: aksiColor[log.aksi] ?? '#6B7280' }}>
                    {log.aksi}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: '#374151', maxWidth: 200 }}>{log.target}</td>
                <td className="px-4 py-3 text-xs" style={{ color: '#6B7280', maxWidth: 200 }}>{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#F3F4F6' }}>
          <span className="text-xs" style={{ color: '#9CA3AF' }}>
            {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} dari {total} log
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 text-xs rounded border disabled:opacity-40" style={{ borderColor: '#E5E7EB' }}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className="px-2.5 py-1 text-xs rounded border" style={{ borderColor: page === i + 1 ? '#2563EB' : '#E5E7EB', background: page === i + 1 ? '#2563EB' : 'white', color: page === i + 1 ? 'white' : '#374151' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 text-xs rounded border disabled:opacity-40" style={{ borderColor: '#E5E7EB' }}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
