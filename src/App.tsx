import { useStore } from './store';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataPegawai from './pages/DataPegawai';
import SasaranIndikator from './pages/SasaranIndikator';
import Target from './pages/Target';
import Realisasi from './pages/Realisasi';
import Verifikasi from './pages/Verifikasi';
import Export from './pages/Export';
import LKK from './pages/LKK';
import AuditTrail from './pages/AuditTrail';

function PageContent() {
  const { currentPage } = useStore();
  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'data-pegawai': return <DataPegawai />;
    case 'sasaran-indikator': return <SasaranIndikator />;
    case 'target': return <Target />;
    case 'realisasi': return <Realisasi />;
    case 'verifikasi': return <Verifikasi />;
    case 'export': return <Export />;
    case 'lkk': return <LKK />;
    case 'audit-trail': return <AuditTrail />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const { isLoggedIn } = useStore();

  if (!isLoggedIn) return <Login />;

  return (
    <Layout>
      <PageContent />
    </Layout>
  );
}
