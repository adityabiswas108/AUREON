import { useState } from 'react';
import { Layout, type PageKey } from '@/components/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { TrendsPage } from '@/pages/TrendsPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { ActionsPage } from '@/pages/ActionsPage';
import { NasaPage } from '@/pages/NasaPage';

function App() {
  const [page, setPage] = useState<PageKey>('dashboard');

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === 'dashboard' && <DashboardPage />}
      {page === 'trends' && <TrendsPage />}
      {page === 'analysis' && <AnalysisPage />}
      {page === 'actions' && <ActionsPage />}
      {page === 'nasa' && <NasaPage />}
    </Layout>
  );
}

export default App;
