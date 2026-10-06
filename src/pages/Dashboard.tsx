import { useStore } from '../store';
import { pegawaiList, realisasiList, bidangList, sasaranList, bulanSingkat, getCapaian, getCapaianColor, getCapaianBg, statusConfig } from '../data/dummy';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

// Stat card
function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border flex items-start gap-4" style={{ borderColor: '#E5E7EB' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: color + '1a' }}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ color: '#111827' }}>{value}</div>
        <div className="text-sm font-medium mt-0.5" style={{ color: '#374151' }}>{label}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{sub}</div>}
      </div>
    </div>
  );
}

const MONTHS_SHOWN = 8;

function SuperAdminDashboard() {
  // Monthly realisasi totals
  const monthData = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const bulan = i + 1;
    const items = realisasiList.filter(r => r.bulan === bulan && r.tahun === 2026);
    const total = items.reduce((s, r) => s + r.nilai, 0);
    const target = items.length * 10;
    return { name: bulanSingkat[i], realisasi: total, target, capaian: getCapaian(total, target) };
  });

  const bidangData = bidangList.map(b => {
    const pegawai = pegawaiList.filter(p => p.bidangId === b.id);
    const realisasi = realisasiList.filter(r => pegawai.some(p => p.id === r.pegawaiId));
    return { name: b.nama.replace('Bidang ', ''), pegawai: pegawai.length, laporan: realisasi.length };
  });

  const statusCounts = {
    'Draft': realisasiList.filter(r => r.status === 'Draft').length,
    'Menunggu Verifikasi': realisasiList.filter(r => r.status === 'Menunggu Verifikasi').length,
    'Terverifikasi': realisasiList.filter(r => r.status === 'Terverifikasi').length,
    'Terkunci': 0,
    'Perlu Perbaikan': 0,
  };

  const pieData = Object.entries(statusCounts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: name === 'Terverifikasi' ? '#10B981' : name === 'Menunggu Verifikasi' ? '#F59E0B' : '#9CA3AF',
    }));

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Pegawai" value={pegawaiList.length} sub="3 bidang" icon="👥" color="#1E3A8A" />
        <StatCard label="Sasaran Kinerja" value={sasaranList.length} sub="6 indikator" icon="🎯" color="#2563EB" />
        <StatCard label="Laporan Masuk" value={realisasiList.length} sub="Jan–Agu 2026" icon="📊" color="#10B981" />
        <StatCard label="Terverifikasi" value={statusCounts['Terverifikasi']} sub={`${statusCounts['Menunggu Verifikasi']} menunggu`} icon="✅" color="#F59E0B" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Bar chart */}
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Realisasi Kinerja Jan–Agu 2026</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
              <Bar dataKey="realisasi" fill="#2563EB" radius={[4, 4, 0, 0]} name="Realisasi" />
              <Bar dataKey="target" fill="#DBEAFE" radius={[4, 4, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Status Laporan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11, color: '#374151' }}>{v}</span>} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bidang table + capaian */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bidang stats */}
        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Rekapitulasi per Bidang</h3>
          <div className="space-y-3">
            {bidangList.map(b => {
              const pegawai = pegawaiList.filter(p => p.bidangId === b.id);
              const rel = realisasiList.filter(r => pegawai.some(p => p.id === r.pegawaiId));
              const terverif = rel.filter(r => r.status === 'Terverifikasi').length;
              const pct = rel.length > 0 ? Math.round((terverif / rel.length) * 100) : 0;
              return (
                <div key={b.id} className="p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium" style={{ color: '#111827' }}>{b.nama.replace('Bidang ', '')}</span>
                    <span className="text-xs font-semibold" style={{ color: getCapaianColor(pct) }}>{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: getCapaianColor(pct) }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>{pegawai.length} pegawai</span>
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>{terverif}/{rel.length} terverifikasi</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent audit */}
        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {[
              { aksi: 'Realisasi Agu diinput', oleh: 'Andi Pratama', waktu: '28 Agu, 14:32', icon: '📊', color: '#2563EB' },
              { aksi: 'Input atas nama Dewi Lestari', oleh: 'Rini Kartika', waktu: '28 Agu, 13:10', icon: '✍️', color: '#F59E0B' },
              { aksi: 'Verifikasi laporan Jul', oleh: 'Budi Santoso', waktu: '27 Agu, 09:05', icon: '✅', color: '#10B981' },
              { aksi: 'Kunci periode Jun 2026', oleh: 'Budi Santoso', waktu: '27 Agu, 08:55', icon: '🔒', color: '#1E3A8A' },
              { aksi: 'Submit laporan Agu', oleh: 'Lisa Handayani', waktu: '25 Agu, 11:45', icon: '📤', color: '#8B5CF6' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5" style={{ background: item.color + '1a' }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-tight" style={{ color: '#111827' }}>{item.aksi}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{item.oleh} · {item.waktu}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AdminBidangDashboard() {
  const { currentUser } = useStore();
  const myPegawai = pegawaiList.filter(p => p.bidangId === currentUser?.bidangId);
  const myRealisasi = realisasiList.filter(r => myPegawai.some(p => p.id === r.pegawaiId));
  const terverif = myRealisasi.filter(r => r.status === 'Terverifikasi').length;
  const menunggu = myRealisasi.filter(r => r.status === 'Menunggu Verifikasi').length;
  const draft = myRealisasi.filter(r => r.status === 'Draft').length;
  const bidang = bidangList.find(b => b.id === currentUser?.bidangId);

  const monthData = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const bulan = i + 1;
    const items = myRealisasi.filter(r => r.bulan === bulan);
    return { name: bulanSingkat[i], laporan: items.length, terverif: items.filter(r => r.status === 'Terverifikasi').length };
  });

  return (
    <>
      <div className="mb-4 p-4 rounded-xl flex items-center gap-3" style={{ background: '#DBEAFE' }}>
        <span className="text-xl">🏢</span>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#1E3A8A' }}>Bidang: {bidang?.nama}</div>
          <div className="text-xs" style={{ color: '#3B82F6' }}>Kepala Bidang: {bidang?.kepala}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Pegawai Bidang" value={myPegawai.length} icon="👥" color="#1E3A8A" />
        <StatCard label="Laporan Masuk" value={myRealisasi.length} sub="Jan–Agu 2026" icon="📊" color="#2563EB" />
        <StatCard label="Terverifikasi" value={terverif} icon="✅" color="#10B981" />
        <StatCard label="Menunggu" value={menunggu} sub={`${draft} draft`} icon="⏳" color="#F59E0B" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Laporan Bulanan Bidang</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="laporan" fill="#DBEAFE" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="terverif" fill="#2563EB" radius={[4, 4, 0, 0]} name="Terverifikasi" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Status Pegawai</h3>
          <div className="space-y-2">
            {myPegawai.slice(0, 5).map(p => {
              const rel = myRealisasi.filter(r => r.pegawaiId === p.id);
              const pct = rel.length > 0 ? Math.round((rel.filter(r => r.status === 'Terverifikasi').length / rel.length) * 100) : 0;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: '#1E3A8A' }}>{p.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: '#111827' }}>{p.nama.split(',')[0]}</div>
                    <div className="w-full h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: '#E5E7EB' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: getCapaianColor(pct) }} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: getCapaianColor(pct) }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function PegawaiDashboard() {
  const { currentUser, selectedTahun } = useStore();
  const myRealisasi = realisasiList.filter(r => r.pegawaiId === currentUser?.id && r.tahun === selectedTahun);
  const terverif = myRealisasi.filter(r => r.status === 'Terverifikasi').length;
  const total = myRealisasi.length;
  const pctVerif = total > 0 ? Math.round((terverif / total) * 100) : 0;

  const monthData = Array.from({ length: MONTHS_SHOWN }, (_, i) => {
    const bulan = i + 1;
    const items = myRealisasi.filter(r => r.bulan === bulan);
    const totalNilai = items.reduce((s, r) => s + r.nilai, 0);
    return { name: bulanSingkat[i], nilai: totalNilai, count: items.length };
  });

  const latestStatus = myRealisasi.length > 0 ? myRealisasi[myRealisasi.length - 1].status : 'Draft';
  const sc = statusConfig[latestStatus];

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Laporan Saya" value={total} sub={`Tahun ${selectedTahun}`} icon="📋" color="#1E3A8A" />
        <StatCard label="Terverifikasi" value={terverif} sub={`dari ${total} laporan`} icon="✅" color="#10B981" />
        <StatCard label="Capaian Rata-rata" value={`${pctVerif}%`} sub="Semester I" icon="📈" color="#2563EB" />
        <div className="bg-white rounded-xl p-5 shadow-sm border flex items-start gap-4" style={{ borderColor: '#E5E7EB' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#F59E0B1a' }}>⏱</div>
          <div>
            <div className="text-sm font-semibold px-2 py-0.5 rounded-full inline-block" style={{ background: sc.bg, color: sc.color }}>{latestStatus}</div>
            <div className="text-xs mt-1" style={{ color: '#6B7280' }}>Status laporan terakhir</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Tren Realisasi Saya</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="nilai" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 3 }} name="Nilai" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Riwayat Laporan</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {myRealisasi.slice().reverse().map(r => {
              const sc = statusConfig[r.status];
              return (
                <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F3F4F6' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#111827' }}>
                      {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus'][r.bulan - 1]} {r.tahun}
                    </div>
                    <div className="text-xs" style={{ color: '#9CA3AF' }}>Nilai: {r.nilai}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: sc.bg, color: sc.color }}>{r.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const { currentRole } = useStore();
  return (
    <div>
      {currentRole === 'super_admin' && <SuperAdminDashboard />}
      {currentRole === 'admin_bidang' && <AdminBidangDashboard />}
      {currentRole === 'pegawai' && <PegawaiDashboard />}
    </div>
  );
}
