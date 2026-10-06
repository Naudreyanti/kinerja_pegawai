import { create } from 'zustand';
import type { Role, Pegawai } from '../data/dummy';
import { pegawaiList } from '../data/dummy';

export type Page =
  | 'login'
  | 'dashboard'
  | 'data-pegawai'
  | 'sasaran-indikator'
  | 'target'
  | 'realisasi'
  | 'verifikasi'
  | 'export'
  | 'lkk'
  | 'audit-trail';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface AppState {
  isLoggedIn: boolean;
  currentUser: Pegawai | null;
  currentRole: Role;
  currentPage: Page;
  selectedTahun: number;
  toasts: Toast[];

  login: (pegawaiId: string) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  navigate: (page: Page) => void;
  setTahun: (tahun: number) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  currentUser: null,
  currentRole: 'super_admin',
  currentPage: 'login',
  selectedTahun: 2026,
  toasts: [],

  login: (pegawaiId) => {
    const user = pegawaiList.find(p => p.id === pegawaiId);
    if (user) {
      set({ isLoggedIn: true, currentUser: user, currentRole: user.role, currentPage: 'dashboard' });
    }
  },

  logout: () => set({ isLoggedIn: false, currentUser: null, currentPage: 'login' }),

  switchRole: (role) => set({ currentRole: role, currentPage: 'dashboard' }),

  navigate: (page) => set({ currentPage: page }),

  setTahun: (tahun) => set({ selectedTahun: tahun }),

  addToast: (message, type = 'success') => {
    const id = Date.now().toString();
    set(state => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 3500);
  },

  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));
