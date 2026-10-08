import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../lib/types';
import {
  LayoutDashboard,
  FileHeart,
  Briefcase,
  ShieldAlert,
  MessageSquareHeart,
  GraduationCap,
  CalendarDays,
  FileCheck2,
  BrainCircuit,
  PhoneCall,
  DollarSign,
  Menu,
  X,
  ChevronDown,
  Check
} from 'lucide-react';

interface LayoutProps {
  telaAtiva: string;
  setTelaAtiva: (tela: string) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ telaAtiva, setTelaAtiva, children }) => {
  const { usuarioAtual, trocarPerfil, usuariosDisponiveis } = useAuth();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [menuPerfilAberto, setMenuPerfilAberto] = useState(false);

  // Módulos funcionais da Proposta Técnica IAS Conecta
  const secoesMenu = [
    {
      titulo: 'Visão Geral',
      itens: [
        { id: 'dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard },
      ],
    },
    {
      titulo: 'Clínica & Cuidado (EAP)',
      itens: [
        { id: 'prontuarios', label: 'Prontuário Eletrônico (SOAP)', icon: FileHeart },
        { id: 'acolhimento', label: 'Cuidado ao Trabalhador (EAP)', icon: MessageSquareHeart },
        { id: 'agendamentos', label: 'Agenda & Terapias', icon: CalendarDays },
      ],
    },
    {
      titulo: 'RH & Prevenção NR-01',
      itens: [
        { id: 'vagas', label: 'Portal de Vagas & Talentos', icon: Briefcase },
        { id: 'nr01', label: 'Gestão de Riscos NR-01 (PGR)', icon: ShieldAlert },
        { id: 'cursos', label: 'Academia IAS (Treinamentos)', icon: GraduationCap },
      ],
    },
    {
      titulo: 'Gestão & Negócios',
      itens: [
        { id: 'financeiro', label: 'Módulo Financeiro & Contratos', icon: DollarSign },
        { id: 'relatorios', label: 'Relatórios & Compliance', icon: FileCheck2 },
      ],
    },
  ];

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'admin_ivna':
        return 'Administração (Ivna)';
      case 'psicologo':
        return 'Psicólogos da equipe';
      case 'rh':
        return 'RH da empresa';
      case 'gestor':
        return 'Gestor da empresa';
      case 'colaborador':
        return 'Candidato / Trabalhador';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar - Conforme a Proposta Técnica do IAS Conecta */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 h-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarAberta(!sidebarAberta)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Menu"
            >
              {sidebarAberta ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => setTelaAtiva('dashboard')}
              className="cursor-pointer flex items-center gap-2.5 select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900">
                    IAS <span className="text-emerald-700">CONECTA</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline -mt-0.5">
                  Plataforma Integrada de RH, Saúde Mental e Conformidade NR-01
                </span>
              </div>
            </div>
          </div>

          {/* Perfis de Acesso da Proposta (Seção 3) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
            {usuariosDisponiveis.map((u) => {
              const ativo = usuarioAtual.role === u.role;
              return (
                <button
                  key={u.role}
                  onClick={() => trocarPerfil(u.role)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    ativo
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {getRoleTitle(u.role)}
                </button>
              );
            })}
          </div>

          {/* Apoio ao Trabalhador & Perfil Ativo */}
          <div className="flex items-center gap-3">
            {/* SOS CVV */}
            <a
              href="tel:188"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md font-medium border border-rose-200/60"
              title="Centro de Valorização da Vida - Apoio Emocional Gratuito 24h"
            >
              <PhoneCall className="w-3 h-3 text-rose-600" />
              <span>CVV 188</span>
            </a>

            {/* Perfil Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuPerfilAberto(!menuPerfilAberto)}
                className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-slate-100 transition text-left"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {usuarioAtual.nome}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {getRoleTitle(usuarioAtual.role)}
                  </p>
                </div>
                <img
                  src={usuarioAtual.avatar}
                  alt={usuarioAtual.nome}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {menuPerfilAberto && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50 animate-in fade-in">
                  <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-800">{usuarioAtual.nome}</p>
                    <p className="text-[11px] text-slate-500">{usuarioAtual.cargo}</p>
                    {usuarioAtual.instituicao && (
                      <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                        {usuarioAtual.instituicao}
                      </p>
                    )}
                  </div>

                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Alternar Perfil (Proposta Técnica):
                  </p>

                  <div className="space-y-0.5">
                    {usuariosDisponiveis.map((u) => {
                      const ativo = usuarioAtual.role === u.role;
                      return (
                        <button
                          key={u.role}
                          onClick={() => {
                            trocarPerfil(u.role);
                            setMenuPerfilAberto(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition ${
                            ativo
                              ? 'bg-slate-100 text-slate-900 font-bold'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{u.nome}</p>
                            <p className="text-[10px] text-slate-400">{getRoleTitle(u.role)}</p>
                          </div>
                          {ativo && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <aside
          className={`lg:block w-60 shrink-0 ${
            sidebarAberta
              ? 'fixed inset-y-0 left-0 z-40 bg-white p-6 shadow-2xl overflow-y-auto block w-64'
              : 'hidden lg:block'
          }`}
        >
          {sidebarAberta && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span className="font-bold text-slate-800 text-sm">Navegação IAS Conecta</span>
              <button
                onClick={() => setSidebarAberta(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="space-y-5">
            {secoesMenu.map((secao) => (
              <div key={secao.titulo}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                  {secao.titulo}
                </p>
                <nav className="space-y-0.5">
                  {secao.itens.map((item) => {
                    const Icon = item.icon;
                    const isActive = telaAtiva === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setTelaAtiva(item.id);
                          setSidebarAberta(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                          isActive
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}

            {/* Rodapé da Proposta */}
            <div className="pt-4 border-t border-slate-100 px-2 text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">Instituto de Autodesenvolvimento e Saúde</p>
              <p className="text-[10px] text-slate-400">
                Preparado para: <strong>Psicóloga Ivna</strong>
              </p>
              <p className="text-[10px] text-slate-400">
                Conforme Portaria MTE nº 1.419/2024 &bull; CFP
              </p>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};
