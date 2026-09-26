import { StudySummary } from '../types';

export const SUMMARIES_DATA: StudySummary[] = [
  {
    id: 'resumo-gotejamento',
    title: 'Guia Definitivo: Cálculo de Medicamentos & Gotejamento',
    category: 'Farmacologia & Cálculos',
    readTime: '6 min de leitura',
    summary: 'Fórmulas essenciais de macrogotas e microgotas em horas e minutos, conversões de insulina e regra de três.',
    content: {
      introduction: 'O cálculo de gotejamento e administração de medicamentos é um dos tópicos mais frequentes e decisivos em provas de concursos públicos e residências na área da Enfermagem. Erros de cálculo comprometem diretamente a segurança do paciente.',
      points: [
        {
          subtitle: '1. Fórmulas de Gotejamento em HORAS',
          details: [
            'Macrogotas (Gotas/min) = Volume Total (mL) ÷ (Tempo em horas × 3)',
            'Microgotas (Microgotas/min) = Volume Total (mL) ÷ Tempo em horas',
            'Relação básica de equivalência: 1 mL = 20 gotas = 60 microgotas.',
            'Lembrete: 1 gota equivale exatamente a 3 microgotas.'
          ],
          tip: 'Dica de ouro: Se você já calculou as gotas por minuto, basta multiplicar por 3 para achar as microgotas!'
        },
        {
          subtitle: '2. Fórmulas de Gotejamento em MINUTOS',
          details: [
            'Gotas/minuto = (Volume em mL × 20) ÷ Tempo em minutos',
            'Microgotas/minuto = (Volume em mL × 60) ÷ Tempo em minutos'
          ],
          tip: 'Exemplo: 100 mL de antibiótico em 30 min em macrogotas -> (100 × 20) ÷ 30 = 2000 ÷ 30 = 66,6 -> 67 gotas/min.'
        },
        {
          subtitle: '3. Cálculo de Insulina (Quando falta seringa própria)',
          details: [
            'Frasco padrão U-100 contém 100 UI a cada 1 mL.',
            'Se a seringa disponível for de 1 mL, 3 mL ou 5 mL, aplique a proporção direta:',
            'Frasco disponível (100 UI) ---- 1 mL',
            'Prescrição médica (ex: 25 UI) ---- X mL',
            'X = 25 ÷ 100 = 0,25 mL a ser aspirado.'
          ],
          tip: 'Atenção redobrada na leitura dos traços na seringa de insulina para evitar hipoglicemia severa.'
        },
        {
          subtitle: '4. Ângulos de Injeções Parenterais',
          details: [
            'Intradérmica (ID): 10° a 15° (bisel para cima, formação de pápula).',
            'Subcutânea (SC): 45° (agulha normal) ou 90° (agulhas curtas 4mm/6mm).',
            'Intramuscular (IM): 90° estrito (profundo).',
            'Endovenosa (EV): 15° a 30° com refluxo sanguíneo.'
          ]
        }
      ],
      tableData: {
        headers: ['Via', 'Ângulo de Inserção', 'Volume Máximo', 'Locais Preferenciais'],
        rows: [
          ['Intradérmica (ID)', '10° a 15°', '0,1 a 0,5 mL', 'Face anterior do antebraço, região deltoide'],
          ['Subcutânea (SC)', '45° ou 90°', 'Até 1,5 mL', 'Abdômen peri-umbilical, face externa do braço, coxa'],
          ['Intramuscular (IM)', '90°', '2 mL (Deltoide) / 4-5 mL (Glúteos)', 'Ventroglúteo (Hochstetter), Vasto lateral, Deltoide'],
          ['Endovenosa (EV)', '15° a 30°', 'Variável (conforme prescrição)', 'Veias cefálica, basílica, intermédia do antebraço']
        ]
      },
      goldenRule: 'Na dúvida com equações de dosagens, use a regra de três clássica: Linha 1 = Apresentação disponível no rótulo; Linha 2 = Prescrição do médico. Multiplique cruzado e confira sempre com a checagem dupla!'
    },
    isRead: false
  },
  {
    id: 'resumo-rcp-aha',
    title: 'Protocolo de PCR & Suporte Básico de Vida (AHA Atualizado)',
    category: 'Urgência & Emergência',
    readTime: '7 min de leitura',
    summary: 'Cadeia de sobrevivência, compressões de alta qualidade, manuseio do DEA e ritmos chocáveis vs não chocáveis.',
    content: {
      introduction: 'A ressuscitação cardiopulmonar (RCP) de alta qualidade é o fator mais determinante para a sobrevida com bom prognóstico neurológico de pacientes vítimas de Parada Cardiorrespiratória (PCR). As diretrizes da American Heart Association (AHA) balizam todas as bancas de concurso.',
      points: [
        {
          subtitle: '1. Parâmetros da Compressão de Alta Qualidade no Adulto',
          details: [
            'Frequência: 100 a 120 compressões por minuto.',
            'Profundidade: No mínimo 5 cm (2 polegadas) e no máximo 6 cm (2,4 polegadas).',
            'Retorno: Permitir o retorno elástico completo do tórax após cada compressão, sem apoiar o peso sobre o peito.',
            'Interrupções: Minimizar interrupções nas compressões (fração de compressão > 60-80%).',
            'Ventilações: Evitar hiperventilação. Relação 30 compressões para 2 ventilações (30:2) sem via aérea avançada.',
            'Troca de socorrista: A cada 2 minutos (5 ciclos) para evitar fadiga e perda de profundidade.'
          ],
          tip: 'No ritmo de "Stayin\' Alive" dos Bee Gees ou "Outro Bloco da Folia", garantindo o tempo de enchimento ventricular.'
        },
        {
          subtitle: '2. Ritmos de PCR Chocáveis vs Não Chocáveis',
          details: [
            'CHOCÁVEIS (Tratamento: Desfibrilação precoce + RCP imediata):',
            '• Fibrilação Ventricular (FV): traçado caótico, sem complexo QRS organizado.',
            '• Taquicardia Ventricular sem Pulso (TVsp): complexos QRS largos e regulares rápidos sem pulso periférico.',
            'NÃO CHOCÁVEIS (Tratamento: RCP imediata + Epinefrina precoce + Tratar causas 5Hs e 5Ts):',
            '• Assistolia: linha isoelétrica em pelo menos duas derivações (Protocolo da Linha Reta: checar cabos, ganho e derivações).',
            '• Atividade Elétrica Sem Pulso (AESP): qualquer ritmo elétrico organizado no monitor, porém com ausência de pulso palpável.'
          ]
        },
        {
          subtitle: '3. Medicamentos no Suporte Avançado de Vida (SAVC/ACLS)',
          details: [
            'Epinefrina (Adrenalina): 1 mg IV/IO a cada 3 a 5 minutos (na Assistolia/AESP dar o mais rápido possível; na FV/TVsp após o 2º choque).',
            'Amiodarona: 1ª dose 300 mg em bolus rápido após o 3º choque; 2ª dose 150 mg.',
            'Lidocaína (alternativa à Amiodarona): 1ª dose 1 a 1,5 mg/kg; doses seguintes 0,5 a 0,75 mg/kg.'
          ]
        },
        {
          subtitle: '4. As Causas Reversíveis da PCR: Os 5Hs e 5Ts',
          details: [
            '5 Hs: Hipovolemia, Hipóxia, Hidrogênio (acidose), Hipo/Hipercalemia, Hipotermia.',
            '5 Ts: Tensão no tórax (pneumotórax hipertensivo), Tamponamento cardíaco, Toxinas (overdose), Trombose coronária (IAM), Trombose pulmonar (TEP).'
          ]
        }
      ],
      tableData: {
        headers: ['Condição', 'Adulto (1 ou 2 socorristas)', 'Criança / Bebê (1 socorrista)', 'Criança / Bebê (2 socorristas)'],
        rows: [
          ['Relação Compressão / Ventilação', '30 : 2', '30 : 2', '15 : 2'],
          ['Profundidade de Compressão', '5 a 6 cm', 'Cerca de 5 cm (1/3 do diâmetro)', 'Cerca de 4 cm (1/3 do diâmetro)'],
          ['Checagem de Pulso (máx 10 seg)', 'Carotídeo', 'Carotídeo ou Femoral', 'Braquial (no lactente)']
        ]
      },
      goldenRule: 'O DEA chegou? Abra e ligue imediatamente! Siga os comandos de voz sem hesitar. NUNCA toque no paciente enquanto o aparelho analisa o ritmo ou carrega/administra o choque.'
    },
    isRead: false
  },
  {
    id: 'resumo-leis-sus',
    title: 'Leis Orgânicas do SUS: Lei 8.080/90 e Lei 8.142/90 Mastigadas',
    category: 'SUS & Legislação',
    readTime: '8 min de leitura',
    summary: 'Princípios doutrinários e organizativos, competências das 3 esferas, Conselhos de Saúde e transferências intergovernamentais.',
    content: {
      introduction: 'O Sistema Único de Saúde (SUS) foi criado pela Constituição de 1988 e regulamentado pelas Leis Federais nº 8.080 e nº 8.142 de 1990. Conhecer a diferença entre princípios doutrinários e organizativos é a garantia de gabaritar qualquer prova.',
      points: [
        {
          subtitle: '1. Princípios Doutrinários (Ideológicos)',
          details: [
            'Universalidade: A saúde é um direito de todos e dever do Estado; todo cidadão tem acesso aos serviços sem distinção de raça, classe, renda ou vínculo previdenciário.',
            'Integralidade: O indivíduo é atendido em sua totalidade, integrando ações preventivas, curativas e reabilitadoras em todos os níveis de complexidade.',
            'Equidade: Tratar os desiguais conforme suas desigualdades, priorizando quem mais necessita para reduzir vulnerabilidades sociais.'
          ],
          tip: 'Mnemônico: "U - E - I" = Universalidade, Equidade, Integralidade.'
        },
        {
          subtitle: '2. Princípios Organizativos / Operacionais',
          details: [
            'Descentralização com direção única em cada esfera de governo (União: Ministério da Saúde; Estados: Secretaria Estadual; Municípios: Secretaria Municipal).',
            'Regionalização e Hierarquização dos serviços (portas de entrada organizadas em níveis crescentes de densidade tecnológica).',
            'Participação da Comunidade / Controle Social (Conselhos e Conferências de Saúde).'
          ]
        },
        {
          subtitle: '3. A Lei 8.142/1990 em Detalhes',
          details: [
            'Dispõe sobre: 1) Participação da comunidade na gestão do SUS; 2) Transferências intergovernamentais de recursos financeiros da saúde.',
            'Conselhos de Saúde: caráter deliberativo permanente, atuam na formulação de estratégias e controle da execução econômica/financeira da saúde.',
            'Composição paritária dos Conselhos (50% usuários, 25% trabalhadores de saúde, 25% gestores/prestadores de serviço).',
            'Conferências de Saúde: reúnem-se a cada 4 anos com ampla representação para avaliar o quadro sanitário e propor diretrizes.'
          ]
        },
        {
          subtitle: '4. Participação Complementar do Setor Privado',
          details: [
            'O setor privado só pode atuar no SUS de forma complementar quando a rede pública for insuficiente.',
            'Formalização: mediante Contrato de Direito Público ou Convênio.',
            'Prioridade expressa por lei: Entidades filantrópicas e entidades sem fins lucrativos.'
          ]
        }
      ],
      tableData: {
        headers: ['Instância Colegiada', 'Periodicidade', 'Caráter', 'Composição de Usuários'],
        rows: [
          ['Conselho de Saúde', 'Reuniões mensais ordinárias', 'Permanente e Deliberativo', '50% (Paritário)'],
          ['Conferência de Saúde', 'A cada 4 anos', 'Convocatória para diretrizes', '50% (Paritário)']
        ]
      },
      goldenRule: 'Lembre-se sempre: Lei 8.080/90 trata de condições de promoção/proteção, organização e atribuições dos entes; Lei 8.142/90 trata de Controle Social (Conselhos/Conferências) e Dinheiro (Repasses Fundo a Fundo).'
    },
    isRead: false
  },
  {
    id: 'resumo-vacinacao-sus',
    title: 'Calendário Nacional de Imunização & Rede de Frio',
    category: 'Saúde Coletiva & Vacinas',
    readTime: '6 min de leitura',
    summary: 'Cronograma vacinal de 0 a 12 meses, vacinas atenuadas vs inativadas, atualização da VIP e manejo térmico seguro.',
    content: {
      introduction: 'O Programa Nacional de Imunizações (PNI) do Brasil é referência mundial. Em concursos, as questões costumam focar em faixas etárias, vias de aplicação, substituição de esquemas vacinais (como a transição da VOP para VIP) e temperaturas da Rede de Frio.',
      points: [
        {
          subtitle: '1. Vacinas ao Nascer e Primeiros Meses',
          details: [
            'Ao Nascer (Maternidade): BCG (Dose única, 0,1 mL Intradérmica no braço direito) + Hepatite B (Dose ao nascer, IM no vasto lateral).',
            '2 Meses: Pentavalente (1ª dose), VIP (1ª dose), Pneumocócica 10v (1ª dose), Rotavírus (1ª dose oral).',
            '3 Meses: Meningocócica C (1ª dose).',
            '4 Meses: Pentavalente (2ª dose), VIP (2ª dose), Pneumo 10v (2ª dose), Rotavírus (2ª dose).',
            '5 Meses: Meningocócica C (2ª dose).',
            '6 Meses: Pentavalente (3ª dose), VIP (3ª dose), Covid-19 conforme faixa etária.'
          ],
          tip: 'Aos 2, 4 e 6 meses o bebê toma o famoso quarteto: Penta + VIP + Pneumo 10 + Rotavírus (aos 6 meses sem rotavírus).'
        },
        {
          subtitle: '2. Atualização Histórica da Poliomielite',
          details: [
            'O Ministério da Saúde substituiu integralmente a vacina oral em gotas (VOP - atenuada) pela Vacina Inativada contra a Poliomielite (VIP - injetável).',
            'Isso previne qualquer risco residual de paralisia flácida associada ao vírus atenuado da vacina.'
          ]
        },
        {
          subtitle: '3. Aos 12 e 15 Meses de Vida',
          details: [
            '12 Meses: Tríplice Viral (Sarampo, Caxumba, Rubéola - 1ª dose), Pneumocócica 10v (Reforço), Meningocócica C (Reforço).',
            '15 Meses: DTP (1º reforço), VIP (reforço injetável), Hepatite A (Dose única), Tetraviral ou Tríplice Viral + Varicela.'
          ]
        },
        {
          subtitle: '4. Regras Críticas da Rede de Frio',
          details: [
            'Faixa aceitável de temperatura: +2 °C a +8 °C (Temperatura ideal e padrão: +5 °C).',
            'Termômetro digital de máxima e mínima inspecionado e anotado 2x ao dia (início e fim do expediente).',
            'NUNCA colocar vacinas na porta da geladeira nem congelar vacinas adsorvidas (como Penta e Hepatite B).'
          ]
        }
      ],
      tableData: {
        headers: ['Idade', 'Imunobiológico', 'Via', 'Doenças Protegidas'],
        rows: [
          ['Ao nascer', 'BCG', 'Intradérmica (0,1 mL)', 'Tuberculose (miliar e meníngea)'],
          ['Ao nascer', 'Hepatite B', 'Intramuscular profunda', 'Hepatite viral B'],
          ['2, 4 e 6 meses', 'Pentavalente', 'Intramuscular (vasto lateral)', 'Difteria, Tétano, Coqueluche, Hep B, Hib'],
          ['12 meses', 'Tríplice Viral (SCR)', 'Subcutânea', 'Sarampo, Caxumba, Rubéola'],
          ['9 a 14 anos', 'HPV Quadrivalente', 'Intramuscular', 'HPV 6, 11, 16 e 18 em dose única']
        ]
      },
      goldenRule: 'Vacinas vivas atenuadas (BCG, Rotavírus, Febre Amarela, Tríplice Viral, Varicela) são em geral contraindicadas para gestantes e pacientes com imunossupressão grave!'
    },
    isRead: false
  },
  {
    id: 'resumo-manchester-triagem',
    title: 'Protocolo de Manchester & Acolhimento com Classificação de Risco',
    category: 'Urgência & Emergência',
    readTime: '5 min de leitura',
    summary: 'Cores, tempos de espera máximos, discriminadores gerais e específicos para triagem assertiva.',
    content: {
      introduction: 'O Sistema de Triagem de Manchester (STM) é o método de classificação de risco mais utilizado em serviços de urgência e emergência no Brasil, priorizando os atendimentos com base na gravidade clínica e não na ordem de chegada.',
      points: [
        {
          subtitle: '1. As 5 Cores e Tempos-Alvo de Espera',
          details: [
            '🔴 VERMELHO (Emergência): Risco imediato de morte. Tempo de espera: 0 minutos (Atendimento IMEDIATO).',
            '🟠 LARANJA (Muito Urgente): Risco iminente de perda de função de órgão ou vida. Tempo de espera: até 10 minutos.',
            '🟡 AMARELO (Urgente): Gravidade moderada que necessita de intervenção rápida. Tempo de espera: até 60 minutos.',
            '🟢 VERDE (Pouco Urgente): Condições estáveis sem risco de agravamento agudo. Tempo de espera: até 120 minutos.',
            '🔵 AZUL (Não Urgente): Condição crônica ou de baixa complexidade compatível com UBS. Tempo de espera: até 240 minutos.'
          ],
          tip: 'Mnemônico dos tempos: 0 -> 10 min -> 1h (60 min) -> 2h (120 min) -> 4h (240 min).'
        },
        {
          subtitle: '2. Discriminadores Gerais Críticos',
          details: [
            'Comprometimento de via aérea (estridor, corpo estranho) -> Vermelho.',
            'Respiração inadequada ou choque evidente -> Vermelho.',
            'Dor severa de início súbito ou perda súbita de consciência -> Laranja.',
            'Dor moderada recente ou hemorragia menor controlada -> Amarelo.'
          ]
        }
      ],
      tableData: {
        headers: ['Cor', 'Prioridade Clínica', 'Tempo Máximo de Espera', 'Exemplo Clínico'],
        rows: [
          ['Vermelho', 'Emergência', '0 minutos (Imediato)', 'PCR, choque anafilático, TCE com Glasgow < 9'],
          ['Laranja', 'Muito Urgente', 'Até 10 minutos', 'Dor torácica típica com suspeita de IAM, AVC agudo'],
          ['Amarelo', 'Urgente', 'Até 60 minutos', 'Febre alta em idoso, cólica renal intensa'],
          ['Verde', 'Pouco Urgente', 'Até 120 minutos', 'Entorse de tornozelo leve, vômito isolado'],
          ['Azul', 'Não Urgente', 'Até 240 minutos', 'Troca de receita, queixa crônica há meses']
        ]
      },
      goldenRule: 'Na triagem de Manchester, havendo dúvida entre dois níveis de gravidade para o mesmo discriminador, o enfermeiro deve sempre classificar o paciente no nível de MAIOR prioridade (princípio da segurança do paciente).'
    },
    isRead: false
  },
  {
    id: 'resumo-curativos-feridas',
    title: 'Tratamento de Feridas: Coberturas & Estágios de Lesão por Pressão',
    category: 'Médico-Cirúrgica',
    readTime: '6 min de leitura',
    summary: 'Indicações de Hidrogel, Alginato de Cálcio, Placas de Hidrocoloide, Bota de Unna e classificação NPUAP.',
    content: {
      introduction: 'O tratamento de feridas e lesões por pressão (LPP) é atribuição central da enfermagem. Saber escolher a cobertura correta de acordo com a quantidade de exsudato e tipo de tecido é cobrado exaustivamente em concursos.',
      points: [
        {
          subtitle: '1. Classificação das Lesões por Pressão (NPUAP/EPUAP)',
          details: [
            'Estágio 1: Pele intacta com eritema que não empalidece à pressão em proeminência óssea.',
            'Estágio 2: Perda de espessura parcial da pele com derme exposta; leito rosa/vermelho ou bolha (flictena) íntegra ou rota.',
            'Estágio 3: Perda total da espessura da pele; tecido adiposo visível, esfacelos ou epíbole. Músculo/osso NÃO expostos.',
            'Estágio 4: Perda total da espessura com exposição direta de fáscia, músculo, tendão ou osso.',
            'Não Classificável: Base da lesão totalmente coberta por esfacelo espesso ou escara preta que impede mensurar a profundidade.',
            'Lesão por Pressão Tissular Profunda: Pele intacta ou não, com coloração vermelho-escura, marrom ou púrpura persistente que não embranquece.'
          ]
        },
        {
          subtitle: '2. Guia de Escolha das Principais Coberturas',
          details: [
            'Hidrogel amorfo: Feridas secas com necrose ou esfacelo (promove desbridamento autolítico por umidificação).',
            'Alginato de Cálcio: Feridas com média a ALTA quantidade de exsudato; tem ação hemostática leve.',
            'Placa de Hidrocoloide: Feridas com pouca ou moderada exsudação e feridas limpas sem infecção (não usar em anaeróbios).',
            'Carvão Ativado com Prata: Feridas infectadas ou colonizadas criticamente com ODOR fétido acentuado.',
            'Espuma de Poliuretano (Hydrocellular): Excelente para absorção de exsudato moderado e acolchoamento de proeminências.',
            'Sulfadiazina de Prata 1%: Queimaduras térmicas e químicas para controle antimicrobiano profilático.'
          ]
        }
      ],
      tableData: {
        headers: ['Tipo de Tecido / Exsudato', 'Cobertura Primária Indicada', 'Mecanismo de Ação'],
        rows: [
          ['Tecido necrótico seco (escara)', 'Hidrogel amorfo', 'Doa água e amolece a necrose (autólise)'],
          ['Exsudato abundante purulento', 'Alginato de cálcio / Espuma', 'Absorve exsudato e forma gel contido'],
          ['Ferida com mau odor infectada', 'Carvão ativado com prata', 'Prata bactericida + Carvão retém o odor'],
          ['Prevenção de atrito em Estágio 1', 'Filme transparente / Placa hidrocoloide', 'Barreira mecânica contra cisalhamento']
        ]
      },
      goldenRule: 'Regra de ouro das coberturas: O que está seco, hidrate (Hidrogel); o que está muito úmido, absorva (Alginato/Espuma); o que está fedendo ou infectado, combata (Prata e Carvão)!'
    },
    isRead: false
  }
];
