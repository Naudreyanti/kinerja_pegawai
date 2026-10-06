import { useStore } from '../store';

export default function Toast() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[280px] animate-slide-in"
          style={{
            background: t.type === 'success' ? '#065F46' : t.type === 'error' ? '#991B1B' : '#92400E',
            color: '#fff',
          }}
        >
          <span className="text-lg">
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '⚠'}
          </span>
          <span className="text-sm font-medium flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100 text-lg leading-none">×</button>
        </div>
      ))}
    </div>
  );
}
