import { Simulado } from '../types';

export const SIMULADOS_DATA: Simulado[] = [
  // ==========================================
  // SIMULADO 01: Fundamentos & Sinais Vitais
  // ==========================================
  {
    id: 1,
    title: 'Simulado 01 - Fundamentos & Sinais Vitais',
    description: 'Avaliação de parâmetros vitais, posições anatômicas, sondagens e registros de enfermagem.',
    focusArea: 'Fundamentos de Enfermagem',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 101,
        simuladoId: 1,
        difficulty: 'facil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Durante a aferição dos sinais vitais de um adulto jovem em repouso, o técnico de enfermagem registra frequência cardíaca de 76 bpm e frequência respiratória de 16 rpm. Esses achados caracterizam-se, respectivamente, como:',
        options: [
          { letter: 'A', text: 'Bradicardia e Taquipneia.' },
          { letter: 'B', text: 'Normocardia (Eucardia) e Eupneia.' },
          { letter: 'C', text: 'Taquicardia e Bradipneia.' },
          { letter: 'D', text: 'Normocardia e Dispneia suspirosa.' }
        ],
        correctAnswer: 'B',
        explanation: 'Em adultos em repouso, a frequência cardíaca normal situa-se entre 60 e 100 bpm (normocardia/eucardia) e a frequência respiratória normal entre 12 e 20 rpm (eupneia).'
      },
      {
        id: 102,
        simuladoId: 1,
        difficulty: 'facil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Para a realização de sondagem retal ou enteroclisma (lavagem intestinal), qual posição o paciente deve assumir no leito?',
        options: [
          { letter: 'A', text: 'Posição de Fowler a 90 graus.' },
          { letter: 'B', text: 'Posição de Trendelenburg com membros inferiores elevados.' },
          { letter: 'C', text: 'Posição de Sims (decúbito lateral esquerdo com perna direita fletida).' },
          { letter: 'D', text: 'Posição genupeitoral com apoio ventral.' }
        ],
        correctAnswer: 'C',
        explanation: 'A posição de Sims em decúbito lateral esquerdo alinha a curvatura anatômica natural do cólon sigmoide e do reto, facilitando a introdução da sonda e fluxo da solução.'
      },
      // 3 MÉDIAS
      {
        id: 103,
        simuladoId: 1,
        difficulty: 'media',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Ao instalar uma Sonda Vesical de Demora (Foley), o profissional de enfermagem deve insuflar o balonete de retenção. O líquido obrigatoriamente indicado para essa finalidade e a respectiva justificativa técnica são:',
        options: [
          { letter: 'A', text: 'Soro fisiológico 0,9%, pois é uma solução isotônica que não agride o epitélio vesical.' },
          { letter: 'B', text: 'Água destilada estéril, pois o cloreto de sódio pode precipitar e cristalizar na via valvular, impedindo a desinsuflação futura.' },
          { letter: 'C', text: 'Glicerina líquida estéril, garantindo a lubrificação contínua da uretra prostática.' },
          { letter: 'D', text: 'Ar ambiente esterilizado, para manter o balonete leve e sem tensão sobre o trígono vesical.' }
        ],
        correctAnswer: 'B',
        explanation: 'Usa-se exclusivamente água destilada estéril. O soro fisiológico forma microcristais de cloreto de sódio que obstruem a válvula de desinsuflação, provocando retenção da sonda na hora da retirada.'
      },
      {
        id: 104,
        simuladoId: 1,
        difficulty: 'media',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Um paciente internado na clínica médica apresenta volume urinário de 280 mL acumulado nas últimas 24 horas. Na evolução de enfermagem, esse achado semiológico deve ser registrado com o termo técnico:',
        options: [
          { letter: 'A', text: 'Anúria patológica.' },
          { letter: 'B', text: 'Poliúria compensatória.' },
          { letter: 'C', text: 'Oligúria.' },
          { letter: 'D', text: 'Disúria de esforço.' }
        ],
        correctAnswer: 'C',
        explanation: 'Oligúria é a diminuição do volume urinário para valores entre 100 mL e 400-500 mL em 24 horas. Anúria é volume inferior a 100 mL/24h.'
      },
      {
        id: 105,
        simuladoId: 1,
        difficulty: 'media',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Na aferição indireta da Pressão Arterial com esfigmomanômetro aneroide, o que determina o valor da Pressão Arterial Sistólica (PAS) e Diastólica (PAD), respectivamente, de acordo com as Diretrizes Brasileiras de Hipertensão Arterial?',
        options: [
          { letter: 'A', text: 'Fase I de Korotkoff (aparecimento do primeiro som) e Fase V de Korotkoff (desaparecimento completo dos sons).' },
          { letter: 'B', text: 'Fase II de Korotkoff (abafamento do som) e Fase IV de Korotkoff.' },
          { letter: 'C', text: 'Fase III de Korotkoff (sons nítidos e fortes) e Fase IV de Korotkoff.' },
          { letter: 'D', text: 'Fase I de Korotkoff e Fase III de Korotkoff.' }
        ],
        correctAnswer: 'A',
        explanation: 'A Fase I marca o primeiro ruído audível (Pressão Sistólica) e a Fase V marca o desaparecimento total dos ruídos de Korotkoff (Pressão Diastólica).'
      },
      // 5 DIFÍCEIS
      {
        id: 106,
        simuladoId: 1,
        difficulty: 'dificil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Paciente idoso em pós-operatório ortopédico recebe oxigênio sob máscara de Venturi. Ao conferir a prescrição, o técnico identifica indicação de FiO2 a 50%. De acordo com o código de cores e diluição padrão dos dispositivos de Venturi, qual o fluxo de O2 (L/min) e a cor do adaptador correspondente recomendados pelos fabricantes?',
        options: [
          { letter: 'A', text: 'Adaptador azul a 4 L/min (FiO2 24%).' },
          { letter: 'B', text: 'Adaptador amarelo a 6 L/min (FiO2 28%).' },
          { letter: 'C', text: 'Adaptador laranja a 12 L/min (FiO2 50%).' },
          { letter: 'D', text: 'Adaptador verde a 15 L/min (FiO2 60%).' }
        ],
        correctAnswer: 'C',
        explanation: 'No sistema de Venturi padrão: Azul = 24% (4L), Amarelo = 28% (6L), Branco = 31% (8L), Verde = 35% (8L), Rosa = 40% (10L), Laranja = 50% (12L).'
      },
      {
        id: 107,
        simuladoId: 1,
        difficulty: 'dificil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'A ausculta do ruído hidroaéreo epigástrico após insuflação de ar através de sonda nasogástrica (SNG) tem sido amplamente discutida na literatura especializada. Segundo as recomendações de segurança do paciente vigentes do Ministério da Saúde e do COFEN, qual é o método padrão-ouro e mandatório para certificar o posicionamento da extremidade distal da sonda antes de iniciar a nutrição enteral?',
        options: [
          { letter: 'A', text: 'Apenas a aspiração de resíduo com aspecto bilioso esverdeado.' },
          { letter: 'B', text: 'Mergulhar a ponta proximal em copo com água para observar borbulhamento contínuo.' },
          { letter: 'C', text: 'Exame radiológico (Raio-X) de tórax e abdome superior com laudo confirmatório da posição infrapilórica/gástrica.' },
          { letter: 'D', text: 'Medição da glicemia capilar do efluente aspirado com fita reagente.' }
        ],
        correctAnswer: 'C',
        explanation: 'A ausculta pode ser transmitida mesmo quando a sonda está na via respiratória. A radiografia é o exame padrão-ouro indispensável antes da primeira infusão.'
      },
      {
        id: 108,
        simuladoId: 1,
        difficulty: 'dificil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Em um paciente sob ventilação mecânica invasiva portador de tubo endotraqueal com cuff (balonete), qual a pressão intracuff preconizada e quais as potenciais complicações associadas a pressões acima de 30 cmH2O e abaixo de 20 cmH2O, respectivamente?',
        options: [
          { letter: 'A', text: 'Alvo: 10 a 15 cmH2O. Acima causa atelectasia; abaixo causa enfisema subcutâneo.' },
          { letter: 'B', text: 'Alvo: 20 a 30 cmH2O (15-22 mmHg). Acima causa isquemia e estenose da mucosa traqueal; abaixo favorece microaspiração de secreções orofaríngeas e pneumonia (PAV).' },
          { letter: 'C', text: 'Alvo: 35 a 45 cmH2O. Acima causa pneumotórax; abaixo causa extubação acidental súbita.' },
          { letter: 'D', text: 'Alvo: 5 a 10 cmH2O. Não há repercussões hemodinâmicas comprovadas.' }
        ],
        correctAnswer: 'B',
        explanation: 'A faixa terapêutica correta é de 20 a 30 cmH2O. Pressão excessiva necrosa a cartilagem traqueal e pressão deficiente permite vazamento de secreções subglóticas para os pulmões gerando PAV.'
      },
      {
        id: 109,
        simuladoId: 1,
        difficulty: 'dificil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Ao realizar anotações de enfermagem no prontuário do paciente, o profissional comete um erro de escrita em uma das linhas. De acordo com a Resolução COFEN sobre registros e documentação em saúde, qual a conduta legal e deontologicamente correta?',
        options: [
          { letter: 'A', text: 'Utilizar corretivo líquido específico para prontuários e reescrever imediatamente por cima.' },
          { letter: 'B', text: 'Rasurar a palavra com traço grosso escuro até cobrir totalmente o erro e assinar ao lado.' },
          { letter: 'C', text: 'Passar um traço simples sobre a palavra incorreta, escrever entre parênteses "digo," a informação correta em seguida, ou utilizar a expressão "em tempo" na linha posterior, sem deixar espaços em branco.' },
          { letter: 'D', text: 'Substituir a folha inteira do prontuário por uma nova sem notificar a chefia médica.' }
        ],
        correctAnswer: 'C',
        explanation: 'É proibido o uso de corretivos, rasuras ou apagamentos. O erro deve ser corrigido com traço simples contínuo e a expressão "digo" ou "em tempo", preservando a legibilidade do texto original.'
      },
      {
        id: 110,
        simuladoId: 1,
        difficulty: 'dificil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Durante a higienização de um paciente dependente no leito com cateter venoso central subclávio, o técnico observa desconexão acidental da tampa de um dos lumens com entrada súbita de ar e o paciente evolui com dispneia aguda, cianose e hipotensão severa (suspeita de embolia gasosa). A posição de emergência imediata em que o paciente deve ser colocado é:',
        options: [
          { letter: 'A', text: 'Decúbito lateral direito em proclive (reversa de Trendelenburg).' },
          { letter: 'B', text: 'Decúbito lateral esquerdo com a cabeça abaixada (Posição de Durant / Trendelenburg com decúbito lateral esquerdo).' },
          { letter: 'C', text: 'Posição de ortopneia com tronco inclinado para a frente.' },
          { letter: 'D', text: 'Decúbito ventral estrito com rotação cervical à direita.' }
        ],
        correctAnswer: 'B',
        explanation: 'A manobra de Durant (Trendelenburg + decúbito lateral esquerdo) aprisiona a bolha gasosa no ápice do ventrículo direito, impedindo que ela oclua a artéria pulmonar principal até que seja reabsorvida ou aspirada.'
      }
    ]
  },

  // ==========================================
  // SIMULADO 02: Farmacologia & Cálculos de Medicamentos
  // ==========================================
  {
    id: 2,
    title: 'Simulado 02 - Farmacologia & Cálculo de Medicamentos',
    description: 'Cálculo de gotejamento, diluições de antibióticos, insulina, heparina e segurança medicamentosa.',
    focusArea: 'Farmacologia & Cálculos',
    timeLimitMinutes: 25,
    questions: [
      // 2 FÁCEIS
      {
        id: 201,
        simuladoId: 2,
        difficulty: 'facil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Foi prescrito para um paciente 500 mL de Soro Glicosado 5% para ser infundido por via endovenosa em 8 horas. Qual o gotejamento correto em gotas por minuto (macrogotas)?',
        options: [
          { letter: 'A', text: '14 gotas/minuto.' },
          { letter: 'B', text: '21 gotas/minuto.' },
          { letter: 'C', text: '42 gotas/minuto.' },
          { letter: 'D', text: '63 gotas/minuto.' }
        ],
        correctAnswer: 'B',
        explanation: 'Fórmula: Gotas/min = Volume ÷ (Tempo × 3) = 500 ÷ (8 × 3) = 500 ÷ 24 = 20,83. Arredondando para o número inteiro mais próximo, obtém-se 21 gotas/minuto.'
      },
      {
        id: 202,
        simuladoId: 2,
        difficulty: 'facil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Para a administração de medicamentos por via intramuscular na região deltoide de um adulto, qual o volume máximo recomendado e qual o ângulo de inserção da agulha em relação à pele?',
        options: [
          { letter: 'A', text: 'Até 5 mL, ângulo de 45°.' },
          { letter: 'B', text: 'Até 2 mL, ângulo de 90°.' },
          { letter: 'C', text: 'Até 4 mL, ângulo de 15°.' },
          { letter: 'D', text: 'Até 1 mL, ângulo de 30°.' }
        ],
        correctAnswer: 'B',
        explanation: 'O músculo deltoide comporta com segurança até 2 mL de volume injetável e a punção intramuscular deve ser realizada a um ângulo perpendicular de 90°.'
      },
      // 3 MÉDIAS
      {
        id: 203,
        simuladoId: 2,
        difficulty: 'media',
        subject: 'Farmacologia & Cálculos',
        statement: 'Prescrição médica: Dipirona gotas 750 mg por via oral. A apresentação disponível na farmácia hospitalar é frasco de Dipirona com concentração de 500 mg/mL, sabendo-se que 1 mL equivale a 20 gotas. Quantas gotas devem ser administradas ao paciente?',
        options: [
          { letter: 'A', text: '15 gotas.' },
          { letter: 'B', text: '20 gotas.' },
          { letter: 'C', text: '30 gotas.' },
          { letter: 'D', text: '40 gotas.' }
        ],
        correctAnswer: 'C',
        explanation: 'Cálculo em mL: 500 mg está para 1 mL assim como 750 mg está para X mL -> X = 750 / 500 = 1,5 mL. Se 1 mL tem 20 gotas, então 1,5 mL × 20 gotas = 30 gotas.'
      },
      {
        id: 204,
        simuladoId: 2,
        difficulty: 'media',
        subject: 'Farmacologia & Cálculos',
        statement: 'O médico prescreveu 35 UI de Insulina Regular subcutânea. No posto de enfermagem temos apenas frasco de Insulina 100 UI/mL e seringas descartáveis de 3 mL (onde 1 mL equivale a 100 UI). Quantos mililitros (mL) o técnico de enfermagem deve aspirar na seringa de 3 mL?',
        options: [
          { letter: 'A', text: '0,035 mL.' },
          { letter: 'B', text: '0,35 mL.' },
          { letter: 'C', text: '0,70 mL.' },
          { letter: 'D', text: '1,35 mL.' }
        ],
        correctAnswer: 'B',
        explanation: 'Regra de três: 100 UI equivalem a 1 mL. Logo, 35 UI equivalem a X mL -> X = 35 / 100 = 0,35 mL.'
      },
      {
        id: 205,
        simuladoId: 2,
        difficulty: 'media',
        subject: 'Farmacologia & Cálculos',
        statement: 'Um paciente em uso contínuo de anticoagulante oral (Varfarina) apresenta sangramento gengival e INR alargado. Qual é o agente farmacológico reversor (antídoto) de escolha para esse quadro?',
        options: [
          { letter: 'A', text: 'Sulfato de Protamina.' },
          { letter: 'B', text: 'Vitamina K1 (Fitomenadiona).' },
          { letter: 'C', text: 'Naloxona.' },
          { letter: 'D', text: 'Flumazenil.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Vitamina K (Fitomenadiona) reverte a inibição dos fatores dependentes da vitamina K causada pela Varfarina. A Protamina é o antídoto da Heparina.'
      },
      // 5 DIFÍCEIS
      {
        id: 206,
        simuladoId: 2,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Prescrição médica: 250 mL de Solução Fisiológica com eletrólitos para correr em 40 minutos em equipo de microgotas. Qual deve ser o cálculo do fluxo em microgotas por minuto?',
        options: [
          { letter: 'A', text: '188 microgotas/min.' },
          { letter: 'B', text: '250 microgotas/min.' },
          { letter: 'C', text: '375 microgotas/min.' },
          { letter: 'D', text: '500 microgotas/min.' }
        ],
        correctAnswer: 'C',
        explanation: 'Fórmula de microgotas quando o tempo é expresso em minutos: Microgotas/min = (Volume × 60) ÷ Minutos. Logo: (250 × 60) ÷ 40 = 15.000 ÷ 40 = 375 microgotas/minuto.'
      },
      {
        id: 207,
        simuladoId: 2,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Temos prescrito Oxacilina sódica 350 mg EV de 6/6h. A unidade dispõe de frasco-ampola com 500 mg de pó liofilizado. Ao diluir o pó com 4 mL de diluente estéril (água bidestilada), sabendo-se que o soluto ocupa um volume residual de 1 mL (volume total pós-reconstituição = 5 mL), quantos mL da solução resultante contêm a dose prescrita?',
        options: [
          { letter: 'A', text: '2,8 mL.' },
          { letter: 'B', text: '3,5 mL.' },
          { letter: 'C', text: '4,0 mL.' },
          { letter: 'D', text: '4,2 mL.' }
        ],
        correctAnswer: 'B',
        explanation: 'Volume total após reconstituição: 4 mL de solvente + 1 mL do pó = 5 mL no frasco com 500 mg. Regra de três: 500 mg está para 5 mL; 350 mg está para X mL. X = (350 × 5) / 500 = 1750 / 500 = 3,5 mL.'
      },
      {
        id: 208,
        simuladoId: 2,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Prescrição médica: 500 mL de Soro Glicosado a 10% (SG 10%). A unidade dispõe apenas de frascos de Soro Glicosado a 5% de 500 mL (SG 5%) e ampolas de Glicose hipertônica a 50% de 20 mL. Quantos mL de glicose a 50% devem ser acrescentados ao frasco de SG 5% para transformá-lo em SG 10% (desconsiderando a perda de volume ou calculando a substituição exata)?',
        options: [
          { letter: 'A', text: '25 mL de glicose 50%.' },
          { letter: 'B', text: '50 mL de glicose 50%.' },
          { letter: 'C', text: '75 mL de glicose 50%.' },
          { letter: 'D', text: '100 mL de glicose 50%.' }
        ],
        correctAnswer: 'B',
        explanation: 'SG 10% em 500 mL necessita de 50g de glicose. O frasco de SG 5% de 500 mL possui 25g de glicose. Faltam: 50g - 25g = 25g. A ampola a 50% tem 50g em 100 mL (ou seja, 0,5g/mL). Para obter 25g: 25 ÷ 0,5 = 50 mL de glicose a 50%.'
      },
      {
        id: 209,
        simuladoId: 2,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Na infusão contínua de Nitroprussiato de Sódio (Nipride) para controle de emergência hipertensiva em UTI, qual cuidado primordial a equipe de enfermagem deve obrigatoriamente cumprir em relação ao equipo e frasco, e qual toxicidade pode ocorrer em infusões prolongadas em altas doses?',
        options: [
          { letter: 'A', text: 'Utilizar frasco e equipo fotoprotetor escuro opaco; risco de intoxicação por tiocianato e cianeto.' },
          { letter: 'B', text: 'Infundir exclusivamente em via periférica com gelo local; risco de hiperpotassemia.' },
          { letter: 'C', text: 'Diluir apenas em ringer lactato; risco de hipernatremia refratária.' },
          { letter: 'D', text: 'Aquecer a solução a 37°C para evitar cristalização; risco de coagulopatia intravascular.' }
        ],
        correctAnswer: 'A',
        explanation: 'O Nitroprussiato de sódio sofre fotodegradação acelerada na presença de luz ambiente, liberando óxido nítrico e cianeto tóxico. Portanto, frasco e equipo devem ser rigorosamente fotoprotetores.'
      },
      {
        id: 210,
        simuladoId: 2,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Prescrição: Heparina sódica 3.500 UI por via subcutânea de 12/12h. A apresentação disponível na instituição é frasco-ampola de 5.000 UI/mL com 5 mL. O técnico dispõe de seringa de tuberculina de 1 mL graduada em centésimos (100 subdivisões). Quantos traços/centésimos da seringa (mL) devem ser aspirados?',
        options: [
          { letter: 'A', text: '0,35 mL (35 centésimos).' },
          { letter: 'B', text: '0,50 mL (50 centésimos).' },
          { letter: 'C', text: '0,70 mL (70 centésimos).' },
          { letter: 'D', text: '0,85 mL (85 centésimos).' }
        ],
        correctAnswer: 'C',
        explanation: 'O frasco tem 5.000 UI a cada 1 mL. Regra de três simples: 5.000 UI --- 1,00 mL; 3.500 UI --- X mL. X = 3.500 / 5.000 = 0,70 mL (70 centésimos da seringa graduada).'
      }
    ]
  },

  // ==========================================
  // SIMULADO 03: Urgência, Emergência e PCR
  // ==========================================
  {
    id: 3,
    title: 'Simulado 03 - Urgência, Emergência e PCR',
    description: 'Diretrizes AHA/SBV/SAVC, ritmos chocáveis, parada cardiorrespiratória, choque e trauma.',
    focusArea: 'Urgência & Emergência',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 301,
        simuladoId: 3,
        difficulty: 'facil',
        subject: 'Urgência & Emergência',
        statement: 'Segundo as diretrizes internacionais de Suporte Básico de Vida (AHA), qual a frequência e profundidade preconizadas para compressões torácicas no atendimento de um adulto em PCR?',
        options: [
          { letter: 'A', text: '60 a 80 compressões/minuto e profundidade de 3 a 4 cm.' },
          { letter: 'B', text: '80 a 100 compressões/minuto e profundidade máxima de 4 cm.' },
          { letter: 'C', text: '100 a 120 compressões/minuto e profundidade de 5 a 6 cm.' },
          { letter: 'D', text: '120 a 140 compressões/minuto e profundidade superior a 7 cm.' }
        ],
        correctAnswer: 'C',
        explanation: 'No adulto, a frequência recomendada é de 100 a 120 compressões por minuto, com profundidade de 5 a 6 cm, permitindo o retorno completo do tórax entre as compressões.'
      },
      {
        id: 302,
        simuladoId: 3,
        difficulty: 'facil',
        subject: 'Urgência & Emergência',
        statement: 'Dentre os ritmos eletrocardiográficos observados em uma parada cardiorrespiratória, quais são considerados ritmos CHOCÁVEIS (que demandam choque pelo Desfibrilador Externo Automático - DEA)?',
        options: [
          { letter: 'A', text: 'Assistolia e Atividade Elétrica Sem Pulso (AESP).' },
          { letter: 'B', text: 'Fibrilação Ventricular (FV) e Taquicardia Ventricular sem Pulso (TVsp).' },
          { letter: 'C', text: 'Bloqueio Atrioventricular Total (BAVT) e Bradicardia Sinusal.' },
          { letter: 'D', text: 'Taquicardia Sinusal e Fibrilação Atrial.' }
        ],
        correctAnswer: 'B',
        explanation: 'Os únicos ritmos chocáveis são a FV e a TV sem pulso. Assistolia e AESP não respondem a choques e demandam RCP de alta qualidade e Epinefrina precoce.'
      },
      // 3 MÉDIAS
      {
        id: 303,
        simuladoId: 3,
        difficulty: 'media',
        subject: 'Urgência & Emergência',
        statement: 'Em um trauma automobilístico grave atendido pela equipe do SAMU, o socorrista constata sangramento arterial em jato contínuo em membro inferior com amputação traumática. De acordo com a atualização do mnemônico XABCDE do PHTLS 10ª edição, qual a primeira prioridade?',
        options: [
          { letter: 'A', text: 'Abertura imediata de via aérea com estabilização cervical (Letra A).' },
          { letter: 'B', text: 'Controle precoce de hemorragia externa exsanguinante com aplicação de torniquete (Letra X).' },
          { letter: 'C', text: 'Ventilação com pressão positiva com bolsa-válvula-máscara (Letra B).' },
          { letter: 'D', text: 'Avaliação neurológica pela escala de Glasgow (Letra D).' }
        ],
        correctAnswer: 'B',
        explanation: 'A letra X (Exsanguinating Hemorrhage) precede a via aérea (A). O sangramento arterial exsanguinante pode levar ao choque hemorrágico irreversível e morte em minutos se não contido imediatamente.'
      },
      {
        id: 304,
        simuladoId: 3,
        difficulty: 'media',
        subject: 'Urgência & Emergência',
        statement: 'No atendimento de emergência a um paciente vítima de choque anafilático grave com estridor respiratório e hipotensão, qual fármaco de primeira linha deve ser administrado IMEDIATAMENTE e por qual via?',
        options: [
          { letter: 'A', text: 'Hidrocortisona 500 mg por via endovenosa lenta.' },
          { letter: 'B', text: 'Prometazina 50 mg por via intramuscular profunda glútea.' },
          { letter: 'C', text: 'Epinefrina (Adrenalina) 1:1000 por via intramuscular no terço anterolateral da coxa.' },
          { letter: 'D', text: 'Salbutamol aerossol via inalatória sob máscara.' }
        ],
        correctAnswer: 'C',
        explanation: 'A Adrenalina IM no músculo vasto lateral da coxa é o único medicamento comprovado que reverte o colapso vascular e edema de laringe da anafilaxia com absorção ultrarrápida.'
      },
      {
        id: 305,
        simuladoId: 3,
        difficulty: 'media',
        subject: 'Urgência & Emergência',
        statement: 'Um paciente vítima de queda de moto abre os olhos apenas após estímulo doloroso (2), emite sons incompreensíveis/gemidos (2) e apresenta postura de flexão anormal/decorticação ao estímulo doloroso (3). Suas duas pupilas reagem à luz normalmente (fator pupilar 0). Qual a pontuação na Escala de Coma de Glasgow-P?',
        options: [
          { letter: 'A', text: 'Glasgow 5.' },
          { letter: 'B', text: 'Glasgow 7.' },
          { letter: 'C', text: 'Glasgow 9.' },
          { letter: 'D', text: 'Glasgow 11.' }
        ],
        correctAnswer: 'B',
        explanation: 'Abertura ocular aos estímulos dolorosos = 2; Resposta verbal (sons incompreensíveis) = 2; Resposta motora (flexão anormal/decorticação) = 3. Soma: 2 + 2 + 3 = 7. Subtraindo o fator pupilar (0) = 7 (Trauma Cranioencefálico Grave).'
      },
      // 5 DIFÍCEIS
      {
        id: 306,
        simuladoId: 3,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'Durante a reanimação de um paciente adulto em parada cardiorrespiratória em ritmo de Fibrilação Ventricular (FV) refratária, após o segundo choque e administração da primeira dose de Epinefrina (1 mg), qual antiarrítmico e respectiva dose inicial são indicados na sequência pelo protocolo SAVC/ACLS da AHA?',
        options: [
          { letter: 'A', text: 'Lidocaína 5 mg/kg bolus direto.' },
          { letter: 'B', text: 'Amiodarona 300 mg bolus IV/IO rápido (seguido de flush de 20 mL de soro).' },
          { letter: 'C', text: 'Sulfato de Magnésio 4g em infusão lenta de 30 minutos.' },
          { letter: 'D', text: 'Atropina 1 mg bolus IV repetido a cada minuto.' }
        ],
        correctAnswer: 'B',
        explanation: 'Após o 3º choque na FV/TVsp refratária, administra-se Amiodarona 300 mg bolus rápido (ou Lidocaína 1 a 1,5 mg/kg). Uma segunda dose de Amiodarona (150 mg) pode ser considerada mais adiante.'
      },
      {
        id: 307,
        simuladoId: 3,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'Um homem de 35 anos, pesando 70 kg, dá entrada no pronto-socorro com queimaduras térmicas de 2º e 3º graus em todo o tronco anterior (18%) e em ambos os membros superiores completos (9% + 9% = 18%), totalizando 36% de Superfície Corporal Queimada (SCQ). Pela Fórmula de Parkland Modificada (2 mL × peso em kg × % SCQ de Ringer Lactato nas primeiras 24 horas), qual o volume total a ser infundido e quanto deve correr nas primeiras 8 horas a partir do horário da queimadura?',
        options: [
          { letter: 'A', text: 'Total: 2.520 mL; primeiras 8h: 1.260 mL.' },
          { letter: 'B', text: 'Total: 5.040 mL; primeiras 8h: 2.520 mL.' },
          { letter: 'C', text: 'Total: 10.080 mL; primeiras 8h: 5.040 mL.' },
          { letter: 'D', text: 'Total: 7.200 mL; primeiras 8h: 3.600 mL.' }
        ],
        correctAnswer: 'B',
        explanation: 'Cálculo Parkland (2 mL): 2 mL × 70 kg × 36 = 5.040 mL nas primeiras 24 horas. Metade do volume total (5.040 ÷ 2 = 2.520 mL) deve ser infundida nas primeiras 8 horas calculadas a partir do momento da lesão.'
      },
      {
        id: 308,
        simuladoId: 3,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'No atendimento de suporte avançado de vida em PCR, foram identificadas as causas reversíveis de parada, conhecidas como "5Hs e 5Ts". Dentre as opções abaixo, assinale a que contém EXCLUSIVAMENTE causas pertencentes ao grupo dos 5Ts:',
        options: [
          { letter: 'A', text: 'Hipóxia, Hipovolemia, Hipotermia, Hipocalemia.' },
          { letter: 'B', text: 'Tensão no tórax (pneumotórax hipertensivo), Tamponamento cardíaco, Toxinas, Trombose pulmonar (TEP), Trombose coronariana (IAM).' },
          { letter: 'C', text: 'Toxinas, Traumatismo craniano, Torpor metabólico, Taquicardia atrial, Tetania.' },
          { letter: 'D', text: 'Hipercalemia, Hipoglicemia, Acidose (H+), Tamponamento pericárdico.' }
        ],
        correctAnswer: 'B',
        explanation: 'Os 5Ts são: Tensão no tórax (pneumotórax hipertensivo), Tamponamento cardíaco, Toxinas (overdose), Trombose coronária (IAM) e Trombose pulmonar (TEP). Os 5Hs são: Hipovolemia, Hipóxia, H+ (acidose), Hipo/Hipercalemia, Hipotermia.'
      },
      {
        id: 309,
        simuladoId: 3,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'Vítima de trauma fechado no tórax apresenta estase de veias jugulares, bulhas cardíacas hipofonéticas/abafadas e hipotensão arterial progressiva com pulso paradoxal. Essa tríade clássica denomina-se e indica qual condição patológica emergencial com indicação de pericardiocentese de alívio?',
        options: [
          { letter: 'A', text: 'Tríade de Cushing; Hipertensão Intracraniana descompensada.' },
          { letter: 'B', text: 'Tríade de Charcot; Colangite aguda séptica.' },
          { letter: 'C', text: 'Tríade de Virchow; Trombose venosa profunda ílio-femoral.' },
          { letter: 'D', text: 'Tríade de Beck; Tamponamento Cardíaco agudo.' }
        ],
        correctAnswer: 'D',
        explanation: 'A Tríade de Beck (hipotensão, hipofonese de bulhas e estase jugular) é patognomônica de tamponamento cardíaco agudo decorrente de acúmulo de sangue no saco pericárdico.'
      },
      {
        id: 310,
        simuladoId: 3,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'Após o retorno à circulação espontânea (RCE) em um paciente pós-PCR por fibrilação ventricular com ausência de resposta verbal consistente ao comando, qual a meta de controle direcionado de temperatura (CDT) e a faixa de saturação de oxigênio recomendadas pela AHA nos cuidados pós-parada?',
        options: [
          { letter: 'A', text: 'Induzir hipotermia profunda a 28°C e manter FiO2 a 100% contínua.' },
          { letter: 'B', text: 'Manter temperatura constante entre 32°C e 36°C (ou evitar ativamente febre > 37,5°C) por no mínimo 24h e titular SpO2 entre 92% e 98%.' },
          { letter: 'C', text: 'Manter hipertermia reflexa a 38,5°C para estimular a reatividade sináptica.' },
          { letter: 'D', text: 'Permitir normotermia sem monitorização e saturação mantida obrigatoriamente em 100%.' }
        ],
        correctAnswer: 'B',
        explanation: 'A diretriz recomenda CDT entre 32°C e 36°C (ou prevenir ativamente febre) por pelo menos 24 horas, além de evitar hiperóxia excessiva (alvo de saturação de 92% a 98%).'
      }
    ]
  },

  // ==========================================
  // SIMULADO 04: Legislação do SUS & Ética
  // ==========================================
  {
    id: 4,
    title: 'Simulado 04 - Legislação do SUS & Código de Ética',
    description: 'Leis 8.080/90 e 8.142/90, princípios do SUS, Resolução COFEN 564/2017 e exercício profissional.',
    focusArea: 'SUS & Legislação',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 401,
        simuladoId: 4,
        difficulty: 'facil',
        subject: 'SUS & Legislação',
        statement: 'De acordo com a Lei Federal nº 8.080/1990, são considerados princípios DOUTRINÁRIOS do Sistema Único de Saúde (SUS):',
        options: [
          { letter: 'A', text: 'Descentralização, Regionalização e Hierarquização.' },
          { letter: 'B', text: 'Universalidade de acesso, Integralidade da atenção e Equidade.' },
          { letter: 'C', text: 'Privatização complementar, Lucratividade e Coparticipação.' },
          { letter: 'D', text: 'Centralização de recursos, Burocratização e Fragmentação assistencial.' }
        ],
        correctAnswer: 'B',
        explanation: 'Os três princípios doutrinários (ou ideológicos) do SUS são: Universalidade (saúde é direito de todos), Integralidade (visão biopsicossocial completa) e Equidade (tratar desigualmente os desiguais).'
      },
      {
        id: 402,
        simuladoId: 4,
        difficulty: 'facil',
        subject: 'SUS & Legislação',
        statement: 'A Lei Federal nº 8.142/1990 dispõe especificamente sobre quais matérias no âmbito do SUS?',
        options: [
          { letter: 'A', text: 'A criação e tabela de preços da Agência Nacional de Saúde Suplementar (ANS).' },
          { letter: 'B', text: 'A participação da comunidade na gestão do SUS e as transferências intergovernamentais de recursos financeiros.' },
          { letter: 'C', text: 'O código de processo penal para infrações médicas hospitalares.' },
          { letter: 'D', text: 'A extinção definitiva de convênios com entidades filantrópicas sem fins lucrativos.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Lei 8.142/90 regulamenta a participação social (Conselhos e Conferências de Saúde) e as transferências regulares e automáticas de recursos fundo a fundo entre esferas de governo.'
      },
      // 3 MÉDIAS
      {
        id: 403,
        simuladoId: 4,
        difficulty: 'media',
        subject: 'SUS & Legislação',
        statement: 'A composição dos Conselhos de Saúde nas esferas municipal, estadual e federal obedece ao princípio da paridade representativa. De acordo com a Resolução CNS nº 453/2012, qual a distribuição percentual das vagas?',
        options: [
          { letter: 'A', text: '50% trabalhadores de saúde, 25% usuários e 25% gestores.' },
          { letter: 'B', text: '50% usuários, 25% trabalhadores de saúde e 25% de gestores/prestadores de serviços.' },
          { letter: 'C', text: '33% usuários, 33% médicos e 33% prefeitos.' },
          { letter: 'D', text: '70% usuários e 30% representantes governamentais.' }
        ],
        correctAnswer: 'B',
        explanation: 'A paridade estabelece que 50% dos membros dos Conselhos de Saúde devem ser representantes dos usuários, 25% trabalhadores da saúde e 25% gestores e prestadores de serviços de saúde.'
      },
      {
        id: 404,
        simuladoId: 4,
        difficulty: 'media',
        subject: 'SUS & Legislação',
        statement: 'Segundo a Lei nº 7.498/1986 (Regulamentação do Exercício Profissional da Enfermagem), constitui atividade PRIVATIVA do Enfermeiro:',
        options: [
          { letter: 'A', text: 'Administrar medicamentos por via endovenosa e intramuscular com prescrição.' },
          { letter: 'B', text: 'Consulta de enfermagem e prescrição da assistência de enfermagem.' },
          { letter: 'C', text: 'Auxiliar na higienização corporal do paciente no leito.' },
          { letter: 'D', text: 'Realizar controle hídrico e anotação dos sinais vitais.' }
        ],
        correctAnswer: 'B',
        explanation: 'A consulta de enfermagem, a prescrição da assistência de enfermagem e os cuidados a pacientes graves com risco iminente de morte são privativos do Enfermeiro.'
      },
      {
        id: 405,
        simuladoId: 4,
        difficulty: 'media',
        subject: 'SUS & Legislação',
        statement: 'No Código de Ética dos Profissionais de Enfermagem (Resolução COFEN nº 564/2017), qual penalidade disciplinar só pode ser deliberada e aplicada EXCLUSIVAMENTE pelo Conselho Federal de Enfermagem (COFEN)?',
        options: [
          { letter: 'A', text: 'Advertência verbal sigilosa.' },
          { letter: 'B', text: 'Multa de até 10 vezes o valor da anuidade.' },
          { letter: 'C', text: 'Censura pública veiculada em jornal oficial.' },
          { letter: 'D', text: 'Cassação do direito ao exercício profissional.' }
        ],
        correctAnswer: 'D',
        explanation: 'A penalidade de Cassação do Direito ao Exercício Profissional (por até 30 anos) é de competência exclusiva do Plenário do Conselho Federal de Enfermagem (COFEN).'
      },
      // 5 DIFÍCEIS
      {
        id: 406,
        simuladoId: 4,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'O Decreto Presidencial nº 7.508/2011 regulamentou a Lei 8.080/90 para dispor sobre a organização do SUS, o planejamento da saúde e a assistência. De acordo com o Decreto, como se define a "Região de Saúde"?',
        options: [
          { letter: 'A', text: 'Unidade ambulatorial de triagem primária localizada exclusivamente nas capitais estaduais.' },
          { letter: 'B', text: 'Espaço geográfico contínuo constituído por agrupamentos de Municípios limítrofes, delimitado a partir de identidades culturais, econômicas e sociais e de redes de comunicação e infraestrutura de transportes compartilhados.' },
          { letter: 'C', text: 'Divisão administrativa de hospitais filantrópicos credenciados pelo Ministério da Educação.' },
          { letter: 'D', text: 'Área de atendimento exclusivo para segurados da previdência social rural.' }
        ],
        correctAnswer: 'B',
        explanation: 'Essa é a definição literal presente no art. 2º do Decreto 7.508/2011, que institui a base territorial para a integração das Redes de Atenção à Saúde (RAS).'
      },
      {
        id: 407,
        simuladoId: 4,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'Segundo o Código de Ética (Resolução COFEN 564/2017), quanto ao sigilo profissional, em qual das seguintes situações a quebra do sigilo é juridicamente e eticamente AUTORIZADA pelo profissional de enfermagem?',
        options: [
          { letter: 'A', text: 'A pedido informal de colega de trabalho curioso da unidade de internação.' },
          { letter: 'B', text: 'Por motivo justo, dever legal (como notificação compulsória de doenças graves) ou consentimento expresso por escrito da pessoa envolvida ou responsável legal.' },
          { letter: 'C', text: 'Quando o paciente falece, momento em que todo o sigilo cessa compulsoriamente.' },
          { letter: 'D', text: 'Para exibição de casos clínicos interessantes em redes sociais sem autorização judicial.' }
        ],
        correctAnswer: 'B',
        explanation: 'O sigilo profissional só pode ser rompido em hipótese de dever legal (doenças de notificação compulsória, abuso de vulneráveis), justa causa ou consentimento expresso por escrito.'
      },
      {
        id: 408,
        simuladoId: 4,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'No âmbito do financiamento e controle orçamentário do SUS instituído pela Emenda Constitucional nº 29/2000 e regulamentado pela Lei Complementar nº 141/2012, quais os percentuais mínimos da receita corrente líquida que Municípios e Estados devem aplicar em Ações e Serviços Públicos de Saúde (ASPS)?',
        options: [
          { letter: 'A', text: 'Municípios no mínimo 5% e Estados no mínimo 8%.' },
          { letter: 'B', text: 'Municípios no mínimo 15% e Estados no mínimo 12%.' },
          { letter: 'C', text: 'Municípios no mínimo 25% e Estados no mínimo 20%.' },
          { letter: 'D', text: 'Ambos aplicam o percentual fixo uniforme de 10%.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Lei Complementar nº 141/2012 fixa que os Municípios e o Distrito Federal devem aplicar no mínimo 15% da sua arrecadação tributária, e os Estados no mínimo 12%.'
      },
      {
        id: 409,
        simuladoId: 4,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'Um técnico de enfermagem depara-se com ordem médica verbal para administração de substância química não aprovada em paciente sob cuidados paliativos, em desacordo com as boas práticas. O profissional consulta o Código de Ética (Resolução COFEN 564/2017). Constitui um DIREITO expresso do profissional:',
        options: [
          { letter: 'A', text: 'Executar a prescrição e posteriormente denunciar anonimamente a ouvidoria da instituição.' },
          { letter: 'B', text: 'Recusar-se a executar atividades que não sejam de sua competência técnica, científica, ética e legal ou que não ofereçam segurança ao profissional e à pessoa atendida.' },
          { letter: 'C', text: 'Delegar a tarefa a um auxiliar de limpeza hospitalar.' },
          { letter: 'D', text: 'Cobrar honorários adicionais por escrito para assumir o risco da administração.' }
        ],
        correctAnswer: 'B',
        explanation: 'Art. 22 do Código de Ética: É direito do profissional recusar-se a executar prescrições ilegítimas, medicamentos sem identificação segura ou procedimentos para os quais não se sinta seguro e respaldado.'
      },
      {
        id: 410,
        simuladoId: 4,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'De acordo com a Lei 8.080/90, os serviços privados de assistência à saúde podem participar do Sistema Único de Saúde de forma suplementar ou complementar. Sobre essa participação complementar, a legislação determina expressamente que:',
        options: [
          { letter: 'A', text: 'A preferência deve ser conferida a entidades com fins lucrativos de grande porte internacional.' },
          { letter: 'B', text: 'A participação deve ocorrer mediante contrato de direito público ou convênio, com preferência para entidades filantrópicas e as sem fins lucrativos.' },
          { letter: 'C', text: 'Os hospitais privados podem exigir pagamento complementar direto aos usuários atendidos pelo SUS.' },
          { letter: 'D', text: 'É facultada a cobrança de taxa de comodidade para internações em enfermarias compartilhadas.' }
        ],
        correctAnswer: 'B',
        explanation: 'A atuação da iniciativa privada no SUS é de caráter estritamente complementar, formalizada por contrato ou convênio público, com expressa prioridade legal às instituições filantrópicas e sem fins lucrativos.'
      }
    ]
  },

  // ==========================================
  // SIMULADO 05: Biossegurança, CCIH e CME
  // ==========================================
  {
    id: 5,
    title: 'Simulado 05 - Biossegurança, CCIH e CME',
    description: 'Precauções de contato e aerossóis, higienização das mãos, autoclave e classificação de Spaulding.',
    focusArea: 'Biossegurança & Infecção',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 501,
        simuladoId: 5,
        difficulty: 'facil',
        subject: 'Biossegurança & Infecção',
        statement: 'Na assistência a um paciente internado com diagnóstico confirmado de Tuberculose Pulmonar Bacilífera ativa, qual equipamento de proteção respiratória individual (EPI) é obrigatório para o profissional de enfermagem adentrar ao quarto?',
        options: [
          { letter: 'A', text: 'Máscara cirúrgica descartável tripla simples.' },
          { letter: 'B', text: 'Máscara facial do tipo PFF2 / N95 com vedação perimetral adequada.' },
          { letter: 'C', text: 'Apenas protetor facial tipo face shield sem máscara.' },
          { letter: 'D', text: 'Máscara de tecido de algodão de fabricação caseira.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Tuberculose é transmitida por aerossóis (partículas < 5 µm que ficam suspensas no ar), exigindo máscara de proteção respiratória com filtro PFF2/N95 para os profissionais de saúde.'
      },
      {
        id: 502,
        simuladoId: 5,
        difficulty: 'facil',
        subject: 'Biossegurança & Infecção',
        statement: 'De acordo com as diretrizes da NR-32 e do Ministério da Saúde sobre a prevenção de acidentes com material biológico perfurocortante, qual das condutas abaixo é expressamente PROIBIDA?',
        options: [
          { letter: 'A', text: 'Descartar agulhas em caixas coletoras rígidas específicas (Descarpack).' },
          { letter: 'B', text: 'Reencapar manualmente agulhas descartáveis após a punção venosa ou intramuscular.' },
          { letter: 'C', text: 'Substituir a caixa de descarte ao atingir o limite de 2/3 da capacidade do recipiente.' },
          { letter: 'D', text: 'Transportar materiais perfurocortantes em bandejas ou cubas-rim.' }
        ],
        correctAnswer: 'B',
        explanation: 'O reencape manual de agulhas após o uso é terminantemente proibido pela NR-32 por constituir a principal causa de acidentes com perfurocortantes e transmissão viral ocupacional.'
      },
      // 3 MÉDIAS
      {
        id: 503,
        simuladoId: 5,
        difficulty: 'media',
        subject: 'Biossegurança & Infecção',
        statement: 'Em um paciente internado com infecção por bactéria multirresistente (KPC) em úlcera sacral e urina, quais são as precauções de isolamento recomendadas pela CCIH?',
        options: [
          { letter: 'A', text: 'Precauções Padrão apenas.' },
          { letter: 'B', text: 'Precauções de Contato (quarto privativo ou coorte, avental e luvas para qualquer contato com o paciente ou ambiente).' },
          { letter: 'C', text: 'Precauções para Gotículas estritas a mais de 3 metros.' },
          { letter: 'D', text: 'Precauções para Aerossóis com quarto de pressão positiva.' }
        ],
        correctAnswer: 'B',
        explanation: 'Bactérias multirresistentes exigem Precauções de Contato: uso de luvas e avental/capote descartável durante a assistência, higienização rigorosa das mãos e equipamentos de uso exclusivo (esteto e manguito).'
      },
      {
        id: 504,
        simuladoId: 5,
        difficulty: 'media',
        subject: 'Biossegurança & Infecção',
        statement: 'De acordo com a classificação de Spaulding adotada pela ANVISA, um instrumental cirúrgico metálico que penetra tecidos estéreis ou o sistema vascular é classificado como artigo:',
        options: [
          { letter: 'A', text: 'Não crítico, exigindo apenas limpeza simples com água e detergente neutro.' },
          { letter: 'B', text: 'Semicrítico, necessitando de desinfecção de nível intermediário.' },
          { letter: 'C', text: 'Crítico, exigindo obrigatoriamente processo validado de esterilização.' },
          { letter: 'D', text: 'Descartável compulsório de uso proibido no país.' }
        ],
        correctAnswer: 'C',
        explanation: 'Artigos críticos são aqueles que entram em contato com tecidos estéreis, sistema circulatório ou órgãos cavitários, exigindo esterilização obrigatória (eliminação de todas as formas de vida microbiana, inclusive esporos).'
      },
      {
        id: 505,
        simuladoId: 5,
        difficulty: 'media',
        subject: 'Biossegurança & Infecção',
        statement: 'Qual o tempo mínimo recomendado para a higienização simples das mãos com água e sabonete comum e para a fricção antisséptica das mãos com preparação alcoólica (álcool gel 70%), respectivamente?',
        options: [
          { letter: 'A', text: '10 a 15 segundos com água e sabão / 5 segundos com álcool gel.' },
          { letter: 'B', text: '40 a 60 segundos com água e sabão / 20 a 30 segundos com álcool gel.' },
          { letter: 'C', text: '2 a 3 minutos com água e sabão / 1 minuto com álcool gel.' },
          { letter: 'D', text: '60 segundos para ambos os métodos indiferentemente.' }
        ],
        correctAnswer: 'B',
        explanation: 'Segundo a OMS e a ANVISA: fricção com água e sabão deve durar de 40 a 60 segundos; fricção com preparação alcoólica a 70% deve durar de 20 a 30 segundos até a secagem completa das mãos.'
      },
      // 5 DIFÍCEIS
      {
        id: 506,
        simuladoId: 5,
        difficulty: 'dificil',
        subject: 'Biossegurança & Infecção',
        statement: 'Na Central de Material e Esterilização (CME), para o controle de qualidade do processo de esterilização em autoclave a vapor saturado, qual é o microrganismo indicador biológico padrão utilizado para comprovar a eficácia do ciclo térmico?',
        options: [
          { letter: 'A', text: 'Bacillus atrophaeus (antigo B. subtilis).' },
          { letter: 'B', text: 'Geobacillus stearothermophilus.' },
          { letter: 'C', text: 'Clostridium perfringens.' },
          { letter: 'D', text: 'Pseudomonas aeruginosa multirresistente.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Geobacillus stearothermophilus é o esporo bacteriano padrão-ouro para testar autoclaves a vapor. O Bacillus atrophaeus é utilizado para esterilização por calor seco (estufa) ou gás óxido de etileno.'
      },
      {
        id: 507,
        simuladoId: 5,
        difficulty: 'dificil',
        subject: 'Biossegurança & Infecção',
        statement: 'Um profissional de enfermagem sofre acidente perfurocortante com agulha de punção venosa profunda com sangue visível de paciente comprovadamente HIV positivo com alta carga viral. De acordo com o Protocolo Clínico do Ministério da Saúde para Profilaxia Pós-Exposição (PEP), qual a conduta imediata recomendada?',
        options: [
          { letter: 'A', text: 'Espremer vigorosamente o ferimento para forçar sangramento e aplicar hipoclorito a 10% puro.' },
          { letter: 'B', text: 'Lavar exaustivamente o local com água e sabão, notificar o acidente, e iniciar os antirretrovirais da PEP preferencialmente nas primeiras 2 horas (limite máximo de até 72 horas) por 28 dias consecutivos.' },
          { letter: 'C', text: 'Aguardar 30 dias para realização do primeiro teste rápido antes de introduzir qualquer medicamento.' },
          { letter: 'D', text: 'Administrar vacina profilática e suspender o trabalho do colaborador por 6 meses.' }
        ],
        correctAnswer: 'B',
        explanation: 'Não se deve espremer o ferimento (aumenta a microlesão tecidual). A lavagem imediata com água e sabão é essencial, e a PEP com antirretrovirais deve ser iniciada de imediato (preferência < 2h, teto de 72h) com duração de 28 dias.'
      },
      {
        id: 508,
        simuladoId: 5,
        difficulty: 'dificil',
        subject: 'Biossegurança & Infecção',
        statement: 'No teste de Bowie-Dick realizado diariamente na primeira carga da manhã em autoclaves pré-vácuo na CME, o que é especificamente avaliado pelo integrador químico?',
        options: [
          { letter: 'A', text: 'A dureza da água e concentração de cloretos da rede pública.' },
          { letter: 'B', text: 'A remoção eficaz do ar do interior da câmara e a penetração homogênea e instantânea do vapor d’água saturado no pacote-desafio.' },
          { letter: 'C', text: 'A esterilização absoluta de implantes ortopédicos implantáveis.' },
          { letter: 'D', text: 'A ausência de resíduos proteicos de sangue no instrumental limpo.' }
        ],
        correctAnswer: 'B',
        explanation: 'O teste Bowie-Dick serve exclusivamente para verificar a eficácia da bomba de vácuo em retirar bolsas residuais de ar da câmara e comprovar a rápida penetração do vapor no teste-padrão.'
      },
      {
        id: 509,
        simuladoId: 5,
        difficulty: 'dificil',
        subject: 'Biossegurança & Infecção',
        statement: 'De acordo com a RDC nº 222/2018 da ANVISA, que regulamenta as Boas Práticas de Gerenciamento dos Resíduos de Serviços de Saúde (RSS), os resíduos que apresentam risco biológico potencial contendo agentes infecciosos e os resíduos perfurocortantes pertencem, respectivamente, aos seguintes grupos:',
        options: [
          { letter: 'A', text: 'Grupo B (químicos) e Grupo D (comuns).' },
          { letter: 'B', text: 'Grupo A (infectantes) e Grupo E (perfurocortantes).' },
          { letter: 'C', text: 'Grupo C (rejeitos radioativos) e Grupo A (infectantes).' },
          { letter: 'D', text: 'Grupo D (resíduos recicláveis) e Grupo B (resíduos tóxicos).' }
        ],
        correctAnswer: 'B',
        explanation: 'Grupo A: Resíduos com presença de agentes biológicos infecciosos (sacos brancos leitosos). Grupo E: Materiais perfurocortantes ou escarificantes (caixas rígidas amarelas).'
      },
      {
        id: 510,
        simuladoId: 5,
        difficulty: 'dificil',
        subject: 'Biossegurança & Infecção',
        statement: 'Na assistência a um paciente internado com diarreia aguda associada a Clostridioides difficile, a equipe de enfermagem deve atentar para qual particularidade estrita na higienização das mãos e desinfecção de superfícies?',
        options: [
          { letter: 'A', text: 'O uso exclusivo de álcool gel a 70% é suficiente para erradicar os esporos do C. difficile.' },
          { letter: 'B', text: 'O álcool gel a 70% não é esporicida eficaz; as mãos devem ser lavadas compulsoriamente com água e sabonete líquido, e a desinfecção ambiental deve utilizar produtos à base de cloro/hipoclorito.' },
          { letter: 'C', text: 'O paciente deve ser mantido em precauções para aerossóis com máscara N95.' },
          { letter: 'D', text: 'É dispensável o uso de luvas para manipulação de comadres e fraldas.' }
        ],
        correctAnswer: 'B',
        explanation: 'Os esporos de Clostridioides difficile são imunes à ação do álcool 70%. A remoção física dos esporos exige fricção com água e sabonete. As superfícies exigem desinfetantes clorados ou peracético com ação esporicida.'
      }
    ]
  },

  // ==========================================
  // SIMULADO 06: Saúde da Mulher, Pré-Natal & Obstetrícia
  // ==========================================
  {
    id: 6,
    title: 'Simulado 06 - Saúde da Mulher & Obstetrícia',
    description: 'Pré-natal, cálculo da DPP, síndromes hipertensivas da gestação, parto e hemorragia puerperal.',
    focusArea: 'Saúde da Mulher & Criança',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 601,
        simuladoId: 6,
        difficulty: 'facil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Uma gestante comparece à primeira consulta de pré-natal na Unidade Básica de Saúde e informa que sua Data da Última Menstruação (DUM) foi em 15 de abril de 2026. Aplicando-se a Regra de Naegele (soma 7 dias e subtrai 3 meses), qual será a Data Provável do Parto (DPP)?',
        options: [
          { letter: 'A', text: '22 de janeiro de 2027.' },
          { letter: 'B', text: '22 de janeiro de 2026.' },
          { letter: 'C', text: '08 de dezembro de 2026.' },
          { letter: 'D', text: '15 de janeiro de 2027.' }
        ],
        correctAnswer: 'A',
        explanation: 'Dia: 15 + 7 = 22. Mês: 04 (abril) - 3 = 01 (janeiro do ano subsequente: 2027). Portanto, a DPP calculada é 22 de janeiro de 2027.'
      },
      {
        id: 602,
        simuladoId: 6,
        difficulty: 'facil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Qual o número mínimo de consultas de pré-natal recomendado pelo Ministério da Saúde para assegurar assistência gestacional qualificada no SUS?',
        options: [
          { letter: 'A', text: 'No mínimo 2 consultas.' },
          { letter: 'B', text: 'No mínimo 6 consultas presenciais.' },
          { letter: 'C', text: 'No mínimo 12 consultas semanais.' },
          { letter: 'D', text: 'Apenas 1 consulta trimestral sem acompanhamento laboratorial.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Ministério da Saúde preconiza a realização de no mínimo 6 consultas de pré-natal (idealmente: 1 no primeiro trimestre, 2 no segundo trimestre e 3 no terceiro trimestre).'
      },
      // 3 MÉDIAS
      {
        id: 603,
        simuladoId: 6,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Gestante na 34ª semana de gestação é admitida no pronto atendimento com PA = 160/110 mmHg, cefaleia intensa refratária, escotomas cintilantes (pontos brilhantes na visão) e dor epigástrica em barra. Esse quadro clínico é indicativo de:',
        options: [
          { letter: 'A', text: 'Hipotensão postural fisiológica do terceiro trimestre.' },
          { letter: 'B', text: 'Iminência de Eclâmpsia (Pré-eclâmpsia grave com sinais de descompensação neurológica).' },
          { letter: 'C', text: 'Diabetes Gestacional descompensada.' },
          { letter: 'D', text: 'Depressão pós-parto antecipada.' }
        ],
        correctAnswer: 'B',
        explanation: 'A associação de níveis pressóricos muito elevados (≥ 160/110 mmHg) com queixas neurológicas e visuais (cefaleia, escotomas) e epigastralgia em barra caracteriza a Iminência de Eclâmpsia.'
      },
      {
        id: 604,
        simuladoId: 6,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Qual o fármaco anticonvulsivante de escolha absoluta indicado para a profilaxia e tratamento das crises convulsivas na Pré-eclâmpsia grave e Eclâmpsia?',
        options: [
          { letter: 'A', text: 'Diazepam 10 mg endovenoso.' },
          { letter: 'B', text: 'Sulfato de Magnésio (MgSO4).' },
          { letter: 'C', text: 'Fenobarbital sódico.' },
          { letter: 'D', text: 'Carbamazepina suspensão.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Sulfato de Magnésio é a droga de eleição mundial para prevenção e controle das convulsões eclampticas (esquemas de Pritchard ou Zuspan).'
      },
      {
        id: 605,
        simuladoId: 6,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Segundo as Diretrizes do Ministério da Saúde e do INCA para rastreamento do Câncer de Colo Uterino, qual a faixa etária recomendada e a periodicidade preconizada para o exame citopatológico (Papanicolau)?',
        options: [
          { letter: 'A', text: 'Mulheres de 12 a 30 anos semestralmente.' },
          { letter: 'B', text: 'Mulheres de 25 a 64 anos que já iniciaram vida sexual: anualmente e, após 2 resultados normais consecutivos, a cada 3 anos.' },
          { letter: 'C', text: 'Exclusivamente após a menopausa aos 65 anos de idade a cada 5 anos.' },
          { letter: 'D', text: 'Mulheres a partir de 18 anos a cada 6 meses ininterruptamente.' }
        ],
        correctAnswer: 'B',
        explanation: 'A população-alvo prioritária é a faixa etária de 25 a 64 anos. Após dois exames anuais consecutivos sem alterações, o intervalo passa a ser trienal.'
      },
      // 5 DIFÍCEIS
      {
        id: 606,
        simuladoId: 6,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Durante a infusão contínua de Sulfato de Magnésio em uma gestante em iminência de eclâmpsia, a equipe de enfermagem deve monitorar estritamente sinais de intoxicação magnésica. Quais parâmetros exigem interrupção IMEDIATA da infusão e qual o antídoto a ser administrado prontamente?',
        options: [
          { letter: 'A', text: 'Hipertermia > 38°C e taquicardia; antídoto: Paracetamol EV.' },
          { letter: 'B', text: 'Abolição do reflexo patelar (arreflexia), frequência respiratória < 12 rpm e diurese < 25 mL/h; antídoto: Gluconato de Cálcio a 10% IV lento.' },
          { letter: 'C', text: 'Glicemia capilar > 200 mg/dL e vômitos; antídoto: Insulina Regular.' },
          { letter: 'D', text: 'Hipotensão isolada transitória; antídoto: Cloreto de Potássio 10%.' }
        ],
        correctAnswer: 'B',
        explanation: 'Sinais de toxicidade do magnésio: reflexo patelar ausente (surge primeiro), bradipneia (< 12 rpm) e oligúria (< 25 mL/h). A conduta é interromper a infusão e infundir 10 mL de Gluconato de Cálcio 10% EV lento.'
      },
      {
        id: 607,
        simuladoId: 6,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'No puerpério imediato após parto vaginal, a puérpera apresenta sangramento vaginal maciço (> 1000 mL) com útero amolecido, hipotônico e palpável acima da cicatriz umbilical. Qual a causa mais frequente dessa Hemorragia Pós-Parto (HPP) e a primeira intervenção física de emergência recomendada?',
        options: [
          { letter: 'A', text: 'Laceração de canal de parto não suturada; aplicação de bolsa de gelo perineal.' },
          { letter: 'B', text: 'Atonia uterina; realização imediata de massagem bimanual uterina (Manobra de Hamilton) associada a ocitócicos conforme protocolo.' },
          { letter: 'C', text: 'Inversão uterina de 4º grau; colocação de tampão ginecológico compressivo seco.' },
          { letter: 'D', text: 'Coagulopatia congênita; infusão de albumina humana a 20%.' }
        ],
        correctAnswer: 'B',
        explanation: 'A atonia uterina responde por 70-80% das causas de hemorragia pós-parto. A conduta física inicial é a massagem uterina contínua (para promover a contração miometrial) aliada à infusão de Ocitocina e outros uterotônicos.'
      },
      {
        id: 608,
        simuladoId: 6,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'A Síndrome HELLP é uma complicação obstétrica grave e potencialmente letal associada à pré-eclâmpsia severa. O acrônimo HELLP refere-se a quais achados laboratoriais característicos?',
        options: [
          { letter: 'A', text: 'Hemólise microangiopática (H), Elevação de enzimas hepáticas (EL) e Plaquetopenia / Baixa contagem de plaquetas (LP < 100.000/mm³).' },
          { letter: 'B', text: 'Hiperglicemia materna (H), Edema pulmonar (EL) e Leucocitose intensa (LP).' },
          { letter: 'C', text: 'Hepatite infecciosa viral (H), Eosinofilia (EL) e Linfocitopenia (LP).' },
          { letter: 'D', text: 'Hipercalcemia aguda (H), Enterite ulcerativa (EL) e Lipidúria nefrótica (LP).' }
        ],
        correctAnswer: 'A',
        explanation: 'H = Hemolysis (esquizócitos, bilirrubina alta); EL = Elevated Liver enzymes (TGO/TGP elevadas); LP = Low Platelets (< 100.000/mm³).'
      },
      {
        id: 609,
        simuladoId: 6,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'A prática obstétrica histórica de realizar pressão manual forçada sobre o fundo do útero durante o período expulsivo para acelerar o nascimento fetal é conhecida na enfermagem obstétrica por qual nome e qual sua classificação técnica de segurança?',
        options: [
          { letter: 'A', text: 'Manobra de Leopold; conduta benéfica e incentivada pelo SUS.' },
          { letter: 'B', text: 'Manobra de Kristeller; conduta PROIBIDA e considerada violência obstétrica com risco de ruptura uterina e hipóxia fetal.' },
          { letter: 'C', text: 'Manobra de McRoberts; protocolo compulsório para todos os partos normais.' },
          { letter: 'D', text: 'Manobra de Ritgen; manobra realizada exclusivamente pela gestante.' }
        ],
        correctAnswer: 'B',
        explanation: 'A manobra de Kristeller é formalmente condenada pela OMS, Ministério da Saúde e Diretrizes Obstétricas, por provocar rotura uterina, inversão uterina, lesões viscerais maternas e tocotraumatismos fetais graves.'
      },
      {
        id: 610,
        simuladoId: 6,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Durante a assistência ao trabalho de parto, a monitorização dos Batimentos Cardiofetais (BCF) é vital. Qual é a faixa de normalidade dos BCF em um feto a termo em repouso e qual achado indica sofrimento fetal agudo?',
        options: [
          { letter: 'A', text: 'Normal: 60 a 90 bpm; sofrimento: BCF em 80 bpm.' },
          { letter: 'B', text: 'Normal: 110 a 160 bpm; sofrimento: desacelerações tardias tipo DIP II repetidas ou bradicardia sustentada < 110 bpm.' },
          { letter: 'C', text: 'Normal: 170 a 220 bpm; sofrimento: BCF em 180 bpm.' },
          { letter: 'D', text: 'Normal: 90 a 110 bpm; não existe padrão de alarme preconizado.' }
        ],
        correctAnswer: 'B',
        explanation: 'A frequência cardíaca fetal basal normal situa-se entre 110 e 160 bpm. Desacelerações tardias (DIP II) associadas a contrações indicam hipóxia placentária e risco fetal iminente.'
      }
    ]
  },

  // ==========================================
  // SIMULADO 07: Saúde da Criança, Neonatologia & Apgar
  // ==========================================
  {
    id: 7,
    title: 'Simulado 07 - Saúde da Criança & Neonatologia',
    description: 'Escala de Apgar, reanimação neonatal, teste do pezinho, aleitamento materno e marcos do desenvolvimento.',
    focusArea: 'Saúde da Mulher & Criança',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 701,
        simuladoId: 7,
        difficulty: 'facil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'A Escala de Apgar é uma ferramenta clínica empregada no 1º e no 5º minuto de vida do recém-nascido. Quais são os 5 parâmetros avaliados nessa escala?',
        options: [
          { letter: 'A', text: 'Peso, Comprimento, Perímetro Cefálico, Temperatura e Tipo Sanguíneo.' },
          { letter: 'B', text: 'Frequência Cardíaca, Esforço Respiratório, Tônus Muscular, Irritabilidade Reflexa e Cor da Pele (Aparência).' },
          { letter: 'C', text: 'Glicemia capilar, Pressão arterial sistólica, Diurese, Mecônio e Choro.' },
          { letter: 'D', text: 'Reflexo de sucção, Reflexo de preensão palmar, Reflexo de Moro, Pupilas e Edema.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Apgar avalia FC, Respiração, Tônus, Resposta a estímulos (reflexos) e Cor/Coloração cutânea, pontuando cada item de 0 a 2 (total 0 a 10).'
      },
      {
        id: 702,
        simuladoId: 7,
        difficulty: 'facil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Qual o período ideal preconizado pelo Programa Nacional de Triagem Neonatal do Ministério da Saúde para a realização da coleta de sangue do Teste do Pezinho?',
        options: [
          { letter: 'A', text: 'Ainda nas primeiras 6 horas de vida antes do primeiro banho.' },
          { letter: 'B', text: 'Entre o 3º e o 5º dia de vida do bebê (após início da alimentação láctea).' },
          { letter: 'C', text: 'Somente após o 30º dia de vida na primeira consulta pediátrica.' },
          { letter: 'D', text: 'Exclusivamente aos 6 meses de vida na introdução alimentar.' }
        ],
        correctAnswer: 'B',
        explanation: 'A janela ótima de coleta é entre o 3º e o 5º dia de vida. A coleta muito precoce (< 48h) pode resultar em falsos-negativos para distúrbios metabólicos como fenilcetonúria.'
      },
      // 3 MÉDIAS
      {
        id: 703,
        simuladoId: 7,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Recém-nascido a termo no primeiro minuto de vida apresenta: FC = 120 bpm (2), choro vigoroso e respiração regular (2), movimentos ativos com membros fletidos (2), tosse ao estímulo de aspiração (2) e corpo rosado com extremidades cianóticas (acrocianose) (1). Qual a pontuação de Apgar desse neonato?',
        options: [
          { letter: 'A', text: 'Apgar 6.' },
          { letter: 'B', text: 'Apgar 8.' },
          { letter: 'C', text: 'Apgar 9.' },
          { letter: 'D', text: 'Apgar 10.' }
        ],
        correctAnswer: 'C',
        explanation: 'FC > 100 (2) + Choro vigoroso (2) + Movimento ativo (2) + Tosse/espirro ao estímulo (2) + Acrocianose/extremidades arroxeadas (1) = Total 9.'
      },
      {
        id: 704,
        simuladoId: 7,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Na sala de parto, para prevenir a Doença Hemorrágica do Recém-Nascido decorrente da imaturidade hepática e ausência transitória de flora bacteriana sintetizadora, qual intervenção medicamentosa de rotina é realizada por via intramuscular?',
        options: [
          { letter: 'A', text: 'Sulfato Ferroso 5 mg.' },
          { letter: 'B', text: 'Fitomenadiona (Vitamina K1) 1 mg IM no vasto lateral da coxa.' },
          { letter: 'C', text: 'Ácido Fólico 10 mg oral.' },
          { letter: 'D', text: 'Vitamina D3 em gotas sublinguais.' }
        ],
        correctAnswer: 'B',
        explanation: 'A administração profilática de Vitamina K1 (1 mg IM no vasto lateral da coxa) evita a hemorragia neonatal precoce e tardia por deficiência de protrombina e fatores dependentes.'
      },
      {
        id: 705,
        simuladoId: 7,
        difficulty: 'media',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Qual profilaxia ocular é preconizada logo após o nascimento para prevenção da conjuntivite gonocócica (oftalmia neonatal transmitida no canal de parto) e qual solução é tradicionalmente usada no método de Credé?',
        options: [
          { letter: 'A', text: 'Álcool a 70% estéril em gaze.' },
          { letter: 'B', text: 'Nitrato de Prata a 1% (ou colírios de eritromicina/tetraciclina).' },
          { letter: 'C', text: 'Clorexidina alcoólica a 0,5% ocular.' },
          { letter: 'D', text: 'Soro glicosado a 50% instilado na esclera.' }
        ],
        correctAnswer: 'B',
        explanation: 'O método de Credé consiste na instilação de 1 gota de Nitrato de Prata a 1% em cada olho na primeira hora de vida para prevenir a oftalmia causada por Neisseria gonorrhoeae.'
      },
      // 5 DIFÍCEIS
      {
        id: 706,
        simuladoId: 7,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Segundo as Diretrizes de Reanimação Neonatal da Sociedade Brasileira de Pediatria (SBP), ao nascer um recém-nascido a termo não chora e apresenta tônus muscular flácido. Após os passos iniciais sob fonte de calor radiante (prover calor, posicionar a via aérea, aspirar se necessário e secar) em até 30 segundos, o neonato permanece em apneia com FC < 100 bpm. Qual a conduta IMEDIATA recomendada no chamado "minuto de ouro"?',
        options: [
          { letter: 'A', text: 'Iniciar compressões torácicas com a técnica dos dois polegares na proporção 3:1.' },
          { letter: 'B', text: 'Iniciar Ventilação com Pressão Positiva (VPP) com máscara facial e balão autoinflável em ar ambiente (21%) na frequência de 40 a 60 rpm.' },
          { letter: 'C', text: 'Infundir Epinefrina endovenosa via cateterismo da veia umbilical de emergência.' },
          { letter: 'D', text: 'Realizar desfibrilação precoce de 2 Joules/kg com pás infantis.' }
        ],
        correctAnswer: 'B',
        explanation: 'A medida mais importante na reanimação neonatal é a Ventilação com Pressão Positiva (VPP). Em RN a termo, inicia-se em ar ambiente (O2 a 21%) por 30 segundos com monitorização por oxímetro e ECG.'
      },
      {
        id: 707,
        simuladoId: 7,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'No aleitamento materno, para avaliar a mamada eficaz e prevenir fissuras mamilares dolorosas e ingurgitamento, a equipe de enfermagem deve orientar os sinais de "pega correta". Dentre as opções abaixo, assinale a que descreve sinais fidedignos de BOA PEGA:',
        options: [
          { letter: 'A', text: 'Boca pouco aberta, lábio inferior invertido para dentro e ruídos audíveis de estalidos de língua durante a sucção.' },
          { letter: 'B', text: 'Boca bem aberta em formato de boca de peixe, lábio inferior evertido, queixo tocando a mama materna, bochechas arredondadas (não encovadas) e mais aréola visível acima do que abaixo da boca.' },
          { letter: 'C', text: 'Preensão exclusiva do mamilo com tração para fora e sucção ruidosa sem deglutição.' },
          { letter: 'D', text: 'Mãe com dor intensa contínua e perda de líquido pelos cantos da boca do recém-nascido.' }
        ],
        correctAnswer: 'B',
        explanation: 'Sinais de pega adequada: boca bem aberta, lábios evertidos ("boca de peixinho"), queixo encostado na mama, bochechas cheias e ausência de dor mamilar materna.'
      },
      {
        id: 708,
        simuladoId: 7,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Um recém-nascido de 48 horas de vida apresenta icterícia fisiológica da zona 1 de Kramer (apenas na cabeça e pescoço). Qual é o mecanismo fisiopatológico primário da icterícia fisiológica neonatal e quando ela costuma regredir?',
        options: [
          { letter: 'A', text: 'Atresia congênita de vias biliares com indicação cirúrgica imediata.' },
          { letter: 'B', text: 'Hiperbilirrubinemia indireta decorrente da maior massa de hemácias de menor sobrevida, associada à imaturidade temporária da enzima hepática glicuroniltransferase, regredindo por volta do 7º ao 10º dia.' },
          { letter: 'C', text: 'Incompatibilidade Rh grave com necessidade de exsanguineotransfusão imediata.' },
          { letter: 'D', text: 'Infecção por citomegalovírus com esteatose hepática fulminante.' }
        ],
        correctAnswer: 'B',
        explanation: 'A icterícia fisiológica do neonato surge após as primeiras 24 horas de vida, deve-se à imaturidade da glucuroniltransferase e degradação da hemoglobina fetal, com curso benigno e autolimitado.'
      },
      {
        id: 709,
        simuladoId: 7,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'A Escala de Silverman-Andersen é amplamente empregada nas UTIs neonatais. Qual a finalidade primordial dessa escala e qual o significado de uma pontuação alta?',
        options: [
          { letter: 'A', text: 'Avaliar a maturidade neurológica gestacional; quanto maior a nota, mais maduro o bebê.' },
          { letter: 'B', text: 'Mensurar o desconforto/dificuldade respiratória do recém-nascido; ao contrário do Apgar, quanto maior a nota (máximo 10), mais severo é o desconforto respiratório.' },
          { letter: 'C', text: 'Classificar o grau de icterícia cutânea em 5 zonas corpóreas.' },
          { letter: 'D', text: 'Medir a resposta hemodinâmica após administração de surfactante exógeno.' }
        ],
        correctAnswer: 'B',
        explanation: 'Avalia tiragem intercostal, retração xifoide, batimento de asas nasais, gemido expiratório e movimento toracoabdominal. Quanto mais alta a pontuação, maior a gravidade do desconforto respiratório.'
      },
      {
        id: 710,
        simuladoId: 7,
        difficulty: 'dificil',
        subject: 'Saúde da Mulher & Criança',
        statement: 'Durante a reanimação cardiopulmonar de um recém-nascido em que a frequência cardíaca permanece persistentemente abaixo de 60 bpm após 30 segundos de VPP eficaz com tubo traqueal e oxigênio a 100%, qual a técnica de compressão torácica e a relação compressão-ventilação preconizadas pela SBP?',
        options: [
          { letter: 'A', text: 'Compressões com uma única mão na relação 30:2.' },
          { letter: 'B', text: 'Técnica dos dois polegares sobrepostos no terço inferior do esterno, na relação de 3 compressões para 1 ventilação (3:1), totalizando 90 compressões e 30 ventilações por minuto.' },
          { letter: 'C', text: 'Técnica de duas mãos espalmadas na relação 15:2 contínua.' },
          { letter: 'D', text: 'Ventilações exclusivas sem compressão torácica por 5 minutos.' }
        ],
        correctAnswer: 'B',
        explanation: 'Na RCP neonatal, a técnica preferencial é a dos dois polegares envolvendo o tórax. A relação é de 3:1 (3 compressões sincronizadas com 1 ventilação a cada ciclo de 2 segundos, totalizando 120 eventos/min).'
      }
    ]
  },

  // ==========================================
  // SIMULADO 08: Enfermagem Médico-Cirúrgica & Feridas
  // ==========================================
  {
    id: 8,
    title: 'Simulado 08 - Enfermagem Médico-Cirúrgica & Feridas',
    description: 'Cuidados pré e pós-operatórios, drenos de tórax, classificação de lesão por pressão e coberturas de feridas.',
    focusArea: 'Médico-Cirúrgica',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 801,
        simuladoId: 8,
        difficulty: 'facil',
        subject: 'Médico-Cirúrgica',
        statement: 'De acordo com a classificação internacional do NPUAP/EPUAP, como se caracteriza uma Lesão por Pressão (LPP) de Estágio 1?',
        options: [
          { letter: 'A', text: 'Perda total da espessura da pele com exposição muscular visível.' },
          { letter: 'B', text: 'Pele íntegra com área localizada de eritema que não embranquece após alívio da pressão.' },
          { letter: 'C', text: 'Flictena (bolha) com conteúdo purulento e necrose escura de coagulação.' },
          { letter: 'D', text: 'Exposição direta do periósteo ósseo com drenagem contínua.' }
        ],
        correctAnswer: 'B',
        explanation: 'No Estágio 1, a integridade da pele permanece preservada, mas há eritema não branqueável em proeminência óssea, sinalizando isquemia tecidual inicial reversível com descompressão.'
      },
      {
        id: 802,
        simuladoId: 8,
        difficulty: 'facil',
        subject: 'Médico-Cirúrgica',
        statement: 'Qual o cuidado primordial indispensável com o frasco coletor do sistema de Dreno de Tórax com Selo d’Água durante a movimentação e transporte do paciente no hospital?',
        options: [
          { letter: 'A', text: 'Manter o frasco permanentemente acima do tórax do paciente sobre a maca.' },
          { letter: 'B', text: 'Manter o frasco coletor sempre ABAIXO do nível do tórax do paciente e o tubo em selo d’água submerso.' },
          { letter: 'C', text: 'Clampar o dreno ininterruptamente com duas pinças durante todo o transporte.' },
          { letter: 'D', text: 'Esvaziar o selo d’água e deixar o frasco completamente seco e aberto ao ar.' }
        ],
        correctAnswer: 'B',
        explanation: 'O frasco deve permanecer sempre abaixo do nível do tórax para que o líquido não refluir por gravidade para a cavidade pleural. Clampar rotineiramente pode causar pneumotórax hipertensivo por retenção de ar.'
      },
      // 3 MÉDIAS
      {
        id: 803,
        simuladoId: 8,
        difficulty: 'media',
        subject: 'Médico-Cirúrgica',
        statement: 'Na avaliação de feridas cavitárias crônicas com moderado a abundante exsudato purulento ou sero-hemático e sangramento fácil, qual é a cobertura primária com propriedades hemostáticas e de alta absorção indicada?',
        options: [
          { letter: 'A', text: 'Filme transparente de poliuretano.' },
          { letter: 'B', text: 'Alginato de Cálcio (ou Alginato de Cálcio e Sódio).' },
          { letter: 'C', text: 'Hidrogel amorfo desidratante.' },
          { letter: 'D', text: 'Gaze seca simples sem cobertura secundária.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Alginato de Cálcio é derivado de algas marinhas e tem enorme capacidade de absorver exsudato pesado, convertendo-se em gel e auxiliando na hemostasia pelo aporte local de íons cálcio.'
      },
      {
        id: 804,
        simuladoId: 8,
        difficulty: 'media',
        subject: 'Médico-Cirúrgica',
        statement: 'Qual a indicação clínica prioritária da cobertura de Hidrogel no tratamento de lesões teciduais cutâneas?',
        options: [
          { letter: 'A', text: 'Contenção de grandes hemorragias arteriais de membros.' },
          { letter: 'B', text: 'Promoção de desbridamento autolítico de tecidos necróticos secos (escaras/esfacelos) e hidratação do leito lesional.' },
          { letter: 'C', text: 'Absorção de grandes volumes de secreção purulenta em fístulas.' },
          { letter: 'D', text: 'Isolamento bacteriano estrito em queimaduras de 3º grau extensas.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Hidrogel é composto em sua maioria por água. Ele doa umidade para crostas e tecidos necróticos secos, permitindo que as enzimas próprias do organismo (autólise) amoleçam e degradem o tecido desvitalizado.'
      },
      {
        id: 805,
        simuladoId: 8,
        difficulty: 'media',
        subject: 'Médico-Cirúrgica',
        statement: 'A Escala de Braden é amplamente empregada no plano de cuidados de enfermagem. Quais são as 6 subescalas avaliadas nessa ferramenta preditiva?',
        options: [
          { letter: 'A', text: 'Dor, Pulso, Respiração, Temperatura, PA e Glicemia.' },
          { letter: 'B', text: 'Percepção sensorial, Umidade da pele, Atividade física, Mobilidade no leito, Nutrição e Fricção/Cisalhamento.' },
          { letter: 'C', text: 'Glasgow, Reflexo pupilar, Diurese, Força motora, Marcha e Fala.' },
          { letter: 'D', text: 'Idade, Peso, Altura, IMC, Hemoglobina e Contagem de plaquetas.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Escala de Braden varia de 6 a 23 pontos. Menor escore (≤ 12 pontos) denota alto risco de desenvolvimento de Lesão por Pressão (LPP).'
      },
      // 5 DIFÍCEIS
      {
        id: 806,
        simuladoId: 8,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Na Sala de Recuperação Pós-Anestésica (SRPA), qual índice de avaliação de prontidão de alta para a enfermaria é rotineiramente utilizado pela equipe de enfermagem e quais critérios determinam a segurança para a transferência?',
        options: [
          { letter: 'A', text: 'Escala de Morse com nota zero.' },
          { letter: 'B', text: 'Índice de Aldrete e Kroulik com pontuação mínima igual ou superior a 8 a 9 pontos (avaliando atividade motora, respiração, circulação/PA, consciência e saturação de O2).' },
          { letter: 'C', text: 'Escala de Braden acima de 20 pontos exclusivamente.' },
          { letter: 'D', text: 'Escala de Ramsay pontuada em nível 6 (sono profundo sem resposta).' }
        ],
        correctAnswer: 'B',
        explanation: 'O Índice de Aldrete e Kroulik avalia 5 parâmetros objetivos após anestesia geral ou regional; o paciente só recebe alta para a unidade de internação após atingir nota 8, 9 ou 10.'
      },
      {
        id: 807,
        simuladoId: 8,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Em um paciente portador de dreno torácico conectado a selo d’água sob drenagem de pneumotórax, a oscilação do nível líquido no tubo com as fases da respiração (subindo na inspiração e descendo na expiração espontânea) indica:',
        options: [
          { letter: 'A', text: 'Obstrução mecânica total do sistema por coágulos de fibrina.' },
          { letter: 'B', text: 'Funcionamento e perviedade adequados do dreno e comunicação livre com a cavidade pleural.' },
          { letter: 'C', text: 'Fístula broncopleural catastrófica que exige clampeamento imediato.' },
          { letter: 'D', text: 'Perfuração acidental do diafragma pelo cateter.' }
        ],
        correctAnswer: 'B',
        explanation: 'A oscilação da coluna líquida sincronizada com os ciclos respiratórios é normal e comprova que o dreno está pérvio e desobstruído. A interrupção da oscilação indica ou reexpansão pulmonar completa ou obstrução do dreno.'
      },
      {
        id: 808,
        simuladoId: 8,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Um paciente no 4º dia pós-operatório de laparotomia exploradora apresenta tosse vigorosa repentina no leito e relata sensação de "rasgo" na ferida operatória. Ao retirar o curativo, o técnico depara-se com deiscência total da sutura da parede abdominal e alças intestinais protusas expostas ao meio externo (Evisceração). Qual a assistência de enfermagem IMEDIATA?',
        options: [
          { letter: 'A', text: 'Tentar reintroduzir delicadamente as alças intestinais na cavidade com as mãos enluvadas.' },
          { letter: 'B', text: 'Cobrir imediatamente as vísceras expostas com compressas estéreis umedecidas em solução salina (soro fisiológico 0,9%) morna, posicionar o paciente em Fowler baixo com joelhos fletidos, manter jejum estrito e chamar com urgência o cirurgião.' },
          { letter: 'C', text: 'Aplicar fita adesiva microporosa de alta pressão aproximando as bordas e liberar deambulação.' },
          { letter: 'D', text: 'Despejar álcool iodado diretamente sobre as alças para assepsia de emergência.' }
        ],
        correctAnswer: 'B',
        explanation: 'Nunca se deve tentar empurrar as alças de volta (risco de perfuração e contaminação). Deve-se mantê-las protegidas com compressa estéril úmida morna, joelhos flexionados (diminui a tensão abdominal) e preparo imediato para o centro cirúrgico.'
      },
      {
        id: 809,
        simuladoId: 8,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Na preparação pré-operatória de um paciente cirúrgico, qual a recomendação das Diretrizes de Cirurgia Segura da OMS e do Colégio Brasileiro de Cirurgiões quanto à tricotomia (remoção de pelos)?',
        options: [
          { letter: 'A', text: 'Deve ser realizada na véspera da cirurgia com lâmina de barbear manual convencional em toda a extensão do corpo.' },
          { letter: 'B', text: 'A tricotomia não deve ser realizada rotineiramente; quando estritamente necessária, deve ser feita o mais próximo possível do momento da cirurgia, utilizando tricotomizador elétrico com lâmina descartável (nunca lâmina cortante).' },
          { letter: 'C', text: 'A tricotomia deve ser evitada sempre com cera depilatória quente 48h antes.' },
          { letter: 'D', text: 'É obrigatório o raspamento de toda a pelagem axilar e pubiana para qualquer procedimento cirúrgico.' }
        ],
        correctAnswer: 'B',
        explanation: 'A lâmina cortante de barbear cria microfissuras na epiderme que são colonizadas rapidamente por bactérias e elevam muito o risco de infecção do sítio cirúrgico. Deve-se usar tricotomizador elétrico imediatamente antes do procedimento.'
      },
      {
        id: 810,
        simuladoId: 8,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Na profilaxia mecânica e farmacológica de Tromboembolismo Venoso (TEV/TVP) no período perioperatório de cirurgias ortopédicas de grande porte em pacientes de alto risco, quais intervenções combinadas são padrão-ouro recomendadas?',
        options: [
          { letter: 'A', text: 'Repouso absoluto prolongado no leito por 14 dias sem mobilização.' },
          { letter: 'B', text: 'Uso de meias elásticas de compressão graduada, compressão pneumática intermitente dos membros inferiores, deambulação precoce estimulada e Heparina de Baixo Peso Molecular (Enoxaparina) conforme prescrição médica.' },
          { letter: 'C', text: 'Aplicação contínua de torniquete frouxo no membro operado.' },
          { letter: 'D', text: 'Administração de diuréticos de alça em alta dosagem para evitar edema periférico.' }
        ],
        correctAnswer: 'B',
        explanation: 'A associação de medidas mecânicas (compressão pneumática, meias elásticas e deambulação precoce) com anticoagulação profilática (HBPM) reduz drasticamente as taxas de TVP e tromboembolismo pulmonar (TEP).'
      }
    ]
  },

  // ==========================================
  // SIMULADO 09: Imunização & Saúde Pública
  // ==========================================
  {
    id: 9,
    title: 'Simulado 09 - Imunização & Saúde Coletiva',
    description: 'Calendário Nacional de Vacinação do SUS, conservação na rede de frio, vias e eventos adversos pós-vacinais.',
    focusArea: 'Saúde Coletiva & Vacinas',
    timeLimitMinutes: 20,
    questions: [
      // 2 FÁCEIS
      {
        id: 901,
        simuladoId: 9,
        difficulty: 'facil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Quais vacinas do Calendário Nacional do SUS devem ser administradas ao recém-nascido preferencialmente nas primeiras 12 horas de vida ainda na maternidade?',
        options: [
          { letter: 'A', text: 'Vacina Pentavalente e Rotavírus.' },
          { letter: 'B', text: 'Vacina BCG (Dose única) e Vacina contra a Hepatite B (Dose ao nascer).' },
          { letter: 'C', text: 'Vacina Febre Amarela e Varicela.' },
          { letter: 'D', text: 'Vacina Meningocócica C e Pneumocócica 10-valente.' }
        ],
        correctAnswer: 'B',
        explanation: 'Na maternidade, o recém-nascido deve receber a BCG (previne formas graves de tuberculose miliar e meníngea) e a 1ª dose da vacina contra Hepatite B recombinante.'
      },
      {
        id: 902,
        simuladoId: 9,
        difficulty: 'facil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Qual é a faixa ideal e padrão de temperatura para o armazenamento e conservação dos imunobiológicos nas geladeiras e câmaras refrigeradas da sala de vacinas (Rede de Frio)?',
        options: [
          { letter: 'A', text: '-20 °C a -10 °C.' },
          { letter: 'B', text: '+2 °C a +8 °C (com temperatura ideal alvo em +5 °C).' },
          { letter: 'C', text: '+10 °C a +15 °C.' },
          { letter: 'D', text: '+18 °C a +24 °C (temperatura ambiente de sala).' }
        ],
        correctAnswer: 'B',
        explanation: 'A Rede de Frio do Programa Nacional de Imunizações (PNI) estabelece que as vacinas devem ser mantidas rigorosamente entre +2°C e +8°C na atenção primária.'
      },
      // 3 MÉDIAS
      {
        id: 903,
        simuladoId: 9,
        difficulty: 'media',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'A vacina BCG é administrada por via intradérmica estrita no braço direito. Qual a evolução esperada e fisiológica da lesão vacinal ao longo das semanas no local de aplicação?',
        options: [
          { letter: 'A', text: 'Formação imediata de hematoma com necrose que não cicatriza.' },
          { letter: 'B', text: 'Pápula imediata -> Mácula -> Pústula -> Crosta -> Úlcera -> Cicatriz esbranquiçada permanente.' },
          { letter: 'C', text: 'Ausência total de qualquer reação local ou cutânea visível.' },
          { letter: 'D', text: 'Bolha hemorrágica generalizada em todo o membro superior.' }
        ],
        correctAnswer: 'B',
        explanation: 'A evolução local típica inicia-se com pápula de injeção esbranquiçada, tornando-se mácula avermelhada, nódulo, pústula, ulceração de 4 a 6 mm e cicatriz característica em até 6 a 12 semanas.'
      },
      {
        id: 904,
        simuladoId: 9,
        difficulty: 'media',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Quais doenças infecciosas graves são prevenidas pela administração da Vacina Pentavalente no calendário infantil aos 2, 4 e 6 meses de vida?',
        options: [
          { letter: 'A', text: 'Varicela, Sarampo, Caxumba, Rubéola e Dengue.' },
          { letter: 'B', text: 'Difteria, Tétano, Coqueluche, Hepatite B e infecções por Haemophilus influenzae tipo b.' },
          { letter: 'C', text: 'Poliomielite, Febre Amarela, Raiva, Hepatite A e Tuberculose.' },
          { letter: 'D', text: 'Meningite meningocócica B e C, Rotavírus, Pneumonia e Gripe.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Pentavalente protege conjuntamente contra Difteria, Tétano, Pertussis (Coqueluche), Hepatite B e infecções invasivas (meningite/pneumonia) pelo Hib.'
      },
      {
        id: 905,
        simuladoId: 9,
        difficulty: 'media',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'No Brasil, segundo as atualizações recentes do Ministério da Saúde para o Programa Nacional de Imunizações (PNI), qual a diretriz adotada em relação à vacinação contra a Poliomielite?',
        options: [
          { letter: 'A', text: 'Substituição completa das gotinhas (VOP atenuada) pela Vacina Inativada contra a Poliomielite (VIP injetável) em todas as doses e reforços.' },
          { letter: 'B', text: 'Suspensão definitiva de qualquer vacina contra a poliomielite pela erradicação global.' },
          { letter: 'C', text: 'Uso exclusivo da VOP oral a cada 30 dias até os 10 anos de idade.' },
          { letter: 'D', text: 'Aplicação apenas por via intradérmica no antebraço esquerdo.' }
        ],
        correctAnswer: 'A',
        explanation: 'O Brasil realizou a transição definitiva para o esquema 100% injetável com a vacina inativada (VIP), eliminando o risco residual de poliovírus vacinal derivado da vacina oral atenuada (VOP).'
      },
      // 5 DIFÍCEIS
      {
        id: 906,
        simuladoId: 9,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'A vacina contra o Papilomavírus Humano (HPV) quadrivalente no SUS foi atualizada para esquema de dose única no Programa Nacional de Imunizações. Qual o público-alvo prioritário na rotina do SUS e qual o objetivo principal dessa imunização?',
        options: [
          { letter: 'A', text: 'Idosos acima de 65 anos; prevenção de herpes zóster.' },
          { letter: 'B', text: 'Meninas e meninos na faixa etária de 9 a 14 anos; prevenção contra os subtipos 6, 11, 16 e 18 causadores de câncer de colo do útero, pênis, ânus, orofaringe e verrugas anogenitais.' },
          { letter: 'C', text: 'Apenas mulheres adultas no período gravídico.' },
          { letter: 'D', text: 'Recém-nascidos prematuros com peso inferior a 2 kg.' }
        ],
        correctAnswer: 'B',
        explanation: 'O SUS universalizou a vacina HPV quadrivalente em dose única para meninas e meninos de 9 a 14 anos, além de grupos especiais (imunossuprimidos, vítimas de violência) até os 45 anos.'
      },
      {
        id: 907,
        simuladoId: 9,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Na organização e conservação de imunobiológicos na geladeira de sala de vacinas (tipo convencional ou refrigerador específico), qual conduta de armazenamento é rigorosamente PROIBIDA segundo o Manual de Rede de Frio do PNI?',
        options: [
          { letter: 'A', text: 'Colocar termômetro digital de máxima e mínima na prateleira central.' },
          { letter: 'B', text: 'Armazenar vacinas nas prateleiras da porta da geladeira ou armazenar alimentos, refrigerantes ou medicamentos na mesma geladeira das vacinas.' },
          { letter: 'C', text: 'Registrar a temperatura de controle duas vezes ao dia (início e término do expediente).' },
          { letter: 'D', text: 'Organizar frascos em bandejas perfuradas sem encostar nas paredes laterais.' }
        ],
        correctAnswer: 'B',
        explanation: 'A porta da geladeira sofre oscilações térmicas extremas com a abertura constante, sendo expressamente proibido colocar vacinas ali. É igualmente proibido armazenar comida ou bebidas com os imunobiológicos.'
      },
      {
        id: 908,
        simuladoId: 9,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Após a administração da vacina Tríplice Viral (Sarampo, Caxumba e Rubéola) aos 12 meses de vida, qual período pós-vacinal médio costuma apresentar eventos adversos sistêmicos comuns (febre e exantema) decorrentes da multiplicação do vírus atenuado?',
        options: [
          { letter: 'A', text: 'Nos primeiros 10 minutos após a injeção exclusivamente.' },
          { letter: 'B', text: 'Entre o 5º e o 12º dia após a vacinação (período de viremia vacinal dos componentes sarampo e rubéola).' },
          { letter: 'C', text: 'Após 90 dias da injeção vacinal.' },
          { letter: 'D', text: 'A vacina com vírus atenuado nunca produz febre secundária em crianças.' }
        ],
        correctAnswer: 'B',
        explanation: 'Como se trata de vacina de vírus vivos atenuados, a replicação biológica atinge pico entre o 5º e o 12º dia pós-vacina, podendo manifestar febre passageira e manchas avermelhadas discretas na pele.'
      },
      {
        id: 909,
        simuladoId: 9,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Em um lactente de 2 meses que comparece à sala de vacinação com histórico de episódio hipotônico-hiporresponsivo (EHH) grave ou convulsão febril após a aplicação de dose prévia de vacina celular contra coqueluche, qual a conduta preconizada pelo CRIE (Centro de Referência para Imunobiológicos Especiais)?',
        options: [
          { letter: 'A', text: 'Suspender totalmente a vacinação de qualquer imunobiológico da infância.' },
          { letter: 'B', text: 'Substituir a vacina DTP/Penta celular pela vacina acelular (DTPa ou Penta acelular), por ter menor reatogenicidade associada ao componente pertussis.' },
          { letter: 'C', text: 'Manter a mesma vacina de células inteiras em dose quadruplicada.' },
          { letter: 'D', text: 'Prescrever antibiótico profilático e aplicar a mesma vacina no deltoide.' }
        ],
        correctAnswer: 'B',
        explanation: 'O EHH e convulsões febris após vacina de células inteiras são indicações formais para concessão da vacina DTP acelular nos CRIEs, que possui taxa de eventos neurológicos adversos drasticamente inferior.'
      },
      {
        id: 910,
        simuladoId: 9,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'Qual o tempo máximo de validade preconizado pelo Ministério da Saúde para o uso de frascos multidose de vacinas virais atenuadas liofilizadas (como Febre Amarela e Tríplice Viral) após a sua reconstituição com o diluente correspondente?',
        options: [
          { letter: 'A', text: 'Até 30 dias mantidas na geladeira.' },
          { letter: 'B', text: 'Até 6 a 8 horas mantidas sob refrigeração de +2 °C a +8 °C.' },
          { letter: 'C', text: 'Exclusivamente por 15 minutos, devendo ser descartadas logo em seguida.' },
          { letter: 'D', text: 'Até 7 dias se congeladas no evaporador da geladeira.' }
        ],
        correctAnswer: 'B',
        explanation: 'Vacinas vivas reconstituídas perdem a estabilidade antigênica e sofrem risco de contaminação bacteriana rapidamente; devem ser mantidas entre +2°C e +8°C e descartadas ao término do expediente (máximo 6 a 8 horas).'
      }
    ]
  },

  // ==========================================
  // SIMULADO 10: Grande Simulado Integrado Geral de Concursos
  // ==========================================
  {
    id: 10,
    title: 'Simulado 10 - Simulado Geral Integrado de Concursos',
    description: 'Prova simulada completa integrando os temas mais cobrados pelas principais bancas de Enfermagem.',
    focusArea: 'Simulado Geral Integrado',
    timeLimitMinutes: 25,
    questions: [
      // 2 FÁCEIS
      {
        id: 1001,
        simuladoId: 10,
        difficulty: 'facil',
        subject: 'Fundamentos de Enfermagem',
        statement: 'Aferir a temperatura axilar de um paciente adulto e encontrar valor de 38,4 °C configura tecnicamente o estado de:',
        options: [
          { letter: 'A', text: 'Hipotermia grave.' },
          { letter: 'B', text: 'Normotermia eucárdica.' },
          { letter: 'C', text: 'Febre / Pirexia.' },
          { letter: 'D', text: 'Apirexia compensada.' }
        ],
        correctAnswer: 'C',
        explanation: 'Temperatura axilar entre 35,5°C e 37,2°C é normotermia; entre 37,3°C e 37,7°C é estado subfebril; a partir de 37,8°C - 38,0°C configura-se febre.'
      },
      {
        id: 1002,
        simuladoId: 10,
        difficulty: 'facil',
        subject: 'SUS & Legislação',
        statement: 'Segundo a Constituição Federal de 1988 (art. 196), a saúde é:',
        options: [
          { letter: 'A', text: 'Dever do indivíduo e faculdade das seguradoras privadas.' },
          { letter: 'B', text: 'Direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas.' },
          { letter: 'C', text: 'Serviço remunerado exclusivo para trabalhadores com carteira assinada.' },
          { letter: 'D', text: 'Benefício concedido por decisão discricionária de cada município.' }
        ],
        correctAnswer: 'B',
        explanation: 'O clássico artigo 196 da CF/88 consagra: "A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença e de outros agravos".'
      },
      // 3 MÉDIAS
      {
        id: 1003,
        simuladoId: 10,
        difficulty: 'media',
        subject: 'Farmacologia & Cálculos',
        statement: 'Quantas microgotas por minuto equivalem à infusão de 60 gotas por minuto de uma solução hidratante?',
        options: [
          { letter: 'A', text: '20 microgotas por minuto.' },
          { letter: 'B', text: '60 microgotas por minuto.' },
          { letter: 'C', text: '180 microgotas por minuto.' },
          { letter: 'D', text: '240 microgotas por minuto.' }
        ],
        correctAnswer: 'C',
        explanation: 'Uma gota equivale exatamente a 3 microgotas. Portanto: 60 gotas/min × 3 = 180 microgotas/min.'
      },
      {
        id: 1004,
        simuladoId: 10,
        difficulty: 'media',
        subject: 'Urgência & Emergência',
        statement: 'No atendimento pré-hospitalar ao infarto agudo do miocárdio (IAM), qual fármaco antiagregante plaquetário deve ser mastigado pelo paciente com suspeita de síndrome coronariana aguda (salvo contraindicações formais)?',
        options: [
          { letter: 'A', text: 'Paracetamol 750 mg.' },
          { letter: 'B', text: 'Ácido Acetilsalicílico (AAS) 160 a 325 mg (comprimido mastigado).' },
          { letter: 'C', text: 'Varfarina sódica 5 mg.' },
          { letter: 'D', text: 'Omeprazol 40 mg.' }
        ],
        correctAnswer: 'B',
        explanation: 'O AAS na dose de 160 a 325 mg deve ser mastigado para acelerar a absorção bucal e inibir imediatamente a formação de trombos no leito coronariano.'
      },
      {
        id: 1005,
        simuladoId: 10,
        difficulty: 'media',
        subject: 'Biossegurança & Infecção',
        statement: 'No Protocolo de Manchester de Acolhimento com Classificação de Risco nos serviços de urgência, a cor VERMELHA e a cor AMARELA indicam, respectivamente:',
        options: [
          { letter: 'A', text: 'Atendimento não urgente (até 240 min) e Pouco urgente (até 120 min).' },
          { letter: 'B', text: 'Emergência com atendimento imediato (tempo zero) e Urgência com atendimento em até 60 minutos.' },
          { letter: 'C', text: 'Consulta ambulatorial e Encaminhamento social.' },
          { letter: 'D', text: 'Atendimento em 10 minutos para ambos.' }
        ],
        correctAnswer: 'B',
        explanation: 'Protocolo de Manchester: Vermelho = Emergência (0 min); Laranja = Muito urgente (10 min); Amarelo = Urgente (60 min); Verde = Pouco urgente (120 min); Azul = Não urgente (240 min).'
      },
      // 5 DIFÍCEIS
      {
        id: 1006,
        simuladoId: 10,
        difficulty: 'dificil',
        subject: 'Urgência & Emergência',
        statement: 'Em um choque séptico refratário à reposição volêmica com 30 mL/kg de cristaloides, qual droga vasoativa é a primeira escolha de consenso internacional (Surviving Sepsis Campaign) para restaurar e manter a Pressão Arterial Média (PAM) ≥ 65 mmHg?',
        options: [
          { letter: 'A', text: 'Dopamina em dose renal baixa.' },
          { letter: 'B', text: 'Norepinefrina (Noradrenalina) em infusão contínua em bomba infusora.' },
          { letter: 'C', text: 'Dobutamina isolada em bolus.' },
          { letter: 'D', text: 'Adrenalina pura subcutânea.' }
        ],
        correctAnswer: 'B',
        explanation: 'A Norepinefrina é o vasopressor de primeira linha absoluto no choque séptico por sua potente ação alfa-adrenérgica vasoconstritora sem aumento excessivo do consumo de oxigênio miocárdico.'
      },
      {
        id: 1007,
        simuladoId: 10,
        difficulty: 'dificil',
        subject: 'Farmacologia & Cálculos',
        statement: 'Prescrição médica: Vancomicina 1.000 mg em 250 mL de Solução Fisiológica a 0,9% para correr em 120 minutos por via endovenosa. Qual a velocidade correta de infusão na Bomba de Infusão Contínua (em mL/h)?',
        options: [
          { letter: 'A', text: '62,5 mL/h.' },
          { letter: 'B', text: '125 mL/h.' },
          { letter: 'C', text: '250 mL/h.' },
          { letter: 'D', text: '500 mL/h.' }
        ],
        correctAnswer: 'B',
        explanation: 'A bomba de infusão é programada em mililitros por hora (mL/h). 120 minutos equivalem a 2 horas. Logo: 250 mL ÷ 2 horas = 125 mL/h. A infusão lenta em no mínimo 60-120 min evita a síndrome do homem vermelho.'
      },
      {
        id: 1008,
        simuladoId: 10,
        difficulty: 'dificil',
        subject: 'SUS & Legislação',
        statement: 'Um profissional de enfermagem divulga em seu perfil público na internet imagens nítidas da ferida e do rosto de um paciente inconsciente internado na UTI para autopromoção profissional. Conforme o Código de Ética (Resolução COFEN 564/2017), tal atitude constitui:',
        options: [
          { letter: 'A', text: 'Prática permitida desde que não haja identificação do número de leito hospitalar.' },
          { letter: 'B', text: 'Infração ética grave passível de penalidades disciplinares, sendo expressamente proibido expor a figura da pessoa em redes sociais, mesmo com consentimento quando há violação da dignidade humana.' },
          { letter: 'C', text: 'Direito do profissional de documentar sua produção científica em tempo real.' },
          { letter: 'D', text: 'Falta leve sem necessidade de abertura de sindicância pelo COREN.' }
        ],
        correctAnswer: 'B',
        explanation: 'O Código de Ética veda expressamente a exposição de pacientes em mídias digitais e redes sociais que firam a privacidade, imagem e dignidade humana do usuário do serviço de saúde.'
      },
      {
        id: 1009,
        simuladoId: 10,
        difficulty: 'dificil',
        subject: 'Médico-Cirúrgica',
        statement: 'Em um paciente em ventilação mecânica que desenvolve assimetria na expansibilidade torácica, desvio da traqueia para o lado oposto ao afetado, ausência de murmúrio vesicular unilateral e choque hemodinâmico por Pneumotórax Hipertensivo, qual é a intervenção de enfermagem e médica emergencial imediata?',
        options: [
          { letter: 'A', text: 'Realizar descompressão torácica imediata com agulha calibrosa no 2º espaço intercostal na linha hemiclavicular ou 4º/5º espaço na linha axilar anterior antes da drenagem em selo d’água definitiva.' },
          { letter: 'B', text: 'Aumentar a PEEP do ventilador mecânico para expandir o pulmão colabado.' },
          { letter: 'C', text: 'Aguardar a realização de tomografia computadorizada contrastada de tórax.' },
          { letter: 'D', text: 'Administrar broncodilatador inalatório e sedação profunda.' }
        ],
        correctAnswer: 'A',
        explanation: 'O pneumotórax hipertensivo é um diagnóstico clínico de emergência extrema; qualquer atraso para exames de imagem pode ser fatal. A toracocentese de alívio por agulha alivia a pressão intratorácica imediatamente.'
      },
      {
        id: 1010,
        simuladoId: 10,
        difficulty: 'dificil',
        subject: 'Saúde Coletiva & Vacinas',
        statement: 'De acordo com as normas da Anvisa e do Ministério da Saúde para eventos adversos graves pós-vacinação (EAPV), qual é o prazo obrigatório para a notificação compulsória imediata de um óbito ou choque anafilático suspeito pós-vacinal?',
        options: [
          { letter: 'A', text: 'Em até 24 horas a partir do conhecimento do caso.' },
          { letter: 'B', text: 'Em até 30 dias na consolidação mensal do SINAN.' },
          { letter: 'C', text: 'Apenas após a conclusão do laudo da necropsia pelo IML.' },
          { letter: 'D', text: 'Não há obrigatoriedade de notificação para imunobiológicos aprovados.' }
        ],
        correctAnswer: 'A',
        explanation: 'Eventos adversos pós-vacinação graves (óbitos, anafilaxia, internação hospitalar ou sequelas) exigem notificação compulsória imediata em até 24 horas às autoridades de vigilância epidemiológica.'
      }
    ]
  }
];
