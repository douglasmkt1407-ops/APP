import { Flashcard } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  // --- FUNDAMENTOS DE ENFERMAGEM (15 cards) ---
  {
    id: 1,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual é o valor de referência para a Frequência Cardíaca (Normocardia) em um adulto em repouso?',
    answer: '60 a 100 batimentos por minuto (bpm).',
    keyMnemonic: '< 60 bpm = Bradicardia | > 100 bpm = Taquicardia',
    explanation: 'Em adultos saudáveis em repouso, a frequência de 60 a 100 bpm é considerada eucárdica/normocárdica.',
    status: 'new'
  },
  {
    id: 2,
    category: 'Fundamentos de Enfermagem',
    question: 'O que caracteriza a respiração de Cheyne-Stokes?',
    answer: 'Padrão respiratório cíclico: períodos de hiperpneia gradual seguidos de apneia transitória.',
    keyMnemonic: 'Cresce -> Decresce -> Apneia',
    explanation: 'Muito associada a insuficiência cardíaca congestiva grave, hipertensão intracraniana ou lesões neurológicas centrais.',
    status: 'new'
  },
  {
    id: 3,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual a posição recomendada para lavagem intestinal (enteroclisma) e toque retal?',
    answer: 'Posição de Sims (decúbito lateral esquerdo com o membro inferior direito fletido).',
    keyMnemonic: 'Sims = Lateral Esquerdo + Perna Direita Dobrada',
    explanation: 'Essa posição respeita a anatomia do cólon sigmoide e reto, facilitando a progressão da sonda e solução.',
    status: 'new'
  },
  {
    id: 4,
    category: 'Fundamentos de Enfermagem',
    question: 'Como se define a Febre Remitente?',
    answer: 'A temperatura oscila em vários graus ao longo do dia, mas nunca atinge os níveis normais.',
    keyMnemonic: 'Remitente = Oscila mas não normaliza',
    explanation: 'Diferente da intermitente (que atinge a apirexia) e da contínua (que varia menos de 1°C mantendo-se elevada).',
    status: 'new'
  },
  {
    id: 5,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual o valor limite para classificar Hipotermia em adultos segundo a literatura clínica padrão?',
    answer: 'Temperatura axilar ou central inferior a 35,0 °C.',
    keyMnemonic: '< 35°C = Hipotermia',
    explanation: 'Valores entre 35,1°C e 37,2°C são normotermia; acima de 37,8°C é estado febril/febre.',
    status: 'new'
  },
  {
    id: 6,
    category: 'Fundamentos de Enfermagem',
    question: 'Na Sondagem Vesical de Demora (SVD), qual líquido deve ser usado para insuflar o balonete da sonda Foley?',
    answer: 'Água destilada estéril (NUNCA soro fisiológico).',
    keyMnemonic: 'Água destilada sempre! Soro cristaliza a válvula.',
    explanation: 'O cloreto de sódio pode cristalizar e travar o balonete, impedindo sua desinsuflação na hora da retirada.',
    status: 'new'
  },
  {
    id: 7,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual teste de beira de leito é realizado para confirmar a posição da Sonda Nasogástrica (SNG)?',
    answer: 'Ausculta gástrica com injeção de 20ml de ar epigástrico e teste de pH aspirado (padrão-ouro confirmatório é o RX).',
    keyMnemonic: 'Ar + Ausculta Epigástrica e Raio-X de Tórax/Abdômen',
    explanation: 'Antes de infundir qualquer dieta ou medicação, é mandatório testar e radiografar para afastar via aérea.',
    status: 'new'
  },
  {
    id: 8,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual a diferença entre Oligúria e Anúria em 24 horas?',
    answer: 'Oligúria: débito urinário < 400-500 mL/dia. Anúria: débito urinário < 100 mL/dia (ou ausência total).',
    keyMnemonic: 'Oligúria < 500ml | Anúria < 100ml',
    explanation: 'O débito urinário adulto normal gira entre 800 e 2000 mL/dia (mínimo esperado de 0,5 mL/kg/hora).',
    status: 'new'
  },
  {
    id: 9,
    category: 'Fundamentos de Enfermagem',
    question: 'O que define a Posição de Trendelenburg?',
    answer: 'O corpo deitado em decúbito dorsal com a cabeça e o tronco mais baixos que os membros inferiores (15 a 30°).',
    keyMnemonic: 'Cabeça para baixo, pernas para cima',
    explanation: 'Usada para favorecer o retorno venoso em choque hipovolêmico ou em cirurgias pélvicas.',
    status: 'new'
  },
  {
    id: 10,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual o sítio mais comum para aferição de pulso periférico em parada cardiorrespiratória no adulto?',
    answer: 'Pulso Carotídeo (artéria carótida, no pescoço).',
    keyMnemonic: 'Adulto = Carotídeo | Lactente = Braquial',
    explanation: 'Em lactentes (< 1 ano), pesquisa-se o pulso braquial na face interna do braço.',
    status: 'new'
  },
  {
    id: 11,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual a profundidade e recomendação de troca de cânula de traqueostomia com balonete (cuff)?',
    answer: 'A pressão do cuff deve ser mantida entre 20 a 30 cmH2O (ou 15-22 mmHg).',
    keyMnemonic: 'Cuff ideal: 20 a 30 cmH2O para não necrozar traqueia',
    explanation: 'Pressões acima de 30 cmH2O provocam isquemia na mucosa traqueal e estenose futura.',
    status: 'new'
  },
  {
    id: 12,
    category: 'Fundamentos de Enfermagem',
    question: 'Em oxigenoterapia de baixo fluxo, qual a FiO2 aproximada fornecida por um cateter tipo óculos a 3 L/min?',
    answer: 'Aproximadamente 32% (calcula-se 21% do ar ambiente + 4% por cada litro/min).',
    keyMnemonic: 'Fórmula rápida: 20% + (Fluxo em L x 4)',
    explanation: '1L = 24%, 2L = 28%, 3L = 32%, 4L = 36%, 5L = 40%.',
    status: 'new'
  },
  {
    id: 13,
    category: 'Fundamentos de Enfermagem',
    question: 'O que é a Escala Visual Analógica (EVA) e para que serve?',
    answer: 'Escala unidimensional graduada de 0 (sem dor) a 10 (pior dor imaginável) para mensurar a intensidade da dor.',
    keyMnemonic: 'Dor é o 5º sinal vital!',
    explanation: 'Permite avaliar a eficácia analgésica e registrar na evolução clínica do paciente.',
    status: 'new'
  },
  {
    id: 14,
    category: 'Fundamentos de Enfermagem',
    question: 'O que diferencia a posição de Fowler da posição de Semi-Fowler?',
    answer: 'Fowler: cabeceira elevada entre 45° e 60°. Semi-Fowler: cabeceira elevada entre 30° e 45°.',
    keyMnemonic: 'Fowler = 45°-60° | Semi-Fowler = 30°-45°',
    explanation: 'Facilita a expansão pulmonar e diminui o risco de broncoaspiração em pacientes alimentados por sonda.',
    status: 'new'
  },
  {
    id: 15,
    category: 'Fundamentos de Enfermagem',
    question: 'Qual o tempo máximo recomendado para aspirar a cânula traqueal ou tubo orotraqueal em cada tentativa?',
    answer: 'Máximo de 10 a 15 segundos.',
    keyMnemonic: 'Tempo de aspiração: 10 a 15 segundos (hiperoxigenar antes e depois)',
    explanation: 'A aspiração prolongada gera hipoxemia aguda grave, broncoespasmo e arritmias cardíacas.',
    status: 'new'
  },

  // --- FARMACOLOGIA & CÁLCULOS (15 cards) ---
  {
    id: 16,
    category: 'Farmacologia & Cálculos',
    question: 'Qual a fórmula para cálculo de gotas por minuto (macrogotas) quando o tempo é dado em horas?',
    answer: 'Gotas/min = Volume total (mL) ÷ (Tempo em horas × 3).',
    keyMnemonic: 'G = V / (T x 3)',
    explanation: 'Exemplo: 500 mL em 8 horas = 500 / (8 x 3) = 500 / 24 = 20,8 -> 21 gotas/minuto.',
    status: 'new'
  },
  {
    id: 17,
    category: 'Farmacologia & Cálculos',
    question: 'Qual a fórmula de microgotas por minuto quando o tempo é dado em horas?',
    answer: 'Microgotas/min = Volume total (mL) ÷ Tempo em horas.',
    keyMnemonic: 'Microgotas = V / T (1 gota = 3 microgotas)',
    explanation: 'Como 1 gota equivale a 3 microgotas, o fator 3 no denominador se cancela com o numerador.',
    status: 'new'
  },
  {
    id: 18,
    category: 'Farmacologia & Cálculos',
    question: 'Quantas gotas/minuto devem correr para infundir 1000 mL de Soro Fisiológico 0,9% em 24 horas?',
    answer: 'Aproximadamente 14 gotas/minuto (1000 / 72 = 13,88 gotas/min).',
    keyMnemonic: '1000 mL em 24h = 14 gotas/min',
    explanation: 'Cálculo: G = 1000 / (24 x 3) = 1000 / 72 = 13,88 -> arredonda para 14 gotas/min.',
    status: 'new'
  },
  {
    id: 19,
    category: 'Farmacologia & Cálculos',
    question: 'Quais são os ângulos corretos de inserção para as vias ID, SC, IM e EV?',
    answer: 'Intradérmica (ID): 10° a 15° | Subcutânea (SC): 45° ou 90° | Intramuscular (IM): 90° | Endovenosa (EV): 15° a 30°.',
    keyMnemonic: 'ID: 10-15° | SC: 45-90° | IM: 90° | EV: 15-30°',
    explanation: 'Respeitar o ângulo garante que o fármaco atinja a camada tecidual exata da prescrição.',
    status: 'new'
  },
  {
    id: 20,
    category: 'Farmacologia & Cálculos',
    question: 'Quantas unidades internacionais (UI) de Insulina NPH há em cada 1 mL do frasco padrão de 100 UI/mL?',
    answer: 'Em 1 mL há exatamente 100 UI.',
    keyMnemonic: 'U-100 = 100 unidades em 1 mL',
    explanation: 'Quando não houver seringa própria de insulina, usa-se a regra de três com seringa de 3mL ou 1mL.',
    status: 'new'
  },
  {
    id: 21,
    category: 'Farmacologia & Cálculos',
    question: 'Se a prescrição pede 20 UI de Insulina e só dispomos de seringa de 3 mL (onde 1 mL = 100 UI), quantos mL aspirar?',
    answer: '0,2 mL.',
    keyMnemonic: '100 UI --- 1 mL \n 20 UI --- X mL -> X = 0,2 mL',
    explanation: 'Multiplicação cruzada: 100 * X = 20 * 1 -> X = 20/100 = 0,2 mL.',
    status: 'new'
  },
  {
    id: 22,
    category: 'Farmacologia & Cálculos',
    question: 'Quais são os "9 Certos" da administração segura de medicamentos recomendados pelo COFEN/MS?',
    answer: '1. Paciente certo; 2. Medicamento certo; 3. Via certa; 4. Hora certa; 5. Dose certa; 6. Registro certo; 7. Orientação certa; 8. Forma certa; 9. Resposta certa.',
    keyMnemonic: 'Paciente, Remédio, Via, Hora, Dose, Registro, Orientação, Forma, Resposta',
    explanation: 'Barreiras essenciais de segurança para erradicar eventos adversos e iatrogenias medicamentosas.',
    status: 'new'
  },
  {
    id: 23,
    category: 'Farmacologia & Cálculos',
    question: 'Qual o antídoto padrão da Heparina não fracionada?',
    answer: 'Sulfato de Protamina.',
    keyMnemonic: 'Heparina -> Protamina | Varfarina -> Vitamina K',
    explanation: 'Em casos de hemorragia ou superdosagem por heparina, o sulfato de protamina neutraliza sua ação anticoagulante.',
    status: 'new'
  },
  {
    id: 24,
    category: 'Farmacologia & Cálculos',
    question: 'Qual o antídoto de emergência em intoxicações agudas por Opióides (Morfina, Fentanil)?',
    answer: 'Naloxona (Narcan).',
    keyMnemonic: 'Opióide -> Naloxona (reverte depressão respiratória)',
    explanation: 'Age como antagonista competitivo puro dos receptores opioides no sistema nervoso central.',
    status: 'new'
  },
  {
    id: 25,
    category: 'Farmacologia & Cálculos',
    question: 'Prescrição: Amoxicilina 250 mg. Temos suspensão de 125 mg / 5 mL. Quantos mL administrar?',
    answer: '10 mL.',
    keyMnemonic: '125 mg --- 5 mL \n 250 mg --- X mL -> X = 10 mL',
    explanation: 'Como a dose prescrita é o dobro da apresentação (250 é 2x 125), o volume também dobra: 5 mL x 2 = 10 mL.',
    status: 'new'
  },
  {
    id: 26,
    category: 'Farmacologia & Cálculos',
    question: 'Qual o volume máximo de líquido recomendado para injeção intramuscular no músculo deltoide do adulto?',
    answer: 'Até 2 mL (em pessoas muito desenvolvidas até 3 mL, mas a literatura padrão e bancas adotam 2 mL).',
    keyMnemonic: 'Deltoide: max 2 mL | Glúteo (Ventroglúteo/Dorsoglúteo): até 4 a 5 mL',
    explanation: 'O deltoide tem menor massa muscular e proximidade com o nervo radial e artéria braquial circunflexa.',
    status: 'new'
  },
  {
    id: 27,
    category: 'Farmacologia & Cálculos',
    question: 'Qual a técnica recomendada para administração de ferro injetável (Noripurum intramuscular)?',
    answer: 'Técnica em Z (Z-track).',
    keyMnemonic: 'Técnica em Z evita manchar a pele e refluxo',
    explanation: 'Traciona-se a pele lateralmente antes da punção a 90° e só solta após retirar a agulha, selando o canal.',
    status: 'new'
  },
  {
    id: 28,
    category: 'Farmacologia & Cálculos',
    question: 'Qual a concentração percentual em gramas de uma solução de Soro Glicosado a 5% (SG 5%) em 1000 mL?',
    answer: '50 gramas de glicose (5 gramas para cada 100 mL de solução).',
    keyMnemonic: '5% = 5g a cada 100mL. Em 1000mL = 50g',
    explanation: 'A porcentagem sempre indica gramas do soluto presentes em 100 mL do solvente.',
    status: 'new'
  },
  {
    id: 29,
    category: 'Farmacologia & Cálculos',
    question: 'Prescrição: 100 mL de antibiótico para correr em 30 minutos em macrogotas. Qual o gotejamento?',
    answer: '67 gotas por minuto.',
    keyMnemonic: 'Gotas/min (em minutos) = (Volume x 20) ÷ Minutos',
    explanation: 'Cálculo: (100 mL × 20) ÷ 30 min = 2000 ÷ 30 = 66,66 -> 67 gotas/minuto.',
    status: 'new'
  },
  {
    id: 30,
    category: 'Farmacologia & Cálculos',
    question: 'Qual o antídoto administrado na intoxicação aguda por Paracetamol?',
    answer: 'N-Acetilcisteína (NAC).',
    keyMnemonic: 'Paracetamol -> N-Acetilcisteína (reabastece glutationa)',
    explanation: 'Evita necrose hepática maciça pela formação do metabólito tóxico NAPQI.',
    status: 'new'
  },

  // --- URGÊNCIA & EMERGÊNCIA (15 cards) ---
  {
    id: 31,
    category: 'Urgência & Emergência',
    question: 'Qual a frequência recomendada de compressões torácicas no Suporte Básico de Vida (AHA 2020-2025)?',
    answer: '100 a 120 compressões por minuto.',
    keyMnemonic: '100 a 120 / min (ritmo de "Stayin\' Alive")',
    explanation: 'Garante fluxo sanguíneo cerebral e coronariano ideal sem comprometer o enchimento diastólico.',
    status: 'new'
  },
  {
    id: 32,
    category: 'Urgência & Emergência',
    question: 'Qual a profundidade ideal das compressões torácicas em um adulto em PCR?',
    answer: 'No mínimo 5 cm (2 polegadas) e não mais que 6 cm (2,4 polegadas).',
    keyMnemonic: '5 a 6 cm no adulto, permitindo retorno total do tórax',
    explanation: 'Compressões com menos de 5 cm geram débito cardíaco insuficiente e > 6 cm aumentam lesões de arcos costais.',
    status: 'new'
  },
  {
    id: 33,
    category: 'Urgência & Emergência',
    question: 'Quais são os ritmos de Parada Cardiorrespiratória CHOCÁVEIS pelo DEA?',
    answer: 'Fibrilação Ventricular (FV) e Taquicardia Ventricular sem pulso (TVsp).',
    keyMnemonic: 'FV e TV sem pulso = CHOCA! (Assistolia e AESP NÃO chocam)',
    explanation: 'Na Assistolia e na Atividade Elétrica Sem Pulso (AESP), o tratamento é RCP de qualidade + Epinefrina precoce.',
    status: 'new'
  },
  {
    id: 34,
    category: 'Urgência & Emergência',
    question: 'Qual a relação compressão-ventilação em adultos no SBV com 1 ou 2 socorristas (sem via aérea avançada)?',
    answer: '30 compressões para 2 ventilações (30:2).',
    keyMnemonic: 'Adulto = sempre 30:2 independente de 1 ou 2 socorristas',
    explanation: 'Em crianças e lactentes, muda para 15:2 quando houver 2 profissionais de saúde presentes.',
    status: 'new'
  },
  {
    id: 35,
    category: 'Urgência & Emergência',
    question: 'Na Escala de Coma de Glasgow Atualizada (com reatividade pupilar), qual a pontuação mínima e máxima?',
    answer: 'Abertura ocular (1-4), Resposta verbal (1-5), Resposta motora (1-6) = 3 a 15, subtraindo a reatividade pupilar (0 a 2).',
    keyMnemonic: 'Glasgow-P: Varia de 1 a 15 (antes era 3 a 15)',
    explanation: 'Se ambas as pupilas estiverem não reativas à luz, subtrai-se 2 pontos do escore total obtido.',
    status: 'new'
  },
  {
    id: 36,
    category: 'Urgência & Emergência',
    question: 'Pela Regra dos Nove de Wallace para queimaduras no adulto, qual a porcentagem de área corporal para todo o tronco anterior?',
    answer: '18% da superfície corporal queimada (SCQ).',
    keyMnemonic: 'Tronco anterior = 18% | Dorso posterior = 18% | Cabeça = 9%',
    explanation: 'Cada membro superior é 9%, cada membro inferior é 18%, cabeça e pescoço 9%, genitália 1%.',
    status: 'new'
  },
  {
    id: 37,
    category: 'Urgência & Emergência',
    question: 'Qual a conduta imediata para desobstrução de via aérea em paciente adulto consciente com obstrução grave (engasgo)?',
    answer: 'Manobra de Heimlich (compressões abdominais subdiafragmáticas para dentro e para cima).',
    keyMnemonic: 'Para dentro e para cima em forma de "J"',
    explanation: 'Se a vítima perder a consciência, posicioná-la em decúbito dorsal e iniciar imediatamente RCP.',
    status: 'new'
  },
  {
    id: 38,
    category: 'Urgência & Emergência',
    question: 'Qual a primeira droga vasoativa de escolha utilizada na ressuscitação cardiopulmonar e de quanto em quanto tempo?',
    answer: 'Epinefrina (Adrenalina) 1 mg IV/IO a cada 3 a 5 minutos.',
    keyMnemonic: 'Epinefrina 1mg a cada 3 a 5 min',
    explanation: 'Promove vasoconstrição periférica através de receptores alfa-adrenérgicos, aumentando a perfusão miocárdica.',
    status: 'new'
  },
  {
    id: 39,
    category: 'Urgência & Emergência',
    question: 'O que significa a mnemônica SAMU no mnemônico de AVC (Escala Pré-Hospitalar de Cincinnati)?',
    answer: 'S: Sorriso (assimetria facial); A: Abraço (fraqueza no braço); M: Música/Fala (disartria); U: Urgente (ligar SAMU 192).',
    keyMnemonic: 'S-A-M-U = Sorriso, Abraço, Música, Urgente!',
    explanation: 'A presença de 1 desses 3 achados clínicos confere 72% de probabilidade de AVC isquêmico agudo.',
    status: 'new'
  },
  {
    id: 40,
    category: 'Urgência & Emergência',
    question: 'Em caso de queimaduras térmicas agudas no atendimento pré-hospitalar, como deve ser feito o resfriamento inicial da lesão?',
    answer: 'Com água corrente em temperatura ambiente (não gelada) por 10 a 20 minutos.',
    keyMnemonic: 'Água corrente ambiente por 10-20 min. Nunca gelo ou manteiga!',
    explanation: 'O gelo causa vasoconstrição severa, aprofunda a queimadura e precipita hipotermia sistêmica grave.',
    status: 'new'
  },
  {
    id: 41,
    category: 'Urgência & Emergência',
    question: 'Qual a prioridade máxima (letra) no protocolo do PHTLS 10ª edição / trauma com hemorragia exsanguinante?',
    answer: 'Letra X (Exsanguinating Hemorrhage) -> Protocolo XABCDE.',
    keyMnemonic: 'X: Hemorragias graves externas (torniquete precoce)',
    explanation: 'A contenção de sangramentos arteriais maciços precede até mesmo a abordagem da via aérea.',
    status: 'new'
  },
  {
    id: 42,
    category: 'Urgência & Emergência',
    question: 'Qual a posição das pás do Desfibrilador Externo Automático (DEA) no tórax de um adulto?',
    answer: 'Ântero-lateral: uma pá abaixo da clavícula direita (infraclavicular) e a outra na linha axilar anterior esquerda (ápice).',
    keyMnemonic: 'Subclavicular direita + Ápice cardíaco esquerdo',
    explanation: 'Essa disposição permite que a corrente elétrica despolarize todo o septo interventricular e miocárdio.',
    status: 'new'
  },
  {
    id: 43,
    category: 'Urgência & Emergência',
    question: 'O que caracteriza a Tríade de Cushing em pacientes neurológicos graves com Hipertensão Intracraniana (HIC)?',
    answer: '1. Hipertensão arterial com aumento da pressão de pulso; 2. Bradicardia; 3. Bradipneia/Padrão respiratório irregular.',
    keyMnemonic: 'HIC: PA Sobe, FC Desce, FR Desce/Descompassa',
    explanation: 'É um sinal pré-herniação de tronco cerebral que exige intervenção hiperosmolar imediata (manitol/salina hipertônica).',
    status: 'new'
  },
  {
    id: 44,
    category: 'Urgência & Emergência',
    question: 'Qual o tempo porta-agulha preconizado para administração de trombolítico no AVC Isquêmico agudo após chegada ao hospital?',
    answer: 'Até 60 minutos (ou meta avançada de até 45 minutos), dentro da janela de 4,5 horas do ictus.',
    keyMnemonic: 'Janela do AVC: 4,5h do início | Porta-agulha: < 60 min',
    explanation: 'Tempo é cérebro: cada minuto sem reperfusão acarreta perda de milhões de neurônios irreversivelmente.',
    status: 'new'
  },
  {
    id: 45,
    category: 'Urgência & Emergência',
    question: 'No Choque Anafilático, qual o fármaco de primeira linha obrigatório e a via de administração?',
    answer: 'Epinefrina (Adrenalina) 1:1000 (1 mg/mL) por via Intramuscular (IM) no vasto lateral da coxa.',
    keyMnemonic: 'Anafilaxia = Epinefrina IM no vasto lateral imediata!',
    explanation: 'A via intramuscular na coxa confere pico sérico muito mais rápido do que a via subcutânea ou deltoide.',
    status: 'new'
  },

  // --- SUS & LEGISLAÇÃO (15 cards) ---
  {
    id: 46,
    category: 'SUS & Legislação',
    question: 'Quais são os 3 Princípios DOUTRINÁRIOS (Ideológicos) fundamentais do SUS?',
    answer: '1. Universalidade; 2. Equidade; 3. Integralidade.',
    keyMnemonic: 'Princípios Doutrinários = U - E - I',
    explanation: 'A universalidade garante acesso a todos; equidade trata os desiguais conforme suas necessidades; integralidade vê o indivíduo como um todo.',
    status: 'new'
  },
  {
    id: 47,
    category: 'SUS & Legislação',
    question: 'Qual Lei Federal regulamenta as condições para promoção, proteção e recuperação da saúde e a organização do SUS?',
    answer: 'Lei nº 8.080/1990 (Lei Orgânica da Saúde).',
    keyMnemonic: 'Lei 8.080/90 = Organização e Funcionamento do SUS',
    explanation: 'Promulgada em 19 de setembro de 1990, estabelece as diretrizes operacionais do sistema.',
    status: 'new'
  },
  {
    id: 48,
    category: 'SUS & Legislação',
    question: 'O que dispõe a Lei nº 8.142/1990 no âmbito do Sistema Único de Saúde?',
    answer: 'Dispõe sobre a Participação da Comunidade na gestão do SUS e sobre as Transferências Intergovernamentais de recursos.',
    keyMnemonic: 'Lei 8.142/90 = Participação Social + Dinheiro/Repasses',
    explanation: 'Institui os Conselhos de Saúde e as Conferências de Saúde com caráter paritário dos usuários (50%).',
    status: 'new'
  },
  {
    id: 49,
    category: 'SUS & Legislação',
    question: 'Qual a composição percentual dos Conselhos de Saúde em relação aos segmentos representados?',
    answer: '50% Usuários; 25% Profissionais de saúde; 25% Gestores e Prestadores de serviço de saúde.',
    keyMnemonic: 'Paridade: Metade (50%) é Usuário!',
    explanation: 'Determinado pela Resolução nº 453/2012 do Conselho Nacional de Saúde e pela Lei 8.142/90.',
    status: 'new'
  },
  {
    id: 50,
    category: 'SUS & Legislação',
    question: 'De quanto em quanto tempo se reúnem as Conferências de Saúde ordinárias segundo a Lei 8.142/90?',
    answer: 'A cada 4 anos.',
    keyMnemonic: 'Conferências: a cada 4 anos para avaliar a situação de saúde',
    explanation: 'Convocadas pelo Poder Executivo ou extraordinariamente pelo próprio Conselho de Saúde.',
    status: 'new'
  },
  {
    id: 51,
    category: 'SUS & Legislação',
    question: 'Qual a Lei do Exercício Profissional da Enfermagem no Brasil?',
    answer: 'Lei Federal nº 7.498, de 25 de junho de 1986 (regulamentada pelo Decreto nº 94.406/87).',
    keyMnemonic: 'Lei 7.498/86 = Exercício da Enfermagem',
    explanation: 'Define privativamente as atividades do Enfermeiro, do Técnico de Enfermagem e do Auxiliar.',
    status: 'new'
  },
  {
    id: 52,
    category: 'SUS & Legislação',
    question: 'A prescrição da assistência de enfermagem e a consulta de enfermagem são privativas de qual profissional?',
    answer: 'Privativas do Enfermeiro (com diploma universitário).',
    keyMnemonic: 'Consulta e Prescrição de Enfermagem = Privativo do Enfermeiro',
    explanation: 'O Técnico e Auxiliar executam ações prescritas, sob supervisão e orientação direta do Enfermeiro.',
    status: 'new'
  },
  {
    id: 53,
    category: 'SUS & Legislação',
    question: 'O que rege a Resolução COFEN nº 564/2017?',
    answer: 'O Código de Ética dos Profissionais de Enfermagem.',
    keyMnemonic: 'Resolução 564/17 = Código de Ética da Enfermagem',
    explanation: 'Estruturado em Direitos, Deveres, Proibições, Infrações e Penalidades da profissão.',
    status: 'new'
  },
  {
    id: 54,
    category: 'SUS & Legislação',
    question: 'Qual penalidade ética disciplinar é de competência EXCLUSIVA do Conselho Federal de Enfermagem (COFEN)?',
    answer: 'Cassação do Direito ao Exercício Profissional (por até 30 anos).',
    keyMnemonic: 'Cassação: somente o Plenário do COFEN pode aplicar',
    explanation: 'Os Conselhos Regionais (CORENs) instauram o processo ético, mas o julgamento de cassação é do COFEN.',
    status: 'new'
  },
  {
    id: 55,
    category: 'SUS & Legislação',
    question: 'Quais são as 5 penalidades disciplinares previstas no Código de Ética da Enfermagem?',
    answer: '1. Advertência verbal; 2. Multa; 3. Censura; 4. Suspensão do exercício profissional (até 90 dias); 5. Cassação.',
    keyMnemonic: 'Adv - Multa - Censura - Suspensão - Cassação',
    explanation: 'A aplicação varia de acordo com a gravidade da infração, circunstâncias atenuantes e agravantes.',
    status: 'new'
  },
  {
    id: 56,
    category: 'SUS & Legislação',
    question: 'O que define o Decreto nº 7.508/2011 em relação às Redes de Atenção à Saúde (RAS)?',
    answer: 'Regulamenta a Lei 8.080/90, disciplinando a organização do SUS, o planejamento da saúde, a assistência à saúde e a articulação interfederativa.',
    keyMnemonic: 'Decreto 7.508 = Regiões de Saúde, Mapa da Saúde e COAP',
    explanation: 'Criou os instrumentos formais como Contrato Organizativo da Ação Pública (COAP) e Portas de Entrada.',
    status: 'new'
  },
  {
    id: 57,
    category: 'SUS & Legislação',
    question: 'Segundo o Decreto 7.508/2011, quais são as Portas de Entrada oficiais às ações e serviços de saúde no SUS?',
    answer: '1. Atenção Primária; 2. Atenção de Urgência e Emergência; 3. Atenção Psicossocial; 4. Ações Especiais de Acesso Aberto.',
    keyMnemonic: 'Portas de Entrada: Primária, Urgência, CAPS e Especiais',
    explanation: 'Os serviços especializados e terciários necessitam de regulação a partir dessas portas primárias.',
    status: 'new'
  },
  {
    id: 58,
    category: 'SUS & Legislação',
    question: 'O que é Descentralização com direção única em cada esfera de governo no SUS?',
    answer: 'É a redistribuição das responsabilidades e recursos da União para os Estados e Municípios (municipalização).',
    keyMnemonic: 'Descentralização = Poder e gestão mais perto do cidadão',
    explanation: 'No âmbito da União pelo Ministério da Saúde, no Estado pela SES e no Município pela SMS.',
    status: 'new'
  },
  {
    id: 59,
    category: 'SUS & Legislação',
    question: 'Qual o tempo prescricional de infrações éticas no processo administrativo disciplinar do COFEN/COREN?',
    answer: '5 anos a contar da data em que o fato se tornou conhecido.',
    keyMnemonic: 'Prescrição ética disciplinar = 5 anos',
    explanation: 'Decorrido esse prazo sem abertura de processo ou ato interruptivo, opera-se a prescrição da pretensão punitiva.',
    status: 'new'
  },
  {
    id: 60,
    category: 'SUS & Legislação',
    question: 'O profissional de Enfermagem pode recusar-se a executar atividades que não sejam de sua competência técnica ou legal?',
    answer: 'SIM! É um DIREITO assegurado no art. 22 do Código de Ética (Resolução 564/2017).',
    keyMnemonic: 'Direito: Recusar atividades sem competência técnica ou científica',
    explanation: 'Exceto em casos de urgência/emergência ou calamidade pública onde a recusa configure omissão de socorro.',
    status: 'new'
  },

  // --- BIOSSEGURANÇA & INFECÇÃO (15 cards) ---
  {
    id: 61,
    category: 'Biossegurança & Infecção',
    question: 'Quais são os 5 Momentos para Higienização das Mãos recomendados pela OMS e ANVISA?',
    answer: '1. Antes do contato com o paciente; 2. Antes de procedimento asséptico; 3. Após risco de exposição a fluidos corporais; 4. Após contato com o paciente; 5. Após contato com áreas próximas ao paciente.',
    keyMnemonic: '2 ANTES e 3 DEPOIS',
    explanation: 'A medida isolada mais eficaz para prevenir infecções relacionadas à assistência à saúde (IRAS).',
    status: 'new'
  },
  {
    id: 62,
    category: 'Biossegurança & Infecção',
    question: 'Qual tipo de máscara deve ser utilizada pelo profissional em Precauções para AEROSSÓIS (ex: Tuberculose, Sarampo, Varicela)?',
    answer: 'Máscara de proteção respiratória tipo N95, PFF2 ou equivalente com vedação facial.',
    keyMnemonic: 'Aerossol = N95 / PFF2 para o profissional + Quarto com pressão negativa',
    explanation: 'Partículas menores que 5 micrômetros permanecem suspensas no ar por longos períodos e percorrem grandes distâncias.',
    status: 'new'
  },
  {
    id: 63,
    category: 'Biossegurança & Infecção',
    question: 'Qual tipo de máscara é indicado nas Precauções para GOTÍCULAS (ex: Meningite meningocócica, Influenza, Coqueluche)?',
    answer: 'Máscara cirúrgica simples (descartável).',
    keyMnemonic: 'Gotícula = Máscara Cirúrgica (< 1 a 2 metros de distância)',
    explanation: 'Gotículas são partículas pesadas (> 5 micrômetros) que decantam rápido e não viajam grandes distâncias no ar.',
    status: 'new'
  },
  {
    id: 64,
    category: 'Biossegurança & Infecção',
    question: 'Qual a conduta para o transporte intra-hospitalar de um paciente com Tuberculose pulmonar ativa bacilífera?',
    answer: 'O PACIENTE deve utilizar máscara cirúrgica comum durante todo o transporte.',
    keyMnemonic: 'Paciente em transporte = Máscara Cirúrgica (retém gotículas na fonte)',
    explanation: 'O paciente não deve usar N95 devido ao esforço respiratório, mas sim a cirúrgica para conter a dispersão.',
    status: 'new'
  },
  {
    id: 65,
    category: 'Biossegurança & Infecção',
    question: 'Nas infecções por Clostridioides difficile (antigo Clostridium), por que a fricção com álcool 70% não é suficiente?',
    answer: 'Porque o álcool não elimina os esporos bacterianos; a lavagem das mãos com água e sabonete bactericida é obrigatória.',
    keyMnemonic: 'Clostridioides = Esporos resistentes ao álcool! Lavar com água e sabão',
    explanation: 'A fricção mecânica com água corrente remove os esporos presentes nas mãos do operador.',
    status: 'new'
  },
  {
    id: 66,
    category: 'Biossegurança & Infecção',
    question: 'Qual o tempo e temperatura padrão para esterilização por Calor Úmido Sob Pressão (Autoclave) de ciclo rápido?',
    answer: '121 °C a 134 °C por 15 a 30 minutos (sob pressão de 1 a 2 atmosferas).',
    keyMnemonic: 'Autoclave: 121°C por 30 min ou 134°C por 4-15 min',
    explanation: 'A combinação de temperatura, vapor saturado e pressão coagula e desnatura as proteínas microbianas e esporos.',
    status: 'new'
  },
  {
    id: 67,
    category: 'Biossegurança & Infecção',
    question: 'De acordo com a RDC 222/2018 da ANVISA, em qual Grupo de Resíduos de Serviços de Saúde (RSS) enquadram-se agulhas, lâminas de bisturi e ampolas?',
    answer: 'Grupo E (Materiais Perfurocortantes ou escarificantes).',
    keyMnemonic: 'Grupo E = Perfurocortantes (Descarte em caixa amarela rígida Descarpack)',
    explanation: 'Devem ser descartados até o limite de 2/3 da capacidade do recipiente rígido sem reencape de agulhas.',
    status: 'new'
  },
  {
    id: 68,
    category: 'Biossegurança & Infecção',
    question: 'Qual a ordem correta para RETIRADA (desparamentação) dos EPIs para minimizar contaminação?',
    answer: '1. Luvas; 2. Avental/capote; 3. Higienizar as mãos; 4. Óculos/protetor facial; 5. Máscara (retirar pelos elásticos fora do quarto); 6. Higienizar mãos novamente.',
    keyMnemonic: 'Desparamentação: Luvas primeiro (mais sujas), Máscara por último (fora do quarto)',
    explanation: 'Evita transferir microrganismos da face externa do avental ou luvas para o rosto e vias aéreas.',
    status: 'new'
  },
  {
    id: 69,
    category: 'Biossegurança & Infecção',
    question: 'O que classifica um artigo como "Crítico" no processamento de produtos para a saúde (Spaulding)?',
    answer: 'Artigos que penetram tecidos estéreis, sistema vascular ou órgãos nobres (ex: instrumentais cirúrgicos, agulhas, cateteres vasculares).',
    keyMnemonic: 'Artigo Crítico = Penetra tecido estéril -> Exige ESTERILIZAÇÃO obrigatória',
    explanation: 'Artigos semicríticos exigem no mínimo desinfecção de alto nível; não críticos exigem limpeza ou desinfecção de nível intermediário.',
    status: 'new'
  },
  {
    id: 70,
    category: 'Biossegurança & Infecção',
    question: 'Em acidente com material biológico e perfurocortante, qual a primeira conduta imediata no local?',
    answer: 'Lavar exaustivamente o local com água e sabonete (ou soro fisiológico em mucosas); NÃO espremer a ferida.',
    keyMnemonic: 'Lavar com água e sabão! Nunca espremer (aumenta o trauma)',
    explanation: 'Em seguida, comunicar a chefia imediata, coletar sorologias e iniciar PEP (Profilaxia Pós-Exposição) em até 2 horas se indicada.',
    status: 'new'
  },
  {
    id: 71,
    category: 'Biossegurança & Infecção',
    question: 'Qual o indicador biológico utilizado no controle de esterilização em autoclaves a vapor?',
    answer: 'Geobacillus stearothermophilus.',
    keyMnemonic: 'Vapor = Geobacillus stearothermophilus | Óxido de Etileno = Bacillus atrophaeus',
    explanation: 'Esporos altamente termo-resistentes; sua destruição comprova a eficácia letal do ciclo autoclave.',
    status: 'new'
  },
  {
    id: 72,
    category: 'Biossegurança & Infecção',
    question: 'Qual o tempo preconizado para fricção antisséptica das mãos com preparação alcoólica (álcool gel 70%)?',
    answer: '20 a 30 segundos (até a secagem completa das mãos).',
    keyMnemonic: 'Álcool: 20-30 seg | Água e Sabão: 40-60 seg',
    explanation: 'Nunca se deve secar as mãos com papel toalha após o uso do álcool gel; deve-se esperar a evaporação natural.',
    status: 'new'
  },
  {
    id: 73,
    category: 'Biossegurança & Infecção',
    question: 'O que define infecção do sítio cirúrgico (ISC) incisional superficial?',
    answer: 'Infecção que ocorre nos primeiros 30 dias após a cirurgia e envolve apenas pele e tecido subcutâneo.',
    keyMnemonic: 'ISC Superficial: até 30 dias e atinge apenas pele/subcutâneo',
    explanation: 'Se envolver fáscia e músculo é incisional profunda; se envolver cavidade orgânica manipulada é de órgão/espaço.',
    status: 'new'
  },
  {
    id: 74,
    category: 'Biossegurança & Infecção',
    question: 'Qual a janela de tempo máxima para início da Profilaxia Pós-Exposição (PEP) ao HIV após acidente pérfuro-cortante?',
    answer: 'Preferencialmente nas primeiras 2 horas, com limite máximo de até 72 horas.',
    keyMnemonic: 'PEP HIV: Ideal < 2h | Limite máximo: 72h por 28 dias',
    explanation: 'Após 72 horas, o vírus já estabelece integração genômica e a profilaxia profilática perde eficácia.',
    status: 'new'
  },
  {
    id: 75,
    category: 'Biossegurança & Infecção',
    question: 'É permitido reencapar manualmente agulhas descartáveis usadas?',
    answer: 'TERMINANTEMENTE PROIBIDO pela NR-32 e diretrizes de biossegurança.',
    keyMnemonic: 'Nunca reencape agulha! Descarte direto na caixa Descarpack',
    explanation: 'O reencape manual é a causa de mais de 70% dos acidentes perfurocortantes com material biológico.',
    status: 'new'
  },

  // --- SAÚDE DA MULHER & CRIANÇA (15 cards) ---
  {
    id: 76,
    category: 'Saúde da Mulher & Criança',
    question: 'Quais são os 5 parâmetros avaliados na Escala de Apgar do recém-nascido?',
    answer: '1. Frequência Cardíaca; 2. Esforço Respiratório; 3. Tônus Muscular; 4. Irritabilidade Reflexa; 5. Cor da Pele (Aparência).',
    keyMnemonic: 'APGAR: Aparência, Pulso, Gesto, Atividade, Respiração',
    explanation: 'Avaliado no 1º e no 5º minuto de vida extrauterina, pontuando de 0 a 2 em cada item (total 0 a 10).',
    status: 'new'
  },
  {
    id: 77,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a conduta para um recém-nascido no primeiro minuto de vida que apresenta Apgar de 8 a 10?',
    answer: 'Recém-nascido com boa adaptação à vida extrauterina: contato pele a pele precoce com a mãe e amamentação na 1ª hora.',
    keyMnemonic: 'Apgar 8-10: Vigoroso, pele a pele e aleitamento imediato',
    explanation: 'Não requer manobras invasivas de reanimação neonatal imediata, mantendo-se aquecido e seco.',
    status: 'new'
  },
  {
    id: 78,
    category: 'Saúde da Mulher & Criança',
    question: 'Como calcular a Data Provável do Parto (DPP) pela Regra de Naegele se a DUM foi 10 de maio?',
    answer: '17 de fevereiro do ano seguinte (Dia + 7 e Mês - 3 ou + 9).',
    keyMnemonic: 'Regra de Naegele: Dia + 7 | Mês - 3 (ou + 9)',
    explanation: 'Cálculo: Dia: 10 + 7 = 17 | Mês 5 (maio) - 3 = Mês 2 (fevereiro). DPP = 17 de fevereiro.',
    status: 'new'
  },
  {
    id: 79,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a recomendação da OMS e Ministério da Saúde para o aleitamento materno exclusivo (AME)?',
    answer: 'Exclusivo até os 6 meses de vida (sem água, chá ou outros alimentos) e complementado até 2 anos ou mais.',
    keyMnemonic: 'AME exclusivo até 6 meses; complementado até 2 anos+',
    explanation: 'Protege contra diarreias, pneumonias, desnutrição e fortalece o vínculo materno-infantil.',
    status: 'new'
  },
  {
    id: 80,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual o período ideal para a coleta do Teste do Pezinho (Triagem Neonatal Biológica)?',
    answer: 'Entre o 3º e o 5º dia de vida do recém-nascido (após o início da ingestão proteica de leite).',
    keyMnemonic: 'Teste do Pezinho: 3º ao 5º dia de vida',
    explanation: 'A coleta antes de 48h pode gerar falsos negativos (ex: fenilcetonúria), e após o 5º dia atrasa o tratamento oportuno.',
    status: 'new'
  },
  {
    id: 81,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a definição clássica de Pré-Eclâmpsia na gestação?',
    answer: 'Hipertensão arterial (PA ≥ 140/90 mmHg) surgida após a 20ª semana de gestação associada a proteinúria significativa.',
    keyMnemonic: 'Pré-eclâmpsia = PA alta + Proteinúria após 20 semanas',
    explanation: 'Se a gestante evoluir com convulsões tônico-clônicas generalizadas não atribuíveis a outras causas, temos a Eclâmpsia.',
    status: 'new'
  },
  {
    id: 82,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a droga de escolha no tratamento e profilaxia das convulsões na Eclâmpsia e Pré-eclâmpsia grave?',
    answer: 'Sulfato de Magnésio (MgSO4) por esquema de Pritchard ou Zuspan.',
    keyMnemonic: 'Eclâmpsia = Sulfato de Magnésio! (Antídoto: Gluconato de Cálcio)',
    explanation: 'A enfermagem deve monitorar reflexo patelar presente, diurese > 25 mL/h e frequência respiratória > 16 rpm.',
    status: 'new'
  },
  {
    id: 83,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual o antídoto imediato para a intoxicação por Sulfato de Magnésio?',
    answer: 'Gluconato de Cálcio a 10% (10 mL EV lento).',
    keyMnemonic: 'Intoxicação por MgSO4 -> Gluconato de Cálcio a 10%',
    explanation: 'Sinais de intoxicação: perda do reflexo patelar, bradipneia (< 12 rpm) e oligúria extrema.',
    status: 'new'
  },
  {
    id: 84,
    category: 'Saúde da Mulher & Criança',
    question: 'Quantas consultas de pré-natal são recomendadas no mínimo pelo Ministério da Saúde?',
    answer: 'No mínimo 6 consultas presenciais (sendo 1 no 1º trimestre, 2 no 2º trimestre e 3 no 3º trimestre).',
    keyMnemonic: 'Mínimo de 6 consultas de pré-natal no SUS',
    explanation: 'A recomendação visa identificar precocemente fatores de risco materno-fetais e garantir o parto seguro.',
    status: 'new'
  },
  {
    id: 85,
    category: 'Saúde da Mulher & Criança',
    question: 'O que é Colostro e qual a sua principal característica imunológica?',
    answer: 'Primeiro leite produzido nos primeiros dias pós-parto, rico em proteínas e anticorpos (especialmente Imunoglobulina A secretória - IgA).',
    keyMnemonic: 'Colostro = Primeira vacina do bebê (rico em IgA)',
    explanation: 'Reveste o trato gastrointestinal do neonato, impedindo a adesão de patógenos.',
    status: 'new'
  },
  {
    id: 86,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a profilaxia padrão realizada nos olhos do recém-nascido logo após o parto para prevenir a oftalmia gonocócica?',
    answer: 'Método de Credé (aplicação de Nitrato de Prata a 1% ou colírio de eritromicina/tetraciclina).',
    keyMnemonic: 'Credé = Nitrato de Prata 1% nas primeiras horas de vida',
    explanation: 'Previne cegueira neonatal causada por Neisseria gonorrhoeae transmitida no canal de parto.',
    status: 'new'
  },
  {
    id: 87,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a vitamina administrada por via intramuscular na sala de parto para prevenir a Doença Hemorrágica do Recém-Nascido?',
    answer: 'Vitamina K1 (Fitomenadiona) 1 mg IM.',
    keyMnemonic: 'Vitamina K no vasto lateral = Previne sangramentos no RN',
    explanation: 'O fígado imaturo do RN e a ausência transitória de flora bacteriana intestinal impedem a síntese de fatores de coagulação.',
    status: 'new'
  },
  {
    id: 88,
    category: 'Saúde da Mulher & Criança',
    question: 'O que caracteriza a Hemorragia Pós-Parto (HPP) primária no parto vaginal?',
    answer: 'Perda sanguínea superior a 500 mL nas primeiras 24 horas pós-parto (> 1000 mL na cesariana).',
    keyMnemonic: 'HPP: > 500 mL no parto normal | > 1000 mL na cesárea',
    explanation: 'A principal causa (70-80% dos casos) é a atonia uterina, combatida com massagem uterina e ocitocina.',
    status: 'new'
  },
  {
    id: 89,
    category: 'Saúde da Mulher & Criança',
    question: 'Qual a periodicidade de rastreamento do Câncer de Colo de Útero (Exame Papanicolau/Citopatológico)?',
    answer: 'Mulheres de 25 a 64 anos que já iniciaram atividade sexual: anualmente; após 2 exames normais consecutivos, a cada 3 anos.',
    keyMnemonic: 'Papanicolau: 25 a 64 anos. 2 anuais normais -> a cada 3 anos',
    explanation: 'Método de excelência para detecção de lesões pré-cursoras causadas pelo HPV.',
    status: 'new'
  },
  {
    id: 90,
    category: 'Saúde da Mulher & Criança',
    question: 'O que é a manobra de Kristeller no trabalho de parto?',
    answer: 'Pressão violenta no fundo do útero para empurrar o bebê; conduta PROIBIDA e considerada violência obstétrica.',
    keyMnemonic: 'Kristeller = PROIBIDO! Causa ruptura uterina e trauma fetal',
    explanation: 'Contraindicada expressamente pela OMS, Ministério da Saúde e Diretrizes de Atenção ao Parto.',
    status: 'new'
  },

  // --- MÉDICO-CIRÚRGICA & FERIDAS (15 cards) ---
  {
    id: 91,
    category: 'Médico-Cirúrgica',
    question: 'Qual é o período intraoperatório ou transoperatório?',
    answer: 'Inicia no momento em que o paciente é recebido na sala de cirurgia e termina quando ele é transferido para a Sala de Recuperação Pós-Anestésica (SRPA).',
    keyMnemonic: 'Transoperatório = Entrada na Sala Cirúrgica até admissão na SRPA',
    explanation: 'O pós-operatório imediato compreende as primeiras 24 horas pós-cirurgia.',
    status: 'new'
  },
  {
    id: 92,
    category: 'Médico-Cirúrgica',
    question: 'Como se caracteriza a Lesão por Pressão (LPP) de Estágio 2?',
    answer: 'Perda da pele em sua espessura parcial, com exposição da derme; leito da ferida viável, rosa ou vermelho e úmido (ou flictena intacta/rompida).',
    keyMnemonic: 'Estágio 2 = Derme exposta ou bolha (flictena) com líquido',
    explanation: 'No Estágio 1 a pele é íntegra com eritema não branqueável; no Estágio 3 há perda total da pele e tecido adiposo visível.',
    status: 'new'
  },
  {
    id: 93,
    category: 'Médico-Cirúrgica',
    question: 'O que caracteriza a Lesão por Pressão de Estágio 4?',
    answer: 'Perda total da espessura da pele e perda tecidual com exposição direta ou palpação de fáscia, músculo, tendão ou osso.',
    keyMnemonic: 'Estágio 4 = Músculo, tendão ou osso visíveis!',
    explanation: 'Frequentemente apresenta descolamentos e túneis teciduais associados.',
    status: 'new'
  },
  {
    id: 94,
    category: 'Médico-Cirúrgica',
    question: 'Para que tipo de ferida a cobertura de Alginato de Cálcio é estritamente indicada?',
    answer: 'Feridas com moderada a alta quantidade de exsudato (sangramento leve/hemostático).',
    keyMnemonic: 'Alginato de Cálcio = Puxa muito exsudato (feridas muito úmidas)',
    explanation: 'Ao entrar em contato com o exsudato, o sódio da ferida troca com o cálcio do alginato formando um gel que não resseca o leito.',
    status: 'new'
  },
  {
    id: 95,
    category: 'Médico-Cirúrgica',
    question: 'Qual a principal indicação da cobertura de Hidrogel no tratamento de lesões e feridas?',
    answer: 'Desbridamento autolítico de tecidos necróticos secos (escara/esfacelo) e hidratação de feridas secas com pouca secreção.',
    keyMnemonic: 'Hidrogel = Dá água à ferida seca para amolecer a necrose',
    explanation: 'Composto por água e polímeros, promove um ambiente úmido propício para a ação de enzimas endógenas.',
    status: 'new'
  },
  {
    id: 96,
    category: 'Médico-Cirúrgica',
    question: 'Qual o cuidado primordial com o Selo d’Água em drenos de tórax para evitar pneumotórax hipertensivo iatrogênico?',
    answer: 'O frasco deve ser mantido sempre ABAIXO do nível do tórax do paciente e o tubo imerso a pelo menos 2 cm em água destilada/soro.',
    keyMnemonic: 'Frasco sempre abaixo do tórax e oscilando com a respiração',
    explanation: 'Elevar o frasco acima do tórax faz o líquido refluir para a cavidade pleural, causando infecção e colapso pulmonar.',
    status: 'new'
  },
  {
    id: 97,
    category: 'Médico-Cirúrgica',
    question: 'Qual o principal fator de risco avaliado pela Escala de Braden na prática hospitalar?',
    answer: 'Risco de desenvolvimento de Lesões por Pressão (LPP).',
    keyMnemonic: 'Braden: Menor a nota -> Maior o risco de LPP! (< 12 = Alto Risco)',
    explanation: 'Avalia 6 subescalas: Percepção sensorial, Umidade, Atividade, Mobilidade, Nutrição, Fricção e cisalhamento.',
    status: 'new'
  },
  {
    id: 98,
    category: 'Médico-Cirúrgica',
    question: 'A cada quanto tempo deve ser realizada a mudança de decúbito em pacientes acamados com risco de lesão por pressão?',
    answer: 'No máximo a cada 2 horas.',
    keyMnemonic: 'Mudança de decúbito a cada 2 horas (relógio de posicionamento)',
    explanation: 'Alivia a pressão capilar sobre proeminências ósseas (sacro, calcâneos, trocanteres) prevenindo isquemia tecidual.',
    status: 'new'
  },
  {
    id: 99,
    category: 'Médico-Cirúrgica',
    question: 'O que avalia a Escala de Aldrete e Kroulik na Sala de Recuperação Pós-Anestésica (SRPA)?',
    answer: 'Condições de alta da SRPA para a enfermaria (Atividade motora, Respiração, Circulação/PA, Consciência e Saturação de O2).',
    keyMnemonic: 'Aldrete e Kroulik: Índice ≥ 8 a 9 para ter alta da recuperação',
    explanation: 'Garante que os reflexos protetores e estabilidade hemodinâmica foram restabelecidos após a anestesia.',
    status: 'new'
  },
  {
    id: 100,
    category: 'Médico-Cirúrgica',
    question: 'Qual a conduta de enfermagem imediata em caso de Evisceração pós-operatória na enfermaria?',
    answer: 'Cobrir as vísceras expostas com compressas estéreis embebidas em soro fisiológico morno; NÃO tentar reintroduzir os órgãos.',
    keyMnemonic: 'Evisceração: Compressa estéril úmida morna + Chamar cirurgião imediato!',
    explanation: 'Manter o paciente em posição de Fowler com os joelhos fletidos para diminuir a tensão na parede abdominal.',
    status: 'new'
  },

  // --- SAÚDE COLETIVA & VACINAS (8 cards adicionais para somar 108 cards!) ---
  {
    id: 101,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Quais vacinas devem ser administradas ao recém-nascido ainda na maternidade preferencialmente nas primeiras 12 horas?',
    answer: 'Vacina BCG (Dose única) e Vacina Hepatite B recombinante (Dose ao nascer).',
    keyMnemonic: 'Ao nascer na maternidade: BCG + Hepatite B',
    explanation: 'A BCG previne as formas graves de tuberculose (miliar e meníngea) e a Hepatite B previne a transmissão vertical.',
    status: 'new'
  },
  {
    id: 102,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Qual a via e o volume padrão de administração da vacina BCG?',
    answer: 'Via Intradérmica (ID) no braço direito, volume de 0,1 mL.',
    keyMnemonic: 'BCG: Intradérmica no braço direito (0,1 mL com pápula de casca de laranja)',
    explanation: 'A formação da pápula é indicativo imediato da técnica correta; evolui para mácula, pústula, úlcera e cicatriz vacinal.',
    status: 'new'
  },
  {
    id: 103,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Qual a faixa de temperatura padrão para conservação dos imunobiológicos na Rede de Frio (geladeira da sala de vacina)?',
    answer: 'Entre +2 °C e +8 °C (temperatura ideal alvo de +5 °C).',
    keyMnemonic: '+2°C a +8°C (Ideal = +5°C). Nunca congelar!',
    explanation: 'Oscilações fora dessa faixa comprometem a potência imunogênica e exigem notificação imediata à instância regional.',
    status: 'new'
  },
  {
    id: 104,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Quais doenças são prevenidas pela Vacina Pentavalente no calendário infantil do SUS?',
    answer: 'Difteria, Tétano, Coqueluche, Hepatite B e infecções graves por Haemophilus influenzae tipo b (meningite/pneumonia).',
    keyMnemonic: 'Penta = DTP + Hep B + Hib (administrada aos 2, 4 e 6 meses)',
    explanation: 'Administrada por via intramuscular profunda no músculo vasto lateral da coxa em lactentes.',
    status: 'new'
  },
  {
    id: 105,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Qual o esquema vacinal da Vacina Inativada Poliomielite (VIP) e a atualização sobre a vacina oral (VOP)?',
    answer: 'Aos 2, 4 e 6 meses com VIP (injetável) e doses de reforço com a própria VIP (substituindo a VOP em gotas no SUS).',
    keyMnemonic: 'Poliomielite agora 100% Inativada (VIP injetável)',
    explanation: 'A transição para 100% VIP elimina qualquer risco residual de paralisia flácida associada à vacina oral atenuada.',
    status: 'new'
  },
  {
    id: 106,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Quais vírus são cobertos pela Vacina Tríplice Viral (SCR)?',
    answer: 'Sarampo, Caxumba e Rubéola.',
    keyMnemonic: 'Tríplice Viral = Sarampo, Caxumba, Rubéola (SCR) aos 12 meses',
    explanation: 'Aos 15 meses de vida a criança recebe a Tetraviral (SCR + Varicela).',
    status: 'new'
  },
  {
    id: 107,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Qual a faixa etária recomendada pelo Ministério da Saúde para vacinação gratuita de meninos e meninas contra o HPV no SUS?',
    answer: 'Crianças e adolescentes de 9 a 14 anos (em dose única).',
    keyMnemonic: 'HPV no SUS: 9 a 14 anos em dose única!',
    explanation: 'Previne contra câncer de colo de útero, pênis, ânus, orofaringe e verrugas anogenitais (sorotipos 6, 11, 16 e 18).',
    status: 'new'
  },
  {
    id: 108,
    category: 'Saúde Coletiva & Vacinas',
    question: 'Qual o tempo máximo de validade de um frasco multidose de vacina Tríplice Viral após reconstituição?',
    answer: 'Até 6 a 8 horas mantido entre +2 °C e +8 °C.',
    keyMnemonic: 'Vacinas virais atenuadas liofilizadas duram poucas horas após abertas (máx 6-8h)',
    explanation: 'Após esse prazo a viabilidade dos vírus atenuados cai vertiginosamente e o frasco deve ser descartado.',
    status: 'new'
  }
];
