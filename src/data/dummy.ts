export type Role = 'super_admin' | 'admin_bidang' | 'pegawai';
export type StatusLaporan = 'Draft' | 'Menunggu Verifikasi' | 'Terverifikasi' | 'Terkunci' | 'Perlu Perbaikan';

export interface Bidang {
  id: string;
  nama: string;
  kepala: string;
}

export interface Pegawai {
  id: string;
  nip: string;
  nama: string;
  jabatan: string;
  pangkat: string;
  bidangId: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface Sasaran {
  id: string;
  nama: string;
  deskripsi: string;
  bidangId: string;
}

export interface Indikator {
  id: string;
  sasaranId: string;
  nama: string;
  satuan: string;
}

export interface Target {
  id: string;
  indikatorId: string;
  pegawaiId: string;
  tahun: number;
  bulan: number; // 1-12
  nilai: number;
  status: 'Aktif' | 'Terkunci' | 'Revisi';
}

export interface Realisasi {
  id: string;
  targetId: string;
  indikatorId: string;
  pegawaiId: string;
  tahun: number;
  bulan: number;
  nilai: number;
  keterangan: string;
  inputOleh: string; // nama yang input
  createdAt: string;
  status: StatusLaporan;
}

export interface AuditLog {
  id: string;
  waktu: string;
  pengguna: string;
  role: string;
  aksi: string;
  target: string;
  detail: string;
}

export const bidangList: Bidang[] = [
  { id: 'b1', nama: 'Bidang Pengembangan ASN', kepala: 'Dr. Rini Kartika, M.Si' },
  { id: 'b2', nama: 'Bidang Mutasi & Kepangkatan', kepala: 'Drs. Ahmad Fauzi, M.M' },
  { id: 'b3', nama: 'Bidang Disiplin & Kesejahteraan', kepala: 'Hj. Siti Rahayu, S.Sos' },
];

export const pegawaiList: Pegawai[] = [
  { id: 'p1', nip: '198501012010011001', nama: 'Dr. Budi Santoso, M.Si', jabatan: 'Kepala BKPSDM', pangkat: 'Pembina Utama Muda / IV-c', bidangId: 'b1', email: 'budi.santoso@bkpsdm.go.id', role: 'super_admin', avatar: 'BS' },
  { id: 'p2', nip: '199002152015031002', nama: 'Dr. Rini Kartika, M.Si', jabatan: 'Kepala Bidang Pengembangan ASN', pangkat: 'Pembina / IV-a', bidangId: 'b1', email: 'rini.kartika@bkpsdm.go.id', role: 'admin_bidang', avatar: 'RK' },
  { id: 'p3', nip: '198803202014021003', nama: 'Drs. Ahmad Fauzi, M.M', jabatan: 'Kepala Bidang Mutasi & Kepangkatan', pangkat: 'Pembina / IV-a', bidangId: 'b2', email: 'ahmad.fauzi@bkpsdm.go.id', role: 'admin_bidang', avatar: 'AF' },
  { id: 'p4', nip: '197912052008012004', nama: 'Hj. Siti Rahayu, S.Sos', jabatan: 'Kepala Bidang Disiplin & Kesejahteraan', pangkat: 'Pembina / IV-a', bidangId: 'b3', email: 'siti.rahayu@bkpsdm.go.id', role: 'admin_bidang', avatar: 'SR' },
  { id: 'p5', nip: '199511102019031005', nama: 'Andi Pratama, S.AP', jabatan: 'Analis Pengembangan SDM', pangkat: 'Penata / III-c', bidangId: 'b1', email: 'andi.pratama@bkpsdm.go.id', role: 'pegawai', avatar: 'AP' },
  { id: 'p6', nip: '199208182018022006', nama: 'Dewi Lestari, S.Psi', jabatan: 'Psikolog ASN', pangkat: 'Penata / III-c', bidangId: 'b1', email: 'dewi.lestari@bkpsdm.go.id', role: 'pegawai', avatar: 'DL' },
  { id: 'p7', nip: '199701012020031007', nama: 'Fajar Nugroho, S.Kom', jabatan: 'Pranata Komputer', pangkat: 'Penata Muda / III-a', bidangId: 'b1', email: 'fajar.nugroho@bkpsdm.go.id', role: 'pegawai', avatar: 'FN' },
  { id: 'p8', nip: '198906152016031008', nama: 'Hendra Wijaya, S.H', jabatan: 'Analis Kepegawaian', pangkat: 'Penata Tk.I / III-d', bidangId: 'b2', email: 'hendra.wijaya@bkpsdm.go.id', role: 'pegawai', avatar: 'HW' },
  { id: 'p9', nip: '199304252018022009', nama: 'Indah Permata, S.AP', jabatan: 'Pengelola Mutasi', pangkat: 'Penata Muda Tk.I / III-b', bidangId: 'b2', email: 'indah.permata@bkpsdm.go.id', role: 'pegawai', avatar: 'IP' },
  { id: 'p10', nip: '198712102013011010', nama: 'Joko Susanto, S.H', jabatan: 'Analis Hukum Kepegawaian', pangkat: 'Penata / III-c', bidangId: 'b2', email: 'joko.susanto@bkpsdm.go.id', role: 'pegawai', avatar: 'JS' },
  { id: 'p11', nip: '200001012021032011', nama: 'Kartika Sari, S.Sos', jabatan: 'Pengelola Kepangkatan', pangkat: 'Penata Muda / III-a', bidangId: 'b2', email: 'kartika.sari@bkpsdm.go.id', role: 'pegawai', avatar: 'KS' },
  { id: 'p12', nip: '199609152019022012', nama: 'Lisa Handayani, S.IP', jabatan: 'Analis Disiplin ASN', pangkat: 'Penata Muda Tk.I / III-b', bidangId: 'b3', email: 'lisa.handayani@bkpsdm.go.id', role: 'pegawai', avatar: 'LH' },
  { id: 'p13', nip: '198507072012011013', nama: 'M. Ridwan, S.Sos', jabatan: 'Pengelola Kesejahteraan ASN', pangkat: 'Penata / III-c', bidangId: 'b3', email: 'm.ridwan@bkpsdm.go.id', role: 'pegawai', avatar: 'MR' },
  { id: 'p14', nip: '199802202022022014', nama: 'Nurul Hidayah, S.AP', jabatan: 'Pengelola Cuti ASN', pangkat: 'Penata Muda / III-a', bidangId: 'b3', email: 'nurul.hidayah@bkpsdm.go.id', role: 'pegawai', avatar: 'NH' },
  { id: 'p15', nip: '199403102020011015', nama: 'Oscar Dermawan, S.H', jabatan: 'Analis Penegakan Disiplin', pangkat: 'Penata Muda Tk.I / III-b', bidangId: 'b3', email: 'oscar.dermawan@bkpsdm.go.id', role: 'pegawai', avatar: 'OD' },
];

export const sasaranList: Sasaran[] = [
  { id: 's1', nama: 'Peningkatan Kompetensi ASN', deskripsi: 'Meningkatkan kompetensi teknis dan manajerial ASN melalui diklat dan pelatihan', bidangId: 'b1' },
  { id: 's2', nama: 'Percepatan Proses Mutasi & Kenaikan Pangkat', deskripsi: 'Mempersingkat waktu proses administrasi mutasi dan kenaikan pangkat ASN', bidangId: 'b2' },
  { id: 's3', nama: 'Penegakan Disiplin dan Kesejahteraan ASN', deskripsi: 'Meningkatkan kedisiplinan dan tingkat kesejahteraan ASN', bidangId: 'b3' },
];

export const indikatorList = [
  { id: 'i1', sasaranId: 's1', nama: 'Jumlah ASN yang mengikuti diklat', satuan: 'Orang' },
  { id: 'i2', sasaranId: 's1', nama: 'Tingkat kepuasan peserta diklat', satuan: '%' },
  { id: 'i3', sasaranId: 's2', nama: 'Jumlah SK Mutasi yang diterbitkan', satuan: 'SK' },
  { id: 'i4', sasaranId: 's2', nama: 'Rata-rata waktu proses kenaikan pangkat', satuan: 'Hari' },
  { id: 'i5', sasaranId: 's3', nama: 'Jumlah kasus pelanggaran disiplin ditangani', satuan: 'Kasus' },
  { id: 'i6', sasaranId: 's3', nama: 'Persentase ASN yang menerima TPP tepat waktu', satuan: '%' },
];

const bulanNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// Generate realisasi data Jan-Agu 2026 for selected pegawai + indikator
const realisasiBase: Realisasi[] = [];
let rId = 1;

const pegawaiIndikatorMap: { pegawaiId: string; indikatorId: string; targetBulan: number }[] = [
  { pegawaiId: 'p5', indikatorId: 'i1', targetBulan: 5 },
  { pegawaiId: 'p5', indikatorId: 'i2', targetBulan: 85 },
  { pegawaiId: 'p6', indikatorId: 'i1', targetBulan: 4 },
  { pegawaiId: 'p8', indikatorId: 'i3', targetBulan: 8 },
  { pegawaiId: 'p8', indikatorId: 'i4', targetBulan: 14 },
  { pegawaiId: 'p12', indikatorId: 'i5', targetBulan: 3 },
  { pegawaiId: 'p12', indikatorId: 'i6', targetBulan: 95 },
];

const realisasiValues: Record<string, number[]> = {
  'p5-i1': [5, 6, 4, 5, 5, 7, 6, 5],
  'p5-i2': [82, 85, 88, 84, 86, 90, 87, 89],
  'p6-i1': [4, 3, 5, 4, 4, 5, 4, 3],
  'p8-i3': [7, 9, 8, 10, 9, 8, 11, 10],
  'p8-i4': [13, 14, 12, 11, 13, 14, 12, 13],
  'p12-i5': [2, 3, 3, 4, 3, 2, 3, 4],
  'p12-i6': [95, 95, 100, 98, 95, 97, 100, 98],
};

pegawaiIndikatorMap.forEach(({ pegawaiId, indikatorId, targetBulan }) => {
  const key = `${pegawaiId}-${indikatorId}`;
  const vals = realisasiValues[key] || [];
  for (let bulan = 1; bulan <= 8; bulan++) {
    const status: StatusLaporan = bulan <= 6 ? 'Terverifikasi' : bulan === 7 ? 'Menunggu Verifikasi' : 'Draft';
    realisasiBase.push({
      id: `r${rId++}`,
      targetId: `t-${pegawaiId}-${indikatorId}-${bulan}`,
      indikatorId,
      pegawaiId,
      tahun: 2026,
      bulan,
      nilai: vals[bulan - 1] ?? targetBulan,
      keterangan: bulan <= 6 ? 'Sesuai target yang ditetapkan' : 'Proses verifikasi',
      inputOleh: pegawaiId === 'p5' || pegawaiId === 'p6' ? 'Andi Pratama, S.AP' : pegawaiId === 'p8' ? 'Hendra Wijaya, S.H' : 'Lisa Handayani, S.IP',
      createdAt: `2026-0${bulan < 10 ? bulan : bulan}-28T09:${String(rId % 60).padStart(2, '0')}:00Z`,
      status,
    });
  }
});

export const realisasiList = realisasiBase;

export const auditLogs: AuditLog[] = [
  { id: 'a1', waktu: '2026-08-28 14:32:15', pengguna: 'Andi Pratama, S.AP', role: 'Pegawai', aksi: 'INPUT REALISASI', target: 'Indikator: Jumlah ASN mengikuti diklat - Agu 2026', detail: 'Nilai realisasi: 5 Orang' },
  { id: 'a2', waktu: '2026-08-28 13:10:42', pengguna: 'Dr. Rini Kartika, M.Si', role: 'Admin Bidang', aksi: 'INPUT ATAS NAMA', target: 'Indikator: Kepuasan peserta diklat - Agu 2026', detail: 'Input atas nama: Dewi Lestari | Nilai: 89%' },
  { id: 'a3', waktu: '2026-08-27 09:05:33', pengguna: 'Dr. Budi Santoso, M.Si', role: 'Super Admin', aksi: 'VERIFIKASI', target: 'Realisasi Jul 2026 - Bidang Pengembangan ASN', detail: 'Status: Menunggu Verifikasi → Terverifikasi' },
  { id: 'a4', waktu: '2026-08-27 08:55:11', pengguna: 'Dr. Budi Santoso, M.Si', role: 'Super Admin', aksi: 'KUNCI PERIODE', target: 'Periode Jun 2026 - Semua Bidang', detail: 'Periode dikunci. Tidak dapat diubah.' },
  { id: 'a5', waktu: '2026-08-26 16:20:05', pengguna: 'Hendra Wijaya, S.H', role: 'Pegawai', aksi: 'INPUT REALISASI', target: 'Indikator: Jumlah SK Mutasi - Agu 2026', detail: 'Nilai realisasi: 10 SK' },
  { id: 'a6', waktu: '2026-08-25 11:45:30', pengguna: 'Lisa Handayani, S.IP', role: 'Pegawai', aksi: 'SUBMIT LAPORAN', target: 'Realisasi Agu 2026', detail: 'Status: Draft → Menunggu Verifikasi' },
  { id: 'a7', waktu: '2026-08-20 10:12:00', pengguna: 'Drs. Ahmad Fauzi, M.M', role: 'Admin Bidang', aksi: 'INPUT ATAS NAMA', target: 'Indikator: Waktu proses kenaikan pangkat - Agu 2026', detail: 'Input atas nama: Indah Permata | Nilai: 13 Hari' },
  { id: 'a8', waktu: '2026-08-15 14:00:00', pengguna: 'Dr. Budi Santoso, M.Si', role: 'Super Admin', aksi: 'TAMBAH PEGAWAI', target: 'Nurul Hidayah, S.AP', detail: 'NIP: 199802202022022014 | Bidang: Disiplin & Kesejahteraan' },
];

export const bulanNama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export const bulanSingkat = bulanNames;

export const tahunOptions = [2024, 2025, 2026];

export const statusConfig: Record<StatusLaporan, { label: string; color: string; bg: string; dot: string }> = {
  'Draft': { label: 'Draft', color: '#6B7280', bg: '#F3F4F6', dot: '#9CA3AF' },
  'Menunggu Verifikasi': { label: 'Menunggu Verifikasi', color: '#92400E', bg: '#FEF3C7', dot: '#F59E0B' },
  'Terverifikasi': { label: 'Terverifikasi', color: '#065F46', bg: '#D1FAE5', dot: '#10B981' },
  'Terkunci': { label: 'Terkunci', color: '#1E3A8A', bg: '#DBEAFE', dot: '#3B82F6' },
  'Perlu Perbaikan': { label: 'Perlu Perbaikan', color: '#991B1B', bg: '#FEE2E2', dot: '#EF4444' },
};

export function getCapaian(realisasi: number, target: number): number {
  if (target === 0) return 0;
  return Math.round((realisasi / target) * 100);
}

export function getCapaianColor(pct: number): string {
  if (pct >= 100) return '#10B981';
  if (pct >= 50) return '#F59E0B';
  return '#EF4444';
}

export function getCapaianBg(pct: number): string {
  if (pct >= 100) return '#D1FAE5';
  if (pct >= 50) return '#FEF3C7';
  return '#FEE2E2';
}
