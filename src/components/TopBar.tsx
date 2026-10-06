import { useState } from "react"
import { useStore } from "../store"
import type { Role } from "../data/dummy"
import { tahunOptions } from "../data/dummy"

const pageTitle: Record<string, string> = {
  dashboard: "Dashboard Kinerja",
  "data-pegawai": "Data Pegawai",
  "sasaran-indikator": "Sasaran & Indikator",
  target: "Target & Revisi",
  realisasi: "Realisasi Bulanan",
  verifikasi: "Verifikasi & Lock",
  export: "Laporan & Export",
  lkk: "Laporan Kinerja Kegiatan",
  "audit-trail": "Audit Trail",
}

const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  admin_bidang: "Admin Bidang",
  pegawai: "Pegawai",
}

const roleBadgeStyle: Record<Role, { bg: string color: string }> = {
  super_admin: { bg: "#DBEAFE", color: "#1E3A8A" },
  admin_bidang: { bg: "#FEF3C7", color: "#92400E" },
  pegawai: { bg: "#D1FAE5", color: "#065F46" },
}

export default function TopBar() {
  const {
    currentPage,
    selectedTahun,
    setTahun,
    currentUser,
    currentRole,
    switchRole,
    logout,
  } = useStore()
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const badge = roleBadgeStyle[currentRole]

  return (
    <header
      className="flex items-center justify-between px-6 py-0 h-14 bg-white border-b"
      style={{ borderColor: "#E5E7EB" }}
    >
      {/* Left: title */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-base" style={{ color: "#111827" }}>
          {pageTitle[currentPage] ?? "BKPSDM"}
        </h1>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: badge.bg, color: badge.color }}
        >
          {roleLabels[currentRole]}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Tahun filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "#6B7280" }}>
            Tahun:
          </span>
          <select
            value={selectedTahun}
            onChange={(e) => setTahun(Number(e.target.value))}
            className="text-sm font-semibold border rounded-md px-2 py-1 focus:outline-none focus:ring-2"
            style={{ borderColor: "#D1D5DB", color: "#1E3A8A" }}
          >
            {tahunOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu)
              setShowUserMenu(false)
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#D1D5DB", color: "#374151" }}
          >
            <span>🔄</span>
            <span>Ganti Role</span>
          </button>
          {showRoleMenu && (
            <div
              className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border z-50 min-w-[180px] overflow-hidden"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#9CA3AF", background: "#F9FAFB" }}
              >
                Pilih Role
              </div>
              {(["super_admin", "admin_bidang", "pegawai"] as Role[]).map(
                (r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r)
                      setShowRoleMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-blue-50 transition-colors text-left"
                    style={{
                      color: currentRole === r ? "#1E3A8A" : "#374151",
                      fontWeight: currentRole === r ? 600 : 400,
                    }}
                  >
                    {currentRole === r && (
                      <span className="text-blue-600">✓</span>
                    )}
                    {currentRole !== r && <span className="w-4" />}
                    {roleLabels[r]}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowRoleMenu(false)
            }}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#1E3A8A" }}
            >
              {currentUser?.avatar ?? "U"}
            </div>
            <div className="text-left hidden sm:block">
              <div
                className="text-xs font-semibold leading-tight"
                style={{
                  color: "#111827",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentUser?.nama.split(",")[0]}
              </div>
              <div className="text-xs" style={{ color: "#9CA3AF" }}>
                {currentUser?.jabatan.split(" ").slice(0, 2).join(" ")}
              </div>
            </div>
          </button>
          {showUserMenu && (
            <div
              className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border z-50 min-w-[200px] overflow-hidden"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "#F3F4F6" }}
              >
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#111827" }}
                >
                  {currentUser?.nama}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  {currentUser?.email}
                </div>
              </div>
              <button
                onClick={() => {
                  logout()
                  setShowUserMenu(false)
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-red-50 transition-colors text-left"
                style={{ color: "#EF4444" }}
              >
                <span>⏻</span>
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click away */}
      {(showRoleMenu || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowRoleMenu(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </header>
  )
}
