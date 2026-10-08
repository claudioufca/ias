import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../lib/types';
import { chatAcolhimento } from '../lib/gemini';
import {
  MessageSquareHeart,
  PhoneCall,
  Send,
  Loader2,
  Wind,
  Shield,
  Sparkles
} from 'lucide-react';

interface ChatAcolhimentoProps {
  setTelaAtiva: (tela: string) => void;
}

export const ChatAcolhimentoView: React.FC<ChatAcolhimentoProps> = ({ setTelaAtiva }) => {
  const { usuarioAtual } = useAuth();

  const [mensagens, setMensagens] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'model',
      text: `Olá${usuarioAtual?.nome ? `, ${usuarioAtual.nome}` : ''}. Sou o assistente de acolhimento e escuta inicial do IAS Conecta.

Este é um espaço confidencial para expressar como você está se sentindo em relação à rotina e ao trabalho.

*Lembrando que este canal oferece apoio preliminar e não substitui psicoterapia clínica ou atendimento médico formal.*

Como você está hoje? Pode escolher uma opção abaixo ou escrever livremente.`,
      timestamp: 'Agora',
    },
  ]);

  const [inputTexto, setInputTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [alertaCriticoAtivo, setAlertaCriticoAtivo] = useState(false);
  const [sugestoes, setSugestoes] = useState<string[]>([
    'Sinto sobrecarga e cansaço com prazos',
    'Tenho tido dificuldade para dormir',
    'Gostaria de agendar com o psicólogo',
    'Preciso de uma pausa para me acalmar'
  ]);

  const [modalRespiracao, setModalRespiracao] = useState(false);
  const [faseRespiracao, setFaseRespiracao] = useState<'inspire' | 'segure' | 'expire'>('inspire');
  const [contadorRespiracao, setContadorRespiracao] = useState(4);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, enviando]);

  // Respiração consciente
  useEffect(() => {
    if (!modalRespiracao) return;

    const interval = setInterval(() => {
      setContadorRespiracao((prev) => {
        if (prev > 1) return prev - 1;

        if (faseRespiracao === 'inspire') {
          setFaseRespiracao('segure');
          return 4;
        } else if (faseRespiracao === 'segure') {
          setFaseRespiracao('expire');
          return 6;
        } else {
          setFaseRespiracao('inspire');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [modalRespiracao, faseRespiracao]);

  const enviarMensagem = async (textoParaEnviar?: string) => {
    const texto = textoParaEnviar || inputTexto;
    if (!texto.trim() || enviando) return;

    const novaMensagemUsuario: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: texto.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setInputTexto('');
    setEnviando(true);

    if (texto.toLowerCase().includes('respirar') || texto.toLowerCase().includes('acalmar')) {
      setModalRespiracao(true);
    }

    try {
      const historicoFormatado = mensagens.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const respostaIA = await chatAcolhimento(
        historicoFormatado,
        texto,
        usuarioAtual
      );

      const novaMensagemModel: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'model',
        text: respostaIA.resposta,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        alertaUrgente: respostaIA.alertaUrgente,
      };

      setMensagens((prev) => [...prev, novaMensagemModel]);

      if (respostaIA.alertaUrgente) {
        setAlertaCriticoAtivo(true);
      }

      if (respostaIA.sugestoesRapidas && respostaIA.sugestoesRapidas.length > 0) {
        setSugestoes(respostaIA.sugestoesRapidas);
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    } finally {
      setEnviando(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Canal de Acolhimento & Triagem
          </h1>
          <p className="text-xs text-slate-500">
            Espaço confidencial de escuta inicial &bull; Diretrizes éticas do CFP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalRespiracao(true)}
            className="text-xs text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Respiração</span>
          </button>

          <a
            href="tel:188"
            className="text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 border border-rose-200/60"
            title="Ligue 188 - Centro de Valorização da Vida"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>CVV 188</span>
          </a>
        </div>
      </div>

      {/* Alerta de Urgência apenas se acionado */}
      {alertaCriticoAtivo && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2">
          <p className="font-bold text-rose-900">
            Apoio Especializado Imediato Disponível:
          </p>
          <p className="text-rose-800 leading-relaxed">
            Se estiver em sofrimento agudo, disque <strong>188 (CVV - Ligação Gratuita 24h)</strong> ou <strong>192 (SAMU)</strong>. Você não precisa passar por isso sozinho(a).
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href="tel:188"
              className="bg-rose-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
            >
              Ligar 188 Agora
            </a>
            <button
              onClick={() => setTelaAtiva('agendamentos')}
              className="bg-white border border-rose-200 text-rose-900 font-medium px-3 py-1.5 rounded-lg text-xs"
            >
              Agendar com Psicólogo
            </button>
          </div>
        </div>
      )}

      {/* Caixa do Chat */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col h-[500px] overflow-hidden">
        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {mensagens.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 border border-slate-100 text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block mt-1 text-[9px] text-right ${
                      isUser ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {enviando && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Ouvindo...</span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Sugestões Rápidas */}
        <div className="p-2 sm:px-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {sugestoes.map((sug, i) => (
            <button
              key={i}
              onClick={() => enviarMensagem(sug)}
              disabled={enviando}
              className="text-[11px] text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
          <input
            type="text"
            placeholder="Escreva como você está se sentindo..."
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={enviando}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <button
            onClick={() => enviarMensagem()}
            disabled={!inputTexto.trim() || enviando}
            className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition disabled:opacity-40"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Modal Respiração */}
      {modalRespiracao && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">Respiração Consciente</h3>
            <p className="text-xs text-slate-500">
              Acompanhe o ritmo para desacelerar o batimento cardíaco e relaxar a mente.
            </p>

            <div className="w-36 h-36 mx-auto rounded-full bg-slate-50 border-2 border-emerald-500 flex items-center justify-center">
              <div>
                <span className="text-3xl font-bold text-slate-900 tabular-nums">
                  {contadorRespiracao}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 block uppercase mt-0.5">
                  {faseRespiracao === 'inspire' && 'Inspire'}
                  {faseRespiracao === 'segure' && 'Segure'}
                  {faseRespiracao === 'expire' && 'Expire'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setModalRespiracao(false)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium pt-2"
            >
              Fechar exercício
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
