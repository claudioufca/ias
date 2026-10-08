import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';

import { DashboardSST } from './pages/DashboardSST';
import { ProntuarioView } from './pages/ProntuarioView';
import { PortalVagas } from './pages/PortalVagas';
import { ModuloNR01 } from './pages/ModuloNR01';
import { ChatAcolhimentoView } from './pages/ChatAcolhimentoView';
import { TreinamentosCursos } from './pages/TreinamentosCursos';
import { AgendamentosView } from './pages/AgendamentosView';
import { RelatoriosConformidade } from './pages/RelatoriosConformidade';
import { FinanceiroView } from './pages/FinanceiroView';

function MainApp() {
  const [telaAtiva, setTelaAtiva] = useState<string>('dashboard');

  const renderizarTela = () => {
    switch (telaAtiva) {
      case 'dashboard':
        return <DashboardSST setTelaAtiva={setTelaAtiva} />;
      case 'prontuarios':
        return <ProntuarioView />;
      case 'vagas':
        return <PortalVagas />;
      case 'nr01':
        return <ModuloNR01 />;
      case 'acolhimento':
        return <ChatAcolhimentoView setTelaAtiva={setTelaAtiva} />;
      case 'cursos':
        return <TreinamentosCursos />;
      case 'agendamentos':
        return <AgendamentosView />;
      case 'relatorios':
        return <RelatoriosConformidade />;
      case 'financeiro':
        return <FinanceiroView setTelaAtiva={setTelaAtiva} />;
      default:
        return <DashboardSST setTelaAtiva={setTelaAtiva} />;
    }
  };

  return (
    <Layout telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}>
      {renderizarTela()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
