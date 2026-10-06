import { useStore, type Page } from "../store"
import type { Role } from "../data/dummy"

interface NavItem {
  page: Page
  label: string
  icon: string
  roles: Role[]
}

const navItems: NavItem[] = [
  {
    page: "dashboard",
    label: "Dashboard",
    icon: "⊞",
    roles: ["super_admin", "admin_bidang", "pegawai"],
  },
  {
    page: "data-pegawai",
    label: "Data Pegawai",
    icon: "👥",
    roles: ["super_admin", "admin_bidang"],
  },
  {
    page: "sasaran-indikator",
    label: "Sasaran & Indikator",
    icon: "🎯",
    roles: ["super_admin"],
  },
  {
    page: "target",
    label: "Target & Revisi",
    icon: "📋",
    roles: ["super_admin", "pegawai"],
  },
  {
    page: "realisasi",
    label: "Realisasi Bulanan",
    icon: "📊",
    roles: ["super_admin", "admin_bidang", "pegawai"],
  },
  {
    page: "verifikasi",
    label: "Verifikasi & Lock",
    icon: "✅",
    roles: ["super_admin"],
  },
  {
    page: "export",
    label: "Laporan & Export",
    icon: "📤",
    roles: ["super_admin", "admin_bidang", "pegawai"],
  },
  {
    page: "lkk",
    label: "Laporan Kinerja Kegiatan",
    icon: "▤",
    roles: ["super_admin", "admin_bidang"],
  },
  {
    page: "audit-trail",
    label: "Audit Trail",
    icon: "🔍",
    roles: ["super_admin"],
  },
]

export default function Sidebar() {
  const { currentRole, currentPage, navigate } = useStore()

  const visible = navItems.filter((n) => n.roles.includes(currentRole))

  return (
    <aside
      className="flex flex-col h-full"
      style={{ background: "#0f2260", width: 240, minWidth: 240 }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "#1a3275" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "#2563EB" }}
          >
            BK
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">
              BKPSDM
            </div>
            <div className="text-xs leading-tight" style={{ color: "#93C5FD" }}>
              Sistem Kinerja
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 sidebar-nav">
        {visible.map((item) => {
          const active = currentPage === item.page
          return (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 text-sm font-medium"
              style={{
                background: active ? "#2563EB" : "transparent",
                color: active ? "#fff" : "#93C5FD",
                borderLeft: active
                  ? "3px solid #60A5FA"
                  : "3px solid transparent",
              }}
            >
              <span className="text-base leading-none w-5 text-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "#1a3275" }}>
        <div className="text-xs" style={{ color: "#60A5FA" }}>
          © 2026 BKPSDM v1.0
        </div>
      </div>
    </aside>
  )
}
