import { useMemo, useState, type ReactNode } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { bidangList, bulanNama } from "../data/dummy"
import { useStore } from "../store"

type LkkView = "dashboard" | "daftar" | "form" | "detail" | "monitoring" | "rincian" | "export"
type LkkStatus = "Draft" | "Menunggu Verifikasi" | "Terverifikasi" | "Final"

interface LkkRow {
  id: string
  kode: string
  bidangId: string
  bidang: string
  bulan: number
  program: string
  kegiatan: string
  subkegiatan: string
  indikator: string
  satuan: string
  target: number
  realisasi: number
  status: LkkStatus
  diperbarui: string
}

const lkkRows: LkkRow[] = [
  {
    id: "1",
    kode: "LKK-2026-008",
    bidangId: "b1",
    bidang: "Pengembangan Kompetensi Aparatur",
    bulan: 8,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Pengembangan Kompetensi ASN",
    subkegiatan:
      "Penyelenggaraan Pengembangan Kompetensi bagi Pimpinan Daerah, Jabatan Pimpinan Tinggi, Jabatan Fungsional, dan Kepemimpinan",
    indikator: "Jumlah ASN yang mengikuti pengembangan kompetensi",
    satuan: "Orang",
    target: 480,
    realisasi: 398,
    status: "Menunggu Verifikasi",
    diperbarui: "28 Agu 2026, 14.20",
  },
  {
    id: "2",
    kode: "LKK-2026-007",
    bidangId: "b2",
    bidang: "Mutasi dan Promosi",
    bulan: 8,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Mutasi dan Promosi ASN",
    subkegiatan: "Pengelolaan Mutasi ASN",
    indikator: "Jumlah dokumen mutasi ASN yang diselesaikan",
    satuan: "Dokumen",
    target: 320,
    realisasi: 302,
    status: "Terverifikasi",
    diperbarui: "27 Agu 2026, 11.05",
  },
  {
    id: "3",
    kode: "LKK-2026-006",
    bidangId: "b3",
    bidang: "Penilaian Kinerja dan Disiplin",
    bulan: 8,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Penilaian dan Evaluasi Kinerja Aparatur",
    subkegiatan: "Pelaksanaan Penilaian dan Evaluasi Kinerja Aparatur",
    indikator: "Persentase ASN yang menyelesaikan SKP tepat waktu",
    satuan: "Persen",
    target: 100,
    realisasi: 91.5,
    status: "Draft",
    diperbarui: "26 Agu 2026, 09.40",
  },
  {
    id: "4",
    kode: "LKK-2026-005",
    bidangId: "b1",
    bidang: "Pengembangan Kompetensi Aparatur",
    bulan: 7,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Pengembangan Kompetensi ASN",
    subkegiatan:
      "Sertifikasi, Kelembagaan, Pengembangan Kompetensi Manajerial dan Fungsional",
    indikator: "Persentase ASN yang memenuhi 20 JP pengembangan kompetensi",
    satuan: "Persen",
    target: 90,
    realisasi: 86.4,
    status: "Final",
    diperbarui: "31 Jul 2026, 16.15",
  },
  {
    id: "5",
    kode: "LKK-2026-004",
    bidangId: "b2",
    bidang: "Mutasi dan Promosi",
    bulan: 7,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Pengadaan, Pemberhentian dan Informasi Kepegawaian ASN",
    subkegiatan: "Pengelolaan Sistem Informasi Kepegawaian",
    indikator: "Persentase data kepegawaian yang termutakhirkan",
    satuan: "Persen",
    target: 100,
    realisasi: 98.2,
    status: "Final",
    diperbarui: "30 Jul 2026, 15.30",
  },
  {
    id: "6",
    kode: "LKK-2026-003",
    bidangId: "b3",
    bidang: "Penilaian Kinerja dan Disiplin",
    bulan: 7,
    program: "Program Kepegawaian Daerah",
    kegiatan: "Penilaian dan Evaluasi Kinerja Aparatur",
    subkegiatan: "Pengelolaan Pemberian Penghargaan bagi Pegawai",
    indikator: "Jumlah ASN penerima penghargaan Satyalancana",
    satuan: "Orang",
    target: 145,
    realisasi: 145,
    status: "Terverifikasi",
    diperbarui: "29 Jul 2026, 13.10",
  },
  {
    id: "7",
    kode: "LKK-2026-002",
    bidangId: "b1",
    bidang: "Pengembangan Kompetensi Aparatur",
    bulan: 6,
    program: "Program Penunjang Urusan Pemerintahan Daerah",
    kegiatan: "Administrasi Kepegawaian Perangkat Daerah",
    subkegiatan: "Bimbingan Teknis Implementasi Peraturan Perundang-undangan",
    indikator: "Jumlah pegawai yang mengikuti bimbingan teknis",
    satuan: "Orang",
    target: 80,
    realisasi: 76,
    status: "Final",
    diperbarui: "30 Jun 2026, 14.45",
  },
]

const monthlyData = [
  { bulan: "Jan", target: 48, realisasi: 42, capaian: 88 },
  { bulan: "Feb", target: 88, realisasi: 81, capaian: 92 },
  { bulan: "Mar", target: 136, realisasi: 129, capaian: 95 },
  { bulan: "Apr", target: 192, realisasi: 181, capaian: 94 },
  { bulan: "Mei", target: 252, realisasi: 238, capaian: 94 },
  { bulan: "Jun", target: 318, realisasi: 299, capaian: 94 },
  { bulan: "Jul", target: 386, realisasi: 356, capaian: 92 },
  { bulan: "Agu", target: 450, realisasi: 412, capaian: 92 },
]

const progressData = [
  {
    bidangId: "b1",
    singkat: "Pengembangan Kompetensi",
    total: 8,
    selesai: 6,
    progress: 75,
    capaian: 96,
  },
  {
    bidangId: "b2",
    singkat: "Mutasi dan Promosi",
    total: 7,
    selesai: 7,
    progress: 100,
    capaian: 101,
  },
  {
    bidangId: "b3",
    singkat: "Kinerja dan Disiplin",
    total: 9,
    selesai: 5,
    progress: 56,
    capaian: 88,
  },
  {
    bidangId: "b4",
    singkat: "Sekretariat",
    total: 6,
    selesai: 5,
    progress: 83,
    capaian: 93,
  },
]

const statusStyles: Record<LkkStatus, string> = {
  Draft: "bg-slate-100 text-slate-600 ring-slate-200",
  "Menunggu Verifikasi": "bg-amber-50 text-amber-700 ring-amber-200",
  Terverifikasi: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Final: "bg-blue-50 text-blue-700 ring-blue-200",
}

const statusDots: Record<LkkStatus, string> = {
  Draft: "bg-slate-400",
  "Menunggu Verifikasi": "bg-amber-500",
  Terverifikasi: "bg-emerald-500",
  Final: "bg-blue-600",
}

function Icon({
  name,
  className = "size-4",
}: {
  name: string
  className?: string
}) {
  const paths: Record<string, ReactNode> = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <path d="M3 6h.01M3 12h.01M3 18h.01" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
    report: (
      <>
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" />
      </>
    ),
    export: (
      <>
        <path d="M12 3v12M7 10l5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    unlock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 7.5-2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7h.01" />
      </>
    ),
    trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
    file: (
      <>
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M14 2v6h6" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.file}
    </svg>
  )
}

function StatusBadge({ status }: { status: LkkStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span className={`size-1.5 rounded-full ${statusDots[status]}`} />
      {status}
    </span>
  )
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

function Progress({
  value,
  tone = "blue",
}: {
  value: number
  tone?: "blue" | "green" | "amber"
}) {
  const color =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-500"
        : "bg-blue-600"
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-14 text-center text-sm text-slate-500">
      Tidak ada data yang sesuai dengan filter.
    </div>
  )
}

export default function LKK() {
  const { currentRole, currentUser, selectedTahun, addToast } = useStore()
  const [view, setView] = useState<LkkView>("dashboard")
  const [selectedId, setSelectedId] = useState("1")
  const [bulan, setBulan] = useState("Semua Bulan")
  const [bidang, setBidang] = useState("Semua Bidang")
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState<"final" | "reopen" | null>(null)
  const [exporting, setExporting] = useState(false)
  const isSuperAdmin = currentRole === "super_admin"
  const ownBidangId = currentUser?.bidangId ?? "b1"

  const visibleRows = useMemo(() => {
    return lkkRows.filter((row) => {
      if (!isSuperAdmin && row.bidangId !== ownBidangId) return false
      if (bulan !== "Semua Bulan" && row.bulan !== Number(bulan)) return false
      if (bidang !== "Semua Bidang" && row.bidangId !== bidang) return false
      const needle = query.toLowerCase()
      return (
        !needle ||
        `${row.kode} ${row.program} ${row.kegiatan} ${row.indikator}`
          .toLowerCase()
          .includes(needle)
      )
    })
  }, [bidang, bulan, isSuperAdmin, ownBidangId, query])

  const selected = lkkRows.find((row) => row.id === selectedId) ?? lkkRows[0]

  const navigate = (next: LkkView) => {
    setView(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openDetail = (id: string) => {
    setSelectedId(id)
    navigate("detail")
  }

  const saveDraft = () => {
    addToast("Draft LKK berhasil disimpan.")
    navigate("daftar")
  }

  const confirmFinal = () => {
    setModal(null)
    addToast("LKK berhasil difinalkan dan dikirim untuk pengecekan.")
    navigate("detail")
  }

  const runExport = () => {
    setExporting(true)
    window.setTimeout(() => {
      setExporting(false)
      addToast("File laporan LKK berhasil dibuat dan siap diunduh.")
    }, 900)
  }

  const navItems: {
    id: LkkView
    label: string
    icon: string
    superOnly?: boolean
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "daftar", label: "Daftar LKK", icon: "list" },
    { id: "form", label: "Input LKK", icon: "plus" },
    { id: "monitoring", label: "Monitoring", icon: "monitor", superOnly: true },
    { id: "rincian", label: "Rincian LKK", icon: "report", superOnly: true },
    { id: "export", label: "Export", icon: "export", superOnly: true },
  ]

  return (
    <div className="mx-auto max-w-screen-2xl space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="h-px w-6 bg-blue-600" />
            BKPSDM Kabupaten Buleleng
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            Laporan Kinerja Kegiatan
          </div>
          <div className="mt-1 text-sm text-slate-500">
            Kelola, pantau, dan konsolidasikan capaian kinerja kegiatan tahun{" "}
            {selectedTahun}.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800 sm:flex">
            <Icon name="info" />
            Periode aktif: Agustus {selectedTahun}
          </div>
          {!isSuperAdmin && (
            <button
              onClick={() => navigate("form")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              <Icon name="plus" />
              Input LKK
            </button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50/70 px-3 pt-2">
          {navItems
            .filter((item) => !item.superOnly || isSuperAdmin)
            .map((item) => {
              const active =
                item.id === view || (item.id === "daftar" && view === "detail")
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "border-blue-700 text-blue-800"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              )
            })}
        </div>

        {view === "dashboard" && (
          <DashboardContent isSuperAdmin={isSuperAdmin} navigate={navigate} />
        )}
        {view === "daftar" && (
          <ListContent
            rows={visibleRows}
            isSuperAdmin={isSuperAdmin}
            bulan={bulan}
            setBulan={setBulan}
            bidang={bidang}
            setBidang={setBidang}
            query={query}
            setQuery={setQuery}
            openDetail={openDetail}
            editRow={(id) => {
              setSelectedId(id)
              navigate("form")
            }}
            navigate={navigate}
          />
        )}
        {view === "form" && (
          <FormContent
            isSuperAdmin={isSuperAdmin}
            selected={selected}
            saveDraft={saveDraft}
            requestFinal={() => setModal("final")}
            navigate={navigate}
          />
        )}
        {view === "detail" && (
          <DetailContent
            selected={selected}
            isSuperAdmin={isSuperAdmin}
            navigate={navigate}
            requestReopen={() => setModal("reopen")}
            requestFinal={() => setModal("final")}
            verify={() =>
              addToast("LKK telah diperiksa dan ditandai terverifikasi.")
            }
          />
        )}
        {view === "monitoring" && (
          <MonitoringContent
            openList={(bidangId) => {
              setBidang(bidangId)
              navigate("daftar")
            }}
          />
        )}
        {view === "rincian" && (
          <RincianContent
            openDetail={openDetail}
            runExport={() => {
              navigate("export")
            }}
          />
        )}
        {view === "export" && (
          <ExportContent exporting={exporting} runExport={runExport} />
        )}
      </Card>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <div
              className={`mb-4 flex size-11 items-center justify-center rounded-full ${
                modal === "final"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <Icon
                name={modal === "final" ? "lock" : "unlock"}
                className="size-5"
              />
            </div>
            <div className="text-lg font-bold text-slate-900">
              {modal === "final" ? "Finalkan LKK?" : "Buka kembali LKK?"}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              {modal === "final"
                ? "Setelah difinalkan, data tidak dapat diubah oleh Admin Bidang sampai dibuka kembali oleh Super Admin."
                : "Status LKK akan dikembalikan menjadi Draft agar Admin Bidang dapat melakukan perbaikan data."}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (modal === "final") confirmFinal()
                  else {
                    setModal(null)
                    addToast(
                      "LKK berhasil dibuka kembali untuk diperbaiki.",
                      "warning",
                    )
                  }
                }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                {modal === "final" ? "Ya, Finalkan" : "Buka Kembali"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function DashboardContent({
  isSuperAdmin,
  navigate,
}: {
  isSuperAdmin: boolean
  navigate: (view: LkkView) => void
}) {
  const stats = [
    {
      label: "Total LKK",
      value: "24",
      note: "4 bidang pelaksana",
      icon: "file",
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Sudah Final",
      value: "16",
      note: "66,7% dari total",
      icon: "check",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Menunggu Pengecekan",
      value: "5",
      note: "Perlu ditindaklanjuti",
      icon: "calendar",
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Rata-rata Capaian",
      value: "94,6%",
      note: "Naik 2,4% dari Juli",
      icon: "trend",
      tone: "bg-violet-50 text-violet-700",
    },
  ]
  return (
    <div className="space-y-5 p-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${stat.tone}`}
              >
                <Icon name={stat.icon} className="size-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">
                Agustus
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-slate-900">
              {stat.value}
            </div>
            <div className="mt-0.5 text-sm font-semibold text-slate-700">
              {stat.label}
            </div>
            <div className="mt-1 text-xs text-slate-500">{stat.note}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-5">
        <div className="rounded-xl border border-slate-200 p-5 xl:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">
                Tren Capaian Kinerja
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Akumulasi target dan realisasi seluruh bidang
              </div>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Jan–Agu 2026
            </span>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="lkkTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lkkReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    borderColor: "#e2e8f0",
                    fontSize: 12,
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="url(#lkkTarget)"
                />
                <Area
                  type="monotone"
                  dataKey="realisasi"
                  name="Realisasi"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#lkkReal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Progres per Bidang</div>
              <div className="mt-0.5 text-xs text-slate-500">
                Kelengkapan pengisian periode berjalan
              </div>
            </div>
            {isSuperAdmin && (
              <button
                onClick={() => navigate("monitoring")}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                Lihat semua
              </button>
            )}
          </div>
          <div className="mt-5 space-y-5">
            {progressData.map((item) => (
              <div key={item.bidangId}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    {item.singkat}
                  </span>
                  <span className="font-bold text-slate-900">
                    {item.progress}%
                  </span>
                </div>
                <Progress
                  value={item.progress}
                  tone={
                    item.progress === 100
                      ? "green"
                      : item.progress < 70
                        ? "amber"
                        : "blue"
                  }
                />
                <div className="mt-1.5 text-xs text-slate-400">
                  {item.selesai} dari {item.total} laporan selesai
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-bold text-slate-900">LKK Terbaru</div>
            <button
              onClick={() => navigate("daftar")}
              className="text-xs font-semibold text-blue-700"
            >
              Lihat daftar
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {lkkRows.slice(0, 3).map((row) => (
              <div key={row.id} className="flex items-center gap-3 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon name="file" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-800">
                    {row.indikator}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {row.bidang} · {row.diperbarui}
                  </div>
                </div>
                <StatusBadge status={row.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-700 text-white">
            <Icon name="info" className="size-5" />
          </div>
          <div className="mt-4 font-bold text-slate-900">
            Batas Pengisian LKK
          </div>
          <div className="mt-1 text-sm leading-6 text-slate-600">
            Laporan periode Agustus harus difinalkan paling lambat:
          </div>
          <div className="mt-3 text-lg font-bold text-blue-800">
            5 September 2026
          </div>
          <div className="mt-4 h-px bg-blue-100" />
          <div className="mt-4 text-xs leading-5 text-slate-500">
            Pastikan realisasi, permasalahan, dan tindak lanjut telah diisi
            dengan lengkap.
          </div>
        </div>
      </div>
    </div>
  )
}

interface ListProps {
  rows: LkkRow[]
  isSuperAdmin: boolean
  bulan: string
  setBulan: (value: string) => void
  bidang: string
  setBidang: (value: string) => void
  query: string
  setQuery: (value: string) => void
  openDetail: (id: string) => void
  editRow: (id: string) => void
  navigate: (view: LkkView) => void
}

function ListContent(props: ListProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="font-bold text-slate-900">Daftar LKK</div>
          <div className="mt-0.5 text-xs text-slate-500">
            Seluruh laporan kinerja kegiatan tahun berjalan.
          </div>
        </div>
        <button
          onClick={() => props.navigate("form")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Icon name="plus" /> Tambah LKK
        </button>
      </div>
      <div className="grid gap-3 border-b border-slate-200 bg-slate-50/60 p-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="relative xl:col-span-2">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon name="search" />
          </span>
          <input
            value={props.query}
            onChange={(event) => props.setQuery(event.target.value)}
            placeholder="Cari kode, kegiatan, atau indikator..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <select
          value={props.bulan}
          onChange={(event) => props.setBulan(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option>Semua Bulan</option>
          {bulanNama.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        {props.isSuperAdmin ? (
          <select
            value={props.bidang}
            onChange={(event) => props.setBidang(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option>Semua Bidang</option>
            <option value="b1">Pengembangan Kompetensi</option>
            <option value="b2">Mutasi dan Promosi</option>
            <option value="b3">Kinerja dan Disiplin</option>
          </select>
        ) : (
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500">
            Bidang Anda
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        {props.rows.length ? (
          <table className="w-full min-w-[1050px] text-left">
            <thead className="border-b border-slate-200 bg-white text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Kode / Periode</th>
                <th className="px-4 py-3 font-semibold">
                  Kegiatan dan Indikator
                </th>
                <th className="px-4 py-3 font-semibold">Bidang</th>
                <th className="px-4 py-3 text-right font-semibold">Target</th>
                <th className="px-4 py-3 text-right font-semibold">
                  Realisasi
                </th>
                <th className="px-4 py-3 font-semibold">Capaian</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {props.rows.map((row) => {
                const capaian =
                  Math.round((row.realisasi / row.target) * 1000) / 10
                return (
                  <tr key={row.id} className="group hover:bg-blue-50/30">
                    <td className="px-5 py-4 align-top">
                      <button
                        onClick={() => props.openDetail(row.id)}
                        className="text-sm font-bold text-blue-800 hover:underline"
                      >
                        {row.kode}
                      </button>
                      <div className="mt-1 text-xs text-slate-500">
                        {bulanNama[row.bulan - 1]} 2026
                      </div>
                    </td>
                    <td className="max-w-sm px-4 py-4 align-top">
                      <div className="line-clamp-1 text-sm font-semibold text-slate-800">
                        {row.kegiatan}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {row.indikator}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-xs leading-5 text-slate-600">
                      {row.bidang}
                    </td>
                    <td className="px-4 py-4 text-right align-top text-sm font-semibold text-slate-700">
                      {row.target.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        {row.satuan}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right align-top text-sm font-semibold text-slate-700">
                      {row.realisasi.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        {row.satuan}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div
                        className={`text-sm font-bold ${
                          capaian >= 100
                            ? "text-emerald-700"
                            : capaian >= 85
                              ? "text-blue-700"
                              : "text-amber-700"
                        }`}
                      >
                        {capaian}%
                      </div>
                      <div className="mt-1 w-16">
                        <Progress
                          value={capaian}
                          tone={
                            capaian >= 100
                              ? "green"
                              : capaian < 85
                                ? "amber"
                                : "blue"
                          }
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex justify-end gap-1">
                        <button
                          title="Lihat detail"
                          onClick={() => props.openDetail(row.id)}
                          className="rounded-md p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Icon name="eye" />
                        </button>
                        {row.status !== "Final" && (
                          <button
                            title="Edit LKK"
                            onClick={() => props.editRow(row.id)}
                            className="rounded-md p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Icon name="edit" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <EmptyState />
        )}
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
        <span>
          Menampilkan {props.rows.length} dari {lkkRows.length} LKK
        </span>
        <span>Halaman 1 dari 1</span>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
  note,
}: {
  label: string
  required?: boolean
  children: ReactNode
  note?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
      {note && (
        <span className="mt-1.5 block text-xs text-slate-400">{note}</span>
      )}
    </label>
  )
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

function FormContent({
  isSuperAdmin,
  selected,
  saveDraft,
  requestFinal,
  navigate,
}: {
  isSuperAdmin: boolean
  selected: LkkRow
  saveDraft: () => void
  requestFinal: () => void
  navigate: (view: LkkView) => void
}) {
  const [realisasi, setRealisasi] = useState([
    "42",
    "39",
    "48",
    "52",
    "57",
    "61",
    "57",
    "42",
    "",
    "",
    "",
    "",
  ])
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-slate-200 p-5">
        <button
          onClick={() => navigate("daftar")}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
        >
          <Icon name="back" />
        </button>
        <div>
          <div className="font-bold text-slate-900">Input / Edit LKK</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {selected.kode} · Periode Agustus 2026
          </div>
        </div>
        <span className="ml-auto">
          <StatusBadge status="Draft" />
        </span>
      </div>
      {isSuperAdmin && (
        <div className="mx-5 mt-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
          <Icon name="info" className="mt-0.5 size-4 shrink-0" />
          Anda sedang melihat mode Super Admin. Penginputan dan perubahan data
          utama dilakukan oleh Admin Bidang.
        </div>
      )}
      <div className="space-y-6 p-5">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              1
            </span>
            <div className="font-bold text-slate-900">Identitas Laporan</div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Tahun" required>
              <select className={inputClass} defaultValue="2026">
                <option>2026</option>
                <option>2025</option>
              </select>
            </Field>
            <Field label="Bulan Laporan" required>
              <select className={inputClass} defaultValue="Agustus">
                <option>Agustus</option>
                <option>Juli</option>
                <option>Juni</option>
              </select>
            </Field>
            <Field label="Bidang" required>
              <select
                className={inputClass}
                defaultValue="Pengembangan Kompetensi Aparatur"
                disabled={!isSuperAdmin}
              >
                <option>Pengembangan Kompetensi Aparatur</option>
                <option>Mutasi dan Promosi</option>
                <option>Penilaian Kinerja dan Disiplin</option>
              </select>
            </Field>
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              2
            </span>
            <div className="font-bold text-slate-900">
              Struktur Kinerja Kegiatan
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <Field label="Program" required>
              <select
                className={inputClass}
                defaultValue="Program Kepegawaian Daerah"
              >
                <option>Program Kepegawaian Daerah</option>
                <option>
                  Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota
                </option>
              </select>
            </Field>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Kegiatan" required>
                <select
                  className={inputClass}
                  defaultValue="Pengembangan Kompetensi ASN"
                >
                  <option>Pengembangan Kompetensi ASN</option>
                  <option>Administrasi Kepegawaian Perangkat Daerah</option>
                </select>
              </Field>
              <Field label="Subkegiatan" required>
                <select
                  className={inputClass}
                  defaultValue="Penyelenggaraan Pengembangan Kompetensi bagi Pimpinan Daerah"
                >
                  <option>
                    Penyelenggaraan Pengembangan Kompetensi bagi Pimpinan Daerah
                  </option>
                  <option>
                    Sertifikasi dan Pengembangan Kompetensi Manajerial
                  </option>
                </select>
              </Field>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Field label="Indikator / Tolok Ukur" required>
                  <input
                    className={inputClass}
                    defaultValue="Jumlah ASN yang mengikuti pengembangan kompetensi"
                  />
                </Field>
              </div>
              <Field label="Target Tahunan" required>
                <input
                  className={inputClass}
                  type="number"
                  defaultValue="480"
                />
              </Field>
              <Field label="Satuan" required>
                <select className={inputClass} defaultValue="Orang">
                  <option>Orang</option>
                  <option>Persen</option>
                  <option>Dokumen</option>
                  <option>Kegiatan</option>
                </select>
              </Field>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              3
            </span>
            <div className="font-bold text-slate-900">Realisasi Bulanan</div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 text-xs text-slate-600">
                <tr>
                  {bulanNama.map((name) => (
                    <th
                      key={name}
                      className="border-b border-r border-slate-200 px-2 py-3 font-semibold last:border-r-0"
                    >
                      {name.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {realisasi.map((value, index) => (
                    <td
                      key={bulanNama[index]}
                      className="border-r border-slate-200 p-2 last:border-r-0"
                    >
                      <input
                        aria-label={`Realisasi ${bulanNama[index]}`}
                        value={value}
                        onChange={(event) =>
                          setRealisasi((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? event.target.value : item,
                            ),
                          )
                        }
                        disabled={index > 7}
                        placeholder="-"
                        className="w-full rounded-md border border-slate-300 px-2 py-2 text-center text-sm font-semibold outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
              <tfoot className="border-t border-slate-200 bg-blue-50 text-xs font-semibold text-blue-800">
                <tr>
                  <td colSpan={12} className="px-3 py-2.5">
                    Akumulasi realisasi s.d. Agustus: <strong>398 Orang</strong>{" "}
                    · Capaian terhadap target tahunan: <strong>82,9%</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              4
            </span>
            <div className="font-bold text-slate-900">
              Evaluasi dan Tindak Lanjut
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Field
              label="Permasalahan / Faktor Penghambat"
              required
              note="Jelaskan kendala yang memengaruhi pencapaian target."
            >
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                defaultValue="Penjadwalan beberapa pelatihan teknis harus disesuaikan dengan kalender kegiatan perangkat daerah dan ketersediaan narasumber."
              />
            </Field>
            <Field
              label="Upaya Tindak Lanjut"
              required
              note="Tuliskan langkah perbaikan yang akan dilakukan."
            >
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                defaultValue="Melakukan koordinasi ulang jadwal pelatihan, menyiapkan alternatif narasumber, dan mengoptimalkan metode pembelajaran daring."
              />
            </Field>
          </div>
        </section>
      </div>
      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-200 bg-white/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-slate-500">
          Terakhir disimpan: 28 Agustus 2026, 14.20 WITA
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("daftar")}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            onClick={saveDraft}
            className="rounded-lg border border-blue-700 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Simpan Draft
          </button>
          {!isSuperAdmin && (
            <button
              onClick={requestFinal}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              <Icon name="lock" /> Finalkan LKK
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailContent({
  selected,
  isSuperAdmin,
  navigate,
  requestReopen,
  requestFinal,
  verify,
}: {
  selected: LkkRow
  isSuperAdmin: boolean
  navigate: (view: LkkView) => void
  requestReopen: () => void
  requestFinal: () => void
  verify: () => void
}) {
  const months = [42, 39, 48, 52, 57, 61, 57, 42, 0, 0, 0, 0]
  const capaian = Math.round((selected.realisasi / selected.target) * 1000) / 10
  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("daftar")}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <Icon name="back" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">Detail LKK</span>
              <StatusBadge status={selected.status} />
            </div>
            <div className="mt-0.5 text-xs text-slate-500">
              {selected.kode} · {bulanNama[selected.bulan - 1]} 2026
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isSuperAdmin && selected.status === "Menunggu Verifikasi" && (
            <button
              onClick={verify}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Icon name="check" /> Tandai Terverifikasi
            </button>
          )}
          {isSuperAdmin && selected.status === "Final" && (
            <button
              onClick={requestReopen}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
            >
              <Icon name="unlock" /> Buka Kembali
            </button>
          )}
          {!isSuperAdmin && selected.status !== "Final" && (
            <button
              onClick={() => navigate("form")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Icon name="edit" /> Edit
            </button>
          )}
          {!isSuperAdmin && selected.status !== "Final" && (
            <button
              onClick={requestFinal}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white"
            >
              <Icon name="lock" /> Finalkan
            </button>
          )}
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 p-4 lg:col-span-3">
            <div className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              Struktur Kinerja
            </div>
            <dl className="grid gap-x-6 gap-y-4 md:grid-cols-2">
              {[
                ["Program", selected.program],
                ["Kegiatan", selected.kegiatan],
                ["Subkegiatan", selected.subkegiatan],
                ["Indikator / Tolok Ukur", selected.indikator],
              ].map(([label, value], index) => (
                <div key={label} className={index > 1 ? "md:col-span-2" : ""}>
                  <dt className="text-xs font-medium text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl bg-primary p-5 text-white">
            <div className="text-xs font-medium text-blue-200">
              Capaian Kinerja
            </div>
            <div className="mt-2 text-3xl font-bold">{capaian}%</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-900">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${Math.min(capaian, 100)}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-blue-200">Target</div>
                <div className="mt-1 font-bold">
                  {selected.target} {selected.satuan}
                </div>
              </div>
              <div>
                <div className="text-blue-200">Realisasi</div>
                <div className="mt-1 font-bold">
                  {selected.realisasi} {selected.satuan}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900">
            Realisasi Januari–Desember
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-center">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  {bulanNama.map((name) => (
                    <th key={name} className="px-3 py-3 font-semibold">
                      {name.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {months.map((value, index) => (
                    <td
                      key={bulanNama[index]}
                      className={`border-t border-slate-100 px-3 py-4 text-sm font-bold ${
                        value ? "text-slate-800" : "text-slate-300"
                      }`}
                    >
                      {value || "–"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-700">
              Permasalahan / Faktor Penghambat
            </div>
            <div className="mt-3 text-sm leading-6 text-slate-700">
              Penjadwalan beberapa pelatihan teknis harus disesuaikan dengan
              kalender kegiatan perangkat daerah dan ketersediaan narasumber.
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">
              Upaya Tindak Lanjut
            </div>
            <div className="mt-3 text-sm leading-6 text-slate-700">
              Melakukan koordinasi ulang jadwal pelatihan, menyiapkan alternatif
              narasumber, dan mengoptimalkan metode pembelajaran daring.
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Riwayat Status
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            {[
              ["Draft dibuat", "25 Agu 2026 · Admin Bidang"],
              ["Diperbarui", "28 Agu 2026 · Admin Bidang"],
              ["Menunggu verifikasi", "28 Agu 2026 · 14.20 WITA"],
            ].map(([title, note], index) => (
              <div key={title} className="flex flex-1 items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <Icon name="check" className="size-3.5" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-700">
                    {title}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{note}</div>
                </div>
                {index < 2 && (
                  <div className="ml-auto hidden h-px flex-1 bg-slate-200 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MonitoringContent({
  openList,
}: {
  openList: (bidangId: string) => void
}) {
  return (
    <div className="space-y-5 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-bold text-slate-900">
            Monitoring Pengisian LKK
          </div>
          <div className="mt-0.5 text-xs text-slate-500">
            Pantau ketepatan waktu dan kelengkapan laporan setiap bidang.
          </div>
        </div>
        <div className="flex gap-2">
          <select className={inputClass}>
            <option>Agustus 2026</option>
            <option>Juli 2026</option>
          </select>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Terapkan
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs font-semibold text-emerald-700">
            Tepat Waktu
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-900">
            2 Bidang
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-semibold text-amber-700">
            Dalam Proses
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-900">2 Bidang</div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="text-xs font-semibold text-red-700">
            Belum Mengisi
          </div>
          <div className="mt-2 text-2xl font-bold text-red-900">0 Bidang</div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Bidang</th>
              <th className="px-4 py-3">Progres Pengisian</th>
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3 text-center">Final</th>
              <th className="px-4 py-3 text-center">Draft</th>
              <th className="px-4 py-3">Rata-rata Capaian</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {progressData.map((item) => (
              <tr key={item.bidangId}>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-slate-800">
                    {item.singkat}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Diperbarui 28 Agu 2026
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-28">
                      <Progress
                        value={item.progress}
                        tone={
                          item.progress === 100
                            ? "green"
                            : item.progress < 70
                              ? "amber"
                              : "blue"
                        }
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {item.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-sm font-semibold">
                  {item.total}
                </td>
                <td className="px-4 py-4 text-center text-sm font-semibold text-emerald-700">
                  {item.selesai}
                </td>
                <td className="px-4 py-4 text-center text-sm font-semibold text-slate-500">
                  {item.total - item.selesai}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-sm font-bold ${
                      item.capaian >= 100 ? "text-emerald-700" : "text-blue-700"
                    }`}
                  >
                    {item.capaian}%
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => openList(item.bidangId)}
                    className="text-xs font-semibold text-blue-700 hover:underline"
                  >
                    Lihat LKK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border border-slate-200 p-5">
        <div className="font-bold text-slate-900">
          Perbandingan Capaian per Bidang
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="singkat"
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 120]}
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  borderColor: "#e2e8f0",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="capaian"
                name="Capaian (%)"
                fill="#2563eb"
                radius={[5, 5, 0, 0]}
                barSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function RincianContent({
  openDetail,
  runExport,
}: {
  openDetail: (id: string) => void
  runExport: () => void
}) {
  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-bold text-slate-900">Rincian LKK Gabungan</div>
          <div className="mt-0.5 text-xs text-slate-500">
            Konsolidasi program, kegiatan, subkegiatan, dan capaian seluruh
            bidang.
          </div>
        </div>
        <div className="flex gap-2">
          <select className={inputClass}>
            <option>Agustus 2026</option>
            <option>Juli 2026</option>
          </select>
          <button
            onClick={runExport}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Icon name="export" /> Export
          </button>
        </div>
      </div>
      <div className="border-b border-blue-100 bg-blue-50 px-5 py-3 text-xs text-blue-800">
        <strong>Ringkasan:</strong> 2 Program · 6 Kegiatan · 14 Subkegiatan · 24
        Indikator · Capaian rata-rata 94,6%
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1350px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Kegiatan</th>
              <th className="px-4 py-3">Subkegiatan</th>
              <th className="px-4 py-3">Indikator / Tolok Ukur</th>
              <th className="px-4 py-3 text-right">Target</th>
              <th className="px-4 py-3 text-right">Realisasi</th>
              <th className="px-4 py-3 text-right">Capaian</th>
              <th className="px-4 py-3">Bidang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lkkRows.slice(0, 6).map((row, index) => {
              const pct = Math.round((row.realisasi / row.target) * 1000) / 10
              return (
                <tr key={row.id} className="align-top hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openDetail(row.id)}
                      className="font-bold text-blue-700"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  </td>
                  <td className="max-w-44 px-4 py-4 leading-5 text-slate-600">
                    {row.program}
                  </td>
                  <td className="max-w-48 px-4 py-4 font-semibold leading-5 text-slate-700">
                    {row.kegiatan}
                  </td>
                  <td className="max-w-64 px-4 py-4 leading-5 text-slate-600">
                    {row.subkegiatan}
                  </td>
                  <td className="max-w-56 px-4 py-4 font-medium leading-5 text-slate-700">
                    {row.indikator}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold">
                    {row.target} {row.satuan}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold">
                    {row.realisasi} {row.satuan}
                  </td>
                  <td
                    className={`px-4 py-4 text-right font-bold ${
                      pct >= 100 ? "text-emerald-700" : "text-blue-700"
                    }`}
                  >
                    {pct}%
                  </td>
                  <td className="max-w-40 px-4 py-4 leading-5 text-slate-500">
                    {row.bidang}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="border-t-2 border-blue-200 bg-blue-50 font-bold text-blue-900">
            <tr>
              <td colSpan={7} className="px-4 py-4 text-right">
                Rata-rata Capaian Kinerja
              </td>
              <td className="px-4 py-4 text-right">94,6%</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

function ExportContent({
  exporting,
  runExport,
}: {
  exporting: boolean
  runExport: () => void
}) {
  const [format, setFormat] = useState("excel")
  return (
    <div className="grid gap-6 p-5 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="font-bold text-slate-900">Export Laporan LKK</div>
        <div className="mt-1 text-sm text-slate-500">
          Pilih cakupan data dan format laporan yang akan diunduh.
        </div>
        <div className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tahun" required>
              <select className={inputClass}>
                <option>2026</option>
                <option>2025</option>
              </select>
            </Field>
            <Field label="Periode" required>
              <select className={inputClass}>
                <option>Agustus</option>
                <option>Juli</option>
                <option>Januari–Agustus</option>
                <option>Satu Tahun</option>
              </select>
            </Field>
          </div>
          <Field label="Bidang">
            <select className={inputClass}>
              <option>Semua Bidang</option>
              <option>Pengembangan Kompetensi Aparatur</option>
              <option>Mutasi dan Promosi</option>
              <option>Penilaian Kinerja dan Disiplin</option>
            </select>
          </Field>
          <Field label="Jenis Laporan" required>
            <select className={inputClass}>
              <option>Laporan LKK per Bidang</option>
              <option>RINCIAN LKK Gabungan</option>
              <option>Rekapitulasi Capaian</option>
            </select>
          </Field>
          <div>
            <div className="mb-2 text-xs font-semibold text-slate-700">
              Format File
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setFormat("excel")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  format === "excel"
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
                  XLS
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    Microsoft Excel
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Data tabular yang dapat diolah
                  </span>
                </span>
              </button>
              <button
                onClick={() => setFormat("word")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  format === "word"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                  DOC
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    Microsoft Word
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Dokumen siap cetak dan tanda tangan
                  </span>
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={runExport}
            disabled={exporting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
          >
            <Icon name="export" />{" "}
            {exporting ? "Menyiapkan file..." : "Buat dan Unduh Laporan"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Pratinjau Cakupan
          </div>
          <div className="mt-5 space-y-4">
            {[
              ["Periode", "Agustus 2026"],
              ["Bidang", "Semua Bidang"],
              ["Jumlah LKK", "24 laporan"],
              [
                "Format",
                format === "excel"
                  ? "Microsoft Excel (.xlsx)"
                  : "Microsoft Word (.docx)",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-0"
              >
                <span className="text-xs text-slate-500">{label}</span>
                <span className="text-right text-xs font-semibold text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-blue-100 bg-white p-4">
            <div className="flex gap-3">
              <Icon
                name="info"
                className="mt-0.5 size-4 shrink-0 text-blue-700"
              />
              <div className="text-xs leading-5 text-slate-600">
                Laporan mencakup struktur program sampai indikator, realisasi
                bulanan, capaian, permasalahan, dan tindak lanjut.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 p-5">
          <div className="text-sm font-bold text-slate-800">Riwayat Export</div>
          <div className="mt-4 space-y-3">
            {[
              ["RINCIAN_LKK_JULI_2026.xlsx", "2 Agu 2026 · 2,4 MB"],
              ["LKK_SEMESTER_I_2026.docx", "5 Jul 2026 · 4,1 MB"],
            ].map(([file, note]) => (
              <div key={file} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                  <Icon name="file" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-slate-700">
                    {file}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
