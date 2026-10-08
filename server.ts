import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for checking if Gemini is configured
const hasValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

// 1. Resumo de Evolução Clínica (Prontuário SOAP + Escalas)
app.post('/api/gemini/resumo-clinico', async (req, res) => {
  try {
    const { paciente, sessoes, escalas } = req.body;

    if (!hasValidKey) {
      // Fallback rico e bem estruturado caso a chave não esteja disponível no ambiente
      return res.json({
        success: true,
        isSimulated: true,
        resumo: `### PARECER TÉCNICO DE EVOLUÇÃO CLÍNICA OCUPACIONAL
**Paciente:** ${paciente?.nome || 'Colaborador(a)'} | **Matrícula:** ${paciente?.matricula || 'N/A'}
**Setor:** ${paciente?.setor || 'Operações'} | **Cargo:** ${paciente?.cargo || 'Analista'}
**Data de Emissão:** ${new Date().toLocaleDateString('pt-BR')} | **Responsável Técnico:** Psicologia do Trabalho / IAS Conecta

---

#### 1. SÍNTESE DA EVOLUÇÃO LONGITUDINAL (SOAP)
Com base na análise das ${sessoes?.length || 3} sessões registradas sob a metodologia SOAP:
- **Subjetivo (S):** O colaborador relata flutuações de sobrecarga atencional com alívio progressivo após a introdução de pausas ergonômicas cognitivas. Queixas de insônia e ansiedade antecipatória diminuíram em 40% em relação ao acolhimento inicial.
- **Objetivo (O):** Postura mais receptiva nas sessões recentes, fala articulada e redução de tensão motora. Escalas psicométricas apontam descompressão no inventário de Maslach (MBI - Exaustão Emocional de 26 para 18 pontos).
- **Avaliação (A):** Quadro compatível com resposta adaptativa positiva ao manejo de estressores ocupacionais da NR-01. Mecanismos de enfrentamento (coping) mais funcionais.
- **Plano (P):** Continuidade dos encontros quinzenais, monitoramento do retorno gradual às demandas de fechamento de mês e reforço de higiene do sono.

#### 2. VULNERABILIDADES PSICOSSOCIAIS & GESTÃO NR-01
- **Fatores Organizacionais:** Ritmo intenso em prazos concorrentes e necessidade de alinhamento com a liderança imediata sobre repactuação de entregas.
- **Prevenção Primária Sugerida:** Manter diálogo estruturado de feedback 1:1 sem pressão punitiva.

#### 3. DIRETRIZES TERAPÊUTICAS & CONCLUSÃO
Recomenda-se a manutenção do acompanhamento no canal IAS Conecta por mais 4 sessões, com parecer favorável à continuidade laboral plena e reforço das medidas de suporte preventivo secundário.`
      });
    }

    const prompt = `Você é um psicólogo clínico e organizacional sênior, especialista em Saúde Mental no Trabalho e na Norma Regulamentadora NR-01 (Gerenciamento de Riscos Ocupacionais psicossociais).

Analise os dados clínicos do paciente abaixo, incluindo o histórico de sessões em formato SOAP (Subjetivo, Objetivo, Avaliação, Plano) e as escalas psicométricas aplicadas.
Gere um RESUMO DE EVOLUÇÃO CLÍNICA FORMAL, estruturado e técnico para o prontuário psicológico (conforme padrões do Conselho Federal de Psicologia - CFP).

DADOS DO PACIENTE:
Nome: ${paciente?.nome}
Cargo/Setor: ${paciente?.cargo} - ${paciente?.setor}
Queixa Principal: ${paciente?.queixaPrincipal || 'Sobrecarga e estresse laboral'}
Diagnóstico Preliminar: ${paciente?.diagnosticoPreliminar || 'Em investigação / Fator Z56.6'}

HISTÓRICO DE SESSÕES (SOAP):
${JSON.stringify(sessoes, null, 2)}

ESCALAS PSICOMÉTRICAS (Burnout, Estresse, Ansiedade):
${JSON.stringify(escalas, null, 2)}

ESTRUTURA DO PARECER:
1. Síntese Longitudinal da Evolução Clínica (análise de progressão dos eixos S, O, A e P)
2. Interpretação das Escalas Psicométricas e Indicadores de Risco
3. Fatores Psicossociais Laborais Identificados (alinhamento NR-01 / GRO)
4. Plano Terapêutico e Recomendações Ocupacionais (Ajustes de posto, pausas cognitivas, apoio de liderança)
5. Conclusão Técnica e Previsão de Reavaliação

Mantenha linguagem ética, técnica, precisa e confidencial.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      resumo: response.text,
    });
  } catch (error: any) {
    console.error('Erro ao gerar resumo clínico:', error);
    res.status(500).json({ error: error?.message || 'Falha ao processar resumo clínico' });
  }
});

// 2. Match Candidato x Vaga
app.post('/api/gemini/match-vaga', async (req, res) => {
  try {
    const { candidato, vaga } = req.body;

    if (!hasValidKey) {
      // Fallback estruturado
      return res.json({
        success: true,
        isSimulated: true,
        percentualMatch: 88,
        nivelAderencia: 'Alto',
        resumoExecutivo: `${candidato?.nome || 'O candidato'} apresenta forte correspondência com as exigências técnicas e o perfil comportamental esperado para a vaga de ${vaga?.titulo || 'Posição'}. Destaca-se pela maturidade emocional e experiência prévia em ambientes de alta colaboração.`,
        pontosFortes: [
          'Domínio das ferramentas e metodologias essenciais exigidas no escopo da vaga.',
          'Alta inteligência emocional e capacidade comprovada de resolução de conflitos.',
          'Alinhamento com a cultura de prevenção e bem-estar do ecossistema IAS Conecta.',
          'Comunicação assertiva e histórico sólido de entregas em prazos dinâmicos.'
        ],
        lacunas: [
          'Pouca vivência específica em auditorias externas de NR-01/PGR (necessitará de onboarding técnico).',
          'Tempo de experiência ligeiramente abaixo do teto sênior desejado, compensado pela curva de aprendizado.'
        ],
        fitPsicossocial: 'Excelente resiliência a estressores cotidianos, perfil proativo com alta capacidade de autorregulação e espírito colaborativo.',
        perguntasEntrevista: [
          'Como você estruturaria sua rotina ao se deparar com três demandas urgentes e concorrentes de setores diferentes?',
          'Conte sobre uma situação em que você identificou sobrecarga em um colega e como atuou para mitigar o impacto no clima da equipe.'
        ]
      });
    }

    const prompt = `Você é um especialista em Recrutamento e Seleção Estratégico e Psicologia Organizacional.
Avalie o alinhamento (Match IA) entre o CANDIDATO e a VAGA aberta, considerando tanto competências técnicas quanto soft skills, perfil psicossocial e adequação aos riscos e ritmos da posição.

VAGA:
Título: ${vaga?.titulo}
Área/Setor: ${vaga?.area || vaga?.setor}
Modelo: ${vaga?.modelo || 'Híbrido'}
Requisitos: ${Array.isArray(vaga?.requisitos) ? vaga.requisitos.join(', ') : vaga?.requisitos}
Demandas e Contexto: ${vaga?.descricao || 'Atuação em ambiente colaborativo e cumprimento de prazos'}

CANDIDATO:
Nome: ${candidato?.nome}
Formação: ${candidato?.formacao}
Experiência: ${candidato?.experiencia}
Habilidades Técnicas: ${Array.isArray(candidato?.habilidadesTecnicas) ? candidato.habilidadesTecnicas.join(', ') : candidato?.habilidadesTecnicas}
Soft Skills & Perfil Comportamental: ${Array.isArray(candidato?.softSkills) ? candidato.softSkills.join(', ') : candidato?.softSkills}
Resumo / Bio: ${candidato?.bio || ''}

Retorne um JSON estrito com o seguinte formato:
{
  "percentualMatch": number (0 a 100),
  "nivelAderencia": "Excelente" | "Alto" | "Moderado" | "Baixo",
  "resumoExecutivo": string,
  "pontosFortes": string[],
  "lacunas": string[],
  "fitPsicossocial": string,
  "perguntasEntrevista": string[]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            percentualMatch: { type: Type.INTEGER },
            nivelAderencia: { type: Type.STRING },
            resumoExecutivo: { type: Type.STRING },
            pontosFortes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            lacunas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            fitPsicossocial: { type: Type.STRING },
            perguntasEntrevista: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['percentualMatch', 'nivelAderencia', 'resumoExecutivo', 'pontosFortes', 'lacunas', 'fitPsicossocial', 'perguntasEntrevista'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      ...parsed,
    });
  } catch (error: any) {
    console.error('Erro no match de vaga:', error);
    res.status(500).json({ error: error?.message || 'Falha ao calcular match de candidato' });
  }
});

// 3. Análise NR-01 / PGR Psicossocial (3 Riscos Prioritários + Plano de Ação Primária/Secundária/Terciária)
app.post('/api/gemini/analise-nr01', async (req, res) => {
  try {
    const { setor, dadosSetor, riscosIdentificados } = req.body;

    if (!hasValidKey) {
      return res.json({
        success: true,
        isSimulated: true,
        diagnosticoGeral: `O setor de ${setor || 'Operações'} apresenta concentração de fatores estressores ligados a sobrecarga cognitiva e interrupções frequentes. Requer intervenção prioritária no Programa de Gerenciamento de Riscos (PGR) da NR-01.`,
        riscosPrioritarios: [
          {
            id: 'R-01',
            titulo: 'Sobrecarga Mental & Cobrança de Metas Concorrentes',
            categoria: 'Organização do Trabalho',
            severidade: 'Alta',
            probabilidade: 'Frequente',
            nivelRisco: 'Crítico (Grau 4)',
            justificativa: 'Volume de trabalho incompatível com a jornada efetiva e multiplicidade de canais de comunicação com urgência artificial.'
          },
          {
            id: 'R-02',
            titulo: 'Ambiguidade de Papéis e Falta de Autonomia Decisória',
            categoria: 'Relações Socioprofissionais',
            severidade: 'Média',
            probabilidade: 'Provável',
            nivelRisco: 'Substancial (Grau 3)',
            justificativa: 'Falta de delimitação das responsabilidades de entrega entre analistas e lideranças operacionais.'
          },
          {
            id: 'R-03',
            titulo: 'Desgaste Emocional no Atendimento a Usuários Conflituosos',
            categoria: 'Condições Ambientais & Relacionais',
            severidade: 'Média',
            probabilidade: 'Provável',
            nivelRisco: 'Moderado (Grau 2)',
            justificativa: 'Exposição contínua a demandas de clientes insatisfeitos sem suporte de descompressão psicológica.'
          }
        ],
        planoAcao: {
          prevencaoPrimaria: [
            {
              acao: 'Redesenho de processos e implantação de teto de chamados simultâneos por analista',
              responsavel: 'Gestão Operacional & Engenharia de Processos',
              prazo: '30 dias',
              indicador: 'Redução de 35% no índice de chamados em backlog crítico'
            },
            {
              acao: 'Matriz RACI para clarificação de papéis e autonomia de tomada de decisão',
              responsavel: 'RH & Liderança Setorial',
              prazo: '20 dias',
              indicador: '100% dos colaboradores com descrição de cargo revisada'
            }
          ],
          prevencaoSecundaria: [
            {
              acao: 'Treinamento de Liderança Empática e Reconhecimento de Sinais de Burnout',
              responsavel: 'Psicologia IAS Conecta & RH',
              prazo: '15 dias',
              indicador: 'Adesão de 95% das lideranças ao workshop de saúde mental'
            },
            {
              acao: 'Pausas ativas programadas de 10 minutos para autorregulação e ergonomia cognitiva',
              responsavel: 'Comitê de SST / CIPA',
              prazo: 'Imediato',
              indicador: 'Monitoramento diário de micro-pausas no software'
            }
          ],
          prevencaoTerciaria: [
            {
              acao: 'Disponibilização do Canal de Acolhimento Psicológico Confidencial IAS Conecta 24/7',
              responsavel: 'Equipe de Saúde Mental IAS',
              prazo: 'Contínuo',
              indicador: 'Taxa de resolução no acolhimento primário e encaminhamentos clínicos'
            },
            {
              acao: 'Protocolo de Reabilitação e Retorno Seguro ao Trabalho após afastamento B31/B91',
              responsavel: 'Médico do Trabalho & Psicólogo Ocupacional',
              prazo: 'Contínuo',
              indicador: 'Zero reincidência de absenteísmo por transtornos F32/F43 no retorno'
            }
          ]
        },
        alinhamentoPGR: 'Conforme subitem 1.5.3.2.1 da NR-01, os fatores psicossociais devem ser integrados ao Inventário de Riscos Ocupacionais e ao Plano de Ação do PGR, com revisão periódica a cada 12 meses ou pós-eventos sentinela.'
      });
    }

    const prompt = `Você é um Engenheiro de Segurança do Trabalho e Psicólogo Ocupacional especialista em NR-01 (Gerenciamento de Riscos Ocupacionais - GRO) e Programa de Gerenciamento de Riscos (PGR), com ênfase na identificação e controle de RISCOS PSICOSSOCIAIS.

Analise o cenário do setor abaixo:
Setor: ${setor}
Dados do Setor / Indicadores: ${JSON.stringify(dadosSetor, null, 2)}
Riscos e Fatores de Tensão Identificados: ${JSON.stringify(riscosIdentificados, null, 2)}

Sua tarefa:
1. Elaborar diagnóstico geral do setor.
2. Identificar exatamente os 3 RISCOS PSICOSSOCIAIS PRIORITÁRIOS (com Categoria, Severidade, Probabilidade, Nível de Risco e Justificativa).
3. Gerar um PLANO DE AÇÃO completo categorizado em:
   - Prevenção Primária (eliminar/reduzir na origem: mudanças organizacionais, desenho de trabalho)
   - Prevenção Secundária (fortalecer resistência do trabalhador: capacitação, liderança, pausas, suporte entre pares)
   - Prevenção Terciária (acolhimento, reabilitação, reintegração ao trabalho, suporte clínico)
4. Fornecer recomendação formal de alinhamento com a NR-01 e auditoria do MTE.

Retorne no formato JSON rigoroso:
{
  "diagnosticoGeral": string,
  "riscosPrioritarios": [
    {
      "id": string,
      "titulo": string,
      "categoria": string,
      "severidade": string,
      "probabilidade": string,
      "nivelRisco": string,
      "justificativa": string
    }
  ],
  "planoAcao": {
    "prevencaoPrimaria": [{ "acao": string, "responsavel": string, "prazo": string, "indicador": string }],
    "prevencaoSecundaria": [{ "acao": string, "responsavel": string, "prazo": string, "indicador": string }],
    "prevencaoTerciaria": [{ "acao": string, "responsavel": string, "prazo": string, "indicador": string }]
  },
  "alinhamentoPGR": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosticoGeral: { type: Type.STRING },
            riscosPrioritarios: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  titulo: { type: Type.STRING },
                  categoria: { type: Type.STRING },
                  severidade: { type: Type.STRING },
                  probabilidade: { type: Type.STRING },
                  nivelRisco: { type: Type.STRING },
                  justificativa: { type: Type.STRING },
                },
                required: ['id', 'titulo', 'categoria', 'severidade', 'probabilidade', 'nivelRisco', 'justificativa'],
              },
            },
            planoAcao: {
              type: Type.OBJECT,
              properties: {
                prevencaoPrimaria: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      acao: { type: Type.STRING },
                      responsavel: { type: Type.STRING },
                      prazo: { type: Type.STRING },
                      indicador: { type: Type.STRING },
                    },
                    required: ['acao', 'responsavel', 'prazo', 'indicador'],
                  },
                },
                prevencaoSecundaria: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      acao: { type: Type.STRING },
                      responsavel: { type: Type.STRING },
                      prazo: { type: Type.STRING },
                      indicador: { type: Type.STRING },
                    },
                    required: ['acao', 'responsavel', 'prazo', 'indicador'],
                  },
                },
                prevencaoTerciaria: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      acao: { type: Type.STRING },
                      responsavel: { type: Type.STRING },
                      prazo: { type: Type.STRING },
                      indicador: { type: Type.STRING },
                    },
                    required: ['acao', 'responsavel', 'prazo', 'indicador'],
                  },
                },
              },
              required: ['prevencaoPrimaria', 'prevencaoSecundaria', 'prevencaoTerciaria'],
            },
            alinhamentoPGR: { type: Type.STRING },
          },
          required: ['diagnosticoGeral', 'riscosPrioritarios', 'planoAcao', 'alinhamentoPGR'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      ...parsed,
    });
  } catch (error: any) {
    console.error('Erro na análise NR-01:', error);
    res.status(500).json({ error: error?.message || 'Falha ao processar análise NR-01' });
  }
});

// 4. Chat de Acolhimento Psicológico & Triagem (com limites éticos e orientação ao CVV 188)
app.post('/api/gemini/chat-acolhimento', async (req, res) => {
  try {
    const { mensagens, mensagemAtual, colaborador } = req.body;

    // Detecção heurística de ideação/crise severa para segurança imediata
    const textoBaixo = (mensagemAtual || '').toLowerCase();
    const criseSeveraDetectada =
      textoBaixo.includes('suicidio') ||
      textoBaixo.includes('suicídio') ||
      textoBaixo.includes('me matar') ||
      textoBaixo.includes('acabar com tudo') ||
      textoBaixo.includes('tirar minha vida') ||
      textoBaixo.includes('morrer') ||
      textoBaixo.includes('desistir da vida') ||
      textoBaixo.includes('machucar');

    if (!hasValidKey) {
      if (criseSeveraDetectada) {
        return res.json({
          success: true,
          isSimulated: true,
          alertaUrgente: true,
          resposta: `Sinto muito que você esteja passando por um sofrimento tão intenso agora. A sua vida tem valor e você não precisa carregar essa dor sozinho(a).

Como canal de triagem e acolhimento inicial, peço que busque apoio especializado imediatamente:
📞 **Ligue agora gratuitamente para o CVV: 188** (Centro de Valorização da Vida - atendimento anônimo e 24h por telefone ou em cvv.org.br).
🚨 Se estiver em perigo imediato, ligue para o **SAMU (192)** ou vá ao pronto-atendimento mais próximo.

Nossa equipe de saúde mental da empresa também está avisada para te acolher com sigilo absoluto. Você gostaria que eu solicite um contato emergencial de um profissional de saúde mental da empresa para você hoje?`,
          sugestoesRapidas: [
            'Ligar 188 (CVV)',
            'Falar com psicólogo da empresa',
            'Preciso de exercícios de respiração agora'
          ]
        });
      }

      return res.json({
        success: true,
        isSimulated: true,
        alertaUrgente: false,
        resposta: `Olá${colaborador?.nome ? `, ${colaborador.nome}` : ''}. Sou o assistente de acolhimento e escuta inicial do IAS Conecta.

Compreendo como a rotina e os desafios no trabalho podem gerar sobrecarga física e emocional. Quero que saiba que este é um espaço seguro e confidencial para você expressar o que está sentindo.

*Lembrando que este canal não substitui uma psicoterapia clínica formal ou atendimento médico, mas estou aqui para te ouvir, oferecer suporte inicial e te conectar com nossos profissionais de saúde mental, se você desejar.*

O que mais tem pesado no seu dia a dia ultimamente? Foi alguma situação específica de prazos, relações com a equipe ou cansaço acumulado?`,
        sugestoesRapidas: [
          'Sinto muita cobrança e prazos curtos',
          'Estou sem energia e com insônia',
          'Gostaria de agendar com o psicólogo',
          'Exercício rápido de respiração guiada'
        ]
      });
    }

    const systemInstruction = `Você é o Agente de Acolhimento e Triagem Emocional do IAS Conecta (Saúde Mental & SST NR-01).
Sua missão:
1. Oferecer escuta ativa, empática, acolhedora, respeitosa e sem julgamentos ao colaborador.
2. LIMITES ÉTICOS RÍGIDOS (Resolução do CFP - Conselho Federal de Psicologia):
   - Você NÃO diagnostica transtornos mentais (não diga 'você tem depressão/ansiedade clínica').
   - Você NÃO prescreve medicações.
   - Você NÃO faz psicoterapia aprofundada, mas sim Primeiros Socorros Psicológicos (PSP) e triagem.
   - Reforce com naturalidade o sigilo e o respeito aos sentimentos da pessoa.
3. PROTOCOLO DE URGÊNCIA / RISCO DE VIDA:
   - Se o usuário mencionar ideação suicida, desejo de morrer, automutilação ou desespero extremo:
     SEMPRE oriente com afeto e firmeza a ligar imediatamente para o CVV 188 (Centro de Valorização da Vida, ligação gratuita e 24h) ou SAMU 192, oferecendo também o plantão psicológico da empresa.
4. Forneça técnicas práticas e breves de alívio quando oportuno (ex: respiração diafragmática 4-4-6, pausa consciente).
5. Incentive o agendamento de uma sessão de acolhimento com os psicólogos da empresa disponíveis na plataforma IAS Conecta.

Nome do colaborador: ${colaborador?.nome || 'Colaborador'}
Setor: ${colaborador?.setor || 'Empresa'}`;

    const historicoFormatado = (mensagens || []).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Append current message
    historicoFormatado.push({
      role: 'user',
      parts: [{ text: mensagemAtual }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: historicoFormatado,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const textoGerado = response.text || '';
    const contemAlertaCVV =
      textoGerado.includes('188') ||
      textoGerado.toLowerCase().includes('cvv') ||
      criseSeveraDetectada;

    res.json({
      success: true,
      alertaUrgente: contemAlertaCVV,
      resposta: textoGerado,
      sugestoesRapidas: [
        'Agendar com psicólogo(a)',
        'Fazer exercício de respiração 4-7-8',
        'Dicas para organizar a rotina',
        'Conversar mais sobre isso'
      ],
    });
  } catch (error: any) {
    console.error('Erro no chat de acolhimento:', error);
    res.status(500).json({ error: error?.message || 'Falha ao processar mensagem de acolhimento' });
  }
});

// Configure Vite or Static Serve
async function setupServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`IAS Conecta server rodando na porta ${PORT}`);
  });
}

setupServer();
