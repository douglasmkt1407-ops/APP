import { SprintDay } from '../types';

export const INITIAL_SPRINT_DAYS: SprintDay[] = [
  {
    dayNumber: 1,
    dayTitle: 'Dia 1: Fundamentos & Domínio de Sinais Vitais',
    theme: 'Fundamentos de Enfermagem',
    focusBadge: 'Base Estrutural',
    description: 'Inicie sua jornada dominando valores de referência de pulso, PA, respiração, posicionamentos no leito e sondagens.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d1-t1',
        title: 'Estudar os 15 Flashcards de Fundamentos',
        description: 'Revise os cartões de sinais vitais, posições anatômicas e técnicas de sondagem vesical e gástrica.',
        actionView: 'cards',
        actionParams: { category: 'Fundamentos de Enfermagem' },
        completed: false
      },
      {
        id: 'sprint-d1-t2',
        title: 'Ler o Resumo: Sinais Vitais & Cuidados Clínicos',
        description: 'Fixe as escalas e terminologias essenciais (Bradipneia, Cheyne-Stokes, Normocardia).',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-gotejamento' },
        completed: false
      },
      {
        id: 'sprint-d1-t3',
        title: 'Realizar o Simulado 01 (10 Questões)',
        description: 'Teste seus conhecimentos no Simulado 01 com 2 questões fáceis, 3 médias e 5 difíceis.',
        actionView: 'questoes',
        actionParams: { simuladoId: 1 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 2,
    dayTitle: 'Dia 2: Cálculo de Medicamentos & Farmacologia Rápida',
    theme: 'Farmacologia & Cálculos',
    focusBadge: 'Sem Medo da Matemática',
    description: 'Destrinche fórmulas de gotas e microgotas em horas e minutos, dosagens de heparina, insulina e os 9 certos.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d2-t1',
        title: 'Ler o Resumo Express: Cálculo de Gotejamento',
        description: 'Compreenda a dedução das fórmulas e regras de conversão de volume.',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-gotejamento' },
        completed: false
      },
      {
        id: 'sprint-d2-t2',
        title: 'Dominar os 15 Flashcards de Farmacologia',
        description: 'Pratique cálculo de seringas, vias ID/SC/IM/EV e antídotos de emergência.',
        actionView: 'cards',
        actionParams: { category: 'Farmacologia & Cálculos' },
        completed: false
      },
      {
        id: 'sprint-d2-t3',
        title: 'Executar o Simulado 02 (10 Questões Calibradas)',
        description: 'Resolva questões práticas de concurso de reconstituição e diluição.',
        actionView: 'questoes',
        actionParams: { simuladoId: 2 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 3,
    dayTitle: 'Dia 3: Urgência, Emergência & Protocolo de RCP (AHA)',
    theme: 'Urgência & Emergência',
    focusBadge: 'Salva-Vidas',
    description: 'Imersão no protocolo de Parada Cardiorrespiratória, ritmos chocáveis, DEA, Glasgow-P e conduta em choques.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d3-t1',
        title: 'Leitura Focada: Protocolo AHA de RCP & SBV',
        description: 'Memorize as taxas de compressão (100-120/min), profundidade (5-6cm) e drogas vasoativas.',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-rcp-aha' },
        completed: false
      },
      {
        id: 'sprint-d3-t2',
        title: 'Praticar os 15 Flashcards de Urgência & Choque',
        description: 'Treine a regra dos nove de Wallace, manobra de Heimlich e escala de Cincinnati.',
        actionView: 'cards',
        actionParams: { category: 'Urgência & Emergência' },
        completed: false
      },
      {
        id: 'sprint-d3-t3',
        title: 'Batalha do Simulado 03 (PCR & Trauma)',
        description: 'Encare as 10 questões com foco em casos clínicos de pronto-socorro.',
        actionView: 'questoes',
        actionParams: { simuladoId: 3 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 4,
    dayTitle: 'Dia 4: Legislação do SUS & Código de Ética Profissional',
    theme: 'SUS & Legislação',
    focusBadge: 'Gabaritando Legislação',
    description: 'Fixação das Leis 8.080/90 e 8.142/90, princípios do SUS, Resolução COFEN 564/2017 e competências da equipe.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d4-t1',
        title: 'Estudo do Resumo: Leis 8.080 e 8.142 Mastigadas',
        description: 'Fixe a paridade dos Conselhos de Saúde e os princípios U-E-I.',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-leis-sus' },
        completed: false
      },
      {
        id: 'sprint-d4-t2',
        title: 'Revisão dos 15 Flashcards de SUS & Ética',
        description: 'Diferencie deveres, direitos, proibições e penalidades do COFEN/COREN.',
        actionView: 'cards',
        actionParams: { category: 'SUS & Legislação' },
        completed: false
      },
      {
        id: 'sprint-d4-t3',
        title: 'Realização do Simulado 04 (Legislação SUS)',
        description: 'Resolva 10 questões com foco nas bancas mais cobradas do país.',
        actionView: 'questoes',
        actionParams: { simuladoId: 4 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 5,
    dayTitle: 'Dia 5: Biossegurança, CCIH & Processamento CME',
    theme: 'Biossegurança & Infecção',
    focusBadge: 'Controle de Infecção',
    description: 'Precauções de contato, gotículas e aerossóis, higienização das mãos, autoclave e classificação de Spaulding.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d5-t1',
        title: 'Estudar os 15 Flashcards de Biossegurança',
        description: 'Memorize os 5 momentos de higienização das mãos e descarte de perfurocortantes Grupo E.',
        actionView: 'cards',
        actionParams: { category: 'Biossegurança & Infecção' },
        completed: false
      },
      {
        id: 'sprint-d5-t2',
        title: 'Revisar Tipos de Máscaras e Desparamentação',
        description: 'Fixe quando usar N95/PFF2 (Tuberculose/Sarampo) versus máscara cirúrgica (Meningite/Gripe).',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-manchester-triagem' },
        completed: false
      },
      {
        id: 'sprint-d5-t3',
        title: 'Fazer o Simulado 05 (CCIH e Esterilização)',
        description: 'Enfrente 10 questões envolvendo indicadores biológicos Geobacillus e NR-32.',
        actionView: 'questoes',
        actionParams: { simuladoId: 5 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 6,
    dayTitle: 'Dia 6: Saúde da Mulher, Criança & Imunização SUS',
    theme: 'Materno-Infantil & Vacinas',
    focusBadge: 'Ciclo da Vida',
    description: 'Cálculo de DPP por Naegele, Escala de Apgar, pré-eclâmpsia e Calendário Nacional de Imunização.',
    targetCards: 15,
    completed: false,
    tasks: [
      {
        id: 'sprint-d6-t1',
        title: 'Leitura do Resumo: Calendário de Vacinação SUS',
        description: 'Revise o esquema das vacinas ao nascer, 2, 4, 6, 12 e 15 meses e a regra da VIP.',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-vacinacao-sus' },
        completed: false
      },
      {
        id: 'sprint-d6-t2',
        title: 'Revisar Flashcards de Saúde da Mulher & Apgar',
        description: 'Treine os 5 parâmetros do Apgar e o manejo de sulfato de magnésio na eclâmpsia.',
        actionView: 'cards',
        actionParams: { category: 'Saúde da Mulher & Criança' },
        completed: false
      },
      {
        id: 'sprint-d6-t3',
        title: 'Executar o Simulado 06 ou 07',
        description: 'Teste sua retenção em obstetrícia e neonatologia.',
        actionView: 'questoes',
        actionParams: { simuladoId: 6 },
        completed: false
      }
    ]
  },
  {
    dayNumber: 7,
    dayTitle: 'Dia 7: Grande Simulado Geral & Consolidação Final',
    theme: 'Simulado Geral Integrado',
    focusBadge: 'Aprovação em Foco',
    description: 'O grande teste! Integre todos os conhecimentos acumulados na semana e celebre o cumprimento da sua meta.',
    targetCards: 20,
    completed: false,
    tasks: [
      {
        id: 'sprint-d7-t1',
        title: 'Revisão Rápida dos Flashcards Marcados com Dificuldade',
        description: 'Passe pelos cartões que você ainda não domina 100%.',
        actionView: 'cards',
        completed: false
      },
      {
        id: 'sprint-d7-t2',
        title: 'Ler o Resumo: Feridas & Coberturas',
        description: 'Consolide as indicações de Hidrogel, Alginato de Cálcio e estágios de LPP.',
        actionView: 'resumos',
        actionParams: { summaryId: 'resumo-curativos-feridas' },
        completed: false
      },
      {
        id: 'sprint-d7-t3',
        title: 'Completar o Simulado 10 Geral de Concursos',
        description: 'Encerre o Sprint com o Simulado Geral Integrado de 10 questões de alto nível.',
        actionView: 'questoes',
        actionParams: { simuladoId: 10 },
        completed: false
      }
    ]
  }
];
