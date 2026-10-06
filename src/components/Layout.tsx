import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Toast from './Toast';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: '#F0F4FA' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <Toast />
    </div>
  );
}
