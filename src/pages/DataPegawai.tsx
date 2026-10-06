import { useState } from 'react';
import { useStore } from '../store';
import { pegawaiList, bidangList } from '../data/dummy';
import type { Pegawai } from '../data/dummy';

const roleLabel: Record<string, string> = {
  super_admin: 'Super Admin',
  admin_bidang: 'Admin Bidang',
  pegawai: 'Pegawai',
};

export default function DataPegawai() {
  const { currentRole, currentUser, addToast } = useStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Pegawai | null>(null);
  const PER_PAGE = 8;

  // Admin bidang only sees their bidang
  const filtered = pegawaiList
    .filter(p => currentRole === 'admin_bidang' ? p.bidangId === currentUser?.bidangId : true)
    .filter(p => p.nama.toLowerCase().includes(search.toLowerCase()) || p.nip.includes(search) || p.jabatan.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setEditData(null); setShowModal(true); };
  const openEdit = (p: Pegawai) => { setEditData(p); setShowModal(true); };

  const handleSave = () => {
    setShowModal(false);
    addToast(editData ? `Data pegawai ${editData.nama.split(',')[0]} berhasil diperbarui` : 'Pegawai baru berhasil ditambahkan');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-base" style={{ color: '#111827' }}>Data Pegawai</h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            {currentRole === 'admin_bidang' ? `Bidang: ${bidangList.find(b => b.id === currentUser?.bidangId)?.nama}` : 'Seluruh BKPSDM'}
          </p>
        </div>
        {currentRole === 'super_admin' && (
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#1E3A8A' }}>
            <span>＋</span> Tambah Pegawai
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
        {/* Search bar */}
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#F3F4F6' }}>
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Cari nama, NIP, jabatan..."
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#E5E7EB' }}
            />
          </div>
          <span className="text-xs" style={{ color: '#9CA3AF' }}>{filtered.length} pegawai</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['No', 'NIP', 'Nama Pegawai', 'Jabatan', 'Pangkat', 'Bidang', 'Role', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((p, i) => {
                const bidang = bidangList.find(b => b.id === p.bidangId);
                return (
                  <tr key={p.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F3F4F6' }}>
                    <td className="px-4 py-3 text-xs" style={{ color: '#9CA3AF' }}>{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: '#374151' }}>{p.nip}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: '#1E3A8A' }}>{p.avatar}</div>
                        <span className="font-medium" style={{ color: '#111827' }}>{p.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#374151' }}>{p.jabatan}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#6B7280' }}>{p.pangkat}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#374151' }}>{bidang?.nama.replace('Bidang ', '')}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                        background: p.role === 'super_admin' ? '#DBEAFE' : p.role === 'admin_bidang' ? '#FEF3C7' : '#D1FAE5',
                        color: p.role === 'super_admin' ? '#1E3A8A' : p.role === 'admin_bidang' ? '#92400E' : '#065F46',
                      }}>
                        {roleLabel[p.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)} className="text-xs font-medium hover:underline" style={{ color: '#2563EB' }}>Edit</button>
                        {currentRole === 'super_admin' && (
                          <button onClick={() => addToast(`Hapus pegawai: ${p.nama.split(',')[0]}`, 'error')} className="text-xs font-medium hover:underline" style={{ color: '#EF4444' }}>Hapus</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#F3F4F6' }}>
          <span className="text-xs" style={{ color: '#9CA3AF' }}>
            Menampilkan {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} dari {filtered.length}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F3F4F6' }}>
              <h3 className="font-bold text-base" style={{ color: '#111827' }}>{editData ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'NIP', placeholder: '18 digit NIP', defaultValue: editData?.nip },
                { label: 'Nama Lengkap', placeholder: 'Nama beserta gelar', defaultValue: editData?.nama },
                { label: 'Jabatan', placeholder: 'Jabatan fungsional/struktural', defaultValue: editData?.jabatan },
                { label: 'Pangkat/Golongan', placeholder: 'Contoh: Penata / III-c', defaultValue: editData?.pangkat },
                { label: 'Email Dinas', placeholder: 'email@bkpsdm.go.id', defaultValue: editData?.email },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>{f.label}</label>
                  <input defaultValue={f.defaultValue} placeholder={f.placeholder} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Bidang</label>
                  <select defaultValue={editData?.bidangId} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }}>
                    {bidangList.map(b => <option key={b.id} value={b.id}>{b.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#374151' }}>Role</label>
                  <select defaultValue={editData?.role} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none" style={{ borderColor: '#E5E7EB' }}>
                    <option value="pegawai">Pegawai</option>
                    <option value="admin_bidang">Admin Bidang</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: '#F3F4F6' }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm rounded-lg border font-medium" style={{ borderColor: '#E5E7EB', color: '#374151' }}>Batal</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm rounded-lg font-semibold text-white" style={{ background: '#1E3A8A' }}>
                {editData ? 'Simpan Perubahan' : 'Tambah Pegawai'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
