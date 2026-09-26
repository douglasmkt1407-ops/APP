export interface AvatarPreset {
  id: string;
  name: string;
  role: string;
  color: string;
  dataUrl: string;
}

// Crisp, high-definition SVG data URIs tailored for healthcare professionals
export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'nurse-teal',
    name: 'Enfermeira Geral',
    role: 'Scrub Verde & Estetoscópio',
    color: '#00E5A3',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#092524" />
            <stop offset="100%" stop-color="#021415" />
          </linearGradient>
          <linearGradient id="scrub1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00E5A3" />
            <stop offset="100%" stop-color="#00A876" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg1)" stroke="#00E5A3" stroke-width="3" />
        <!-- Body / Scrub -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="url(#scrub1)" />
        <!-- V-neck -->
        <polygon points="60,94 48,78 72,78" fill="#F8C79D" />
        <!-- Stethoscope around neck -->
        <path d="M46 78 C46 95 50 102 54 102 C58 102 62 96 62 90" fill="none" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="62" cy="90" r="4.5" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5" />
        <!-- Head & Hair -->
        <circle cx="60" cy="46" r="21" fill="#F8C79D" />
        <path d="M39 44 C39 30 47 22 60 22 C73 22 81 30 81 44 C81 46 79 46 76 38 C72 32 66 30 60 30 C54 30 48 32 44 38 C41 46 39 46 39 44 Z" fill="#3D2314" />
        <!-- Nurse Cap -->
        <path d="M45 25 Q60 19 75 25 L73 17 Q60 14 47 17 Z" fill="#FFFFFF" />
        <line x1="57" y1="21" x2="63" y2="21" stroke="#00E5A3" stroke-width="2" stroke-linecap="round" />
        <line x1="60" y1="18" x2="60" y2="24" stroke="#00E5A3" stroke-width="2" stroke-linecap="round" />
        <!-- Face Features -->
        <circle cx="53" cy="46" r="2.2" fill="#1E293B" />
        <circle cx="67" cy="46" r="2.2" fill="#1E293B" />
        <path d="M56 53 Q60 56 64 53" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      </svg>
    `)}`
  },
  {
    id: 'nurse-blue',
    name: 'Técnico Hospitalar',
    role: 'Scrub Azul & Crachá',
    color: '#0284C7',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#081E3D" />
            <stop offset="100%" stop-color="#030C1A" />
          </linearGradient>
          <linearGradient id="scrub2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0284C7" />
            <stop offset="100%" stop-color="#0369A1" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg2)" stroke="#38BDF8" stroke-width="3" />
        <!-- Scrub -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="url(#scrub2)" />
        <polygon points="60,94 48,78 72,78" fill="#E0A97E" />
        <!-- ID Badge on chest -->
        <rect x="70" y="86" width="12" height="16" rx="2" fill="#FFFFFF" />
        <rect x="72" y="89" width="8" height="3" fill="#0284C7" />
        <circle cx="76" cy="95" r="2" fill="#94A3B8" />
        <!-- Head & Hair -->
        <circle cx="60" cy="46" r="21" fill="#E0A97E" />
        <path d="M40 42 C40 28 48 24 60 24 C72 24 80 28 80 42 C78 35 73 30 60 30 C47 30 42 35 40 42 Z" fill="#1C1917" />
        <!-- Stethoscope -->
        <path d="M45 78 C45 96 50 103 55 103 C60 103 65 96 65 89" fill="none" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
        <!-- Face Features -->
        <circle cx="53" cy="47" r="2.2" fill="#0F172A" />
        <circle cx="67" cy="47" r="2.2" fill="#0F172A" />
        <path d="M55 54 Q60 58 65 54" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" />
      </svg>
    `)}`
  },
  {
    id: 'samu-rescuer',
    name: 'Socorrista / SAMU 192',
    role: 'Urgência & Emergência',
    color: '#EF4444',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#360C0C" />
            <stop offset="100%" stop-color="#170303" />
          </linearGradient>
          <linearGradient id="samu" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#EA580C" />
            <stop offset="100%" stop-color="#C2410C" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg3)" stroke="#F97316" stroke-width="3" />
        <!-- Uniform -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="url(#samu)" />
        <polygon points="60,92 50,78 70,78" fill="#F8C79D" />
        <!-- Star of Life / Cruz de Emergência -->
        <circle cx="36" cy="92" r="7" fill="#0284C7" />
        <path d="M36 88 L36 96 M32 92 L40 92" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        <!-- Reflective stripes -->
        <line x1="28" y1="102" x2="92" y2="102" stroke="#FEF08A" stroke-width="3" stroke-dasharray="6,3" />
        <!-- Head & Hair -->
        <circle cx="60" cy="46" r="21" fill="#F8C79D" />
        <path d="M40 40 C40 26 48 22 60 22 C72 22 80 26 80 40 C78 33 72 28 60 28 C48 28 42 33 40 40 Z" fill="#3E2723" />
        <!-- Face Features -->
        <circle cx="53" cy="46" r="2.2" fill="#18181B" />
        <circle cx="67" cy="46" r="2.2" fill="#18181B" />
        <path d="M56 53 Q60 56 64 53" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      </svg>
    `)}`
  },
  {
    id: 'surgical-tech',
    name: 'Centro Cirúrgico & UTI',
    role: 'Gorro & Máscara Cirúrgica',
    color: '#06B6D4',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#082A33" />
            <stop offset="100%" stop-color="#031217" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg4)" stroke="#06B6D4" stroke-width="3" />
        <!-- Surgical Scrub -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="#0891B2" />
        <!-- Head -->
        <circle cx="60" cy="48" r="22" fill="#F8C79D" />
        <!-- Surgical Cap -->
        <path d="M37 44 C37 25 45 18 60 18 C75 18 83 25 83 44 Z" fill="#0E7490" />
        <!-- Cap elastic pattern -->
        <path d="M38 43 Q60 40 82 43" fill="none" stroke="#22D3EE" stroke-width="1.5" />
        <!-- Eyes -->
        <circle cx="52" cy="42" r="2.2" fill="#18181B" />
        <circle cx="68" cy="42" r="2.2" fill="#18181B" />
        <!-- Protective Glasses Frame -->
        <rect x="44" y="36" width="16" height="11" rx="3" fill="#E0F2FE" fill-opacity="0.5" stroke="#38BDF8" stroke-width="1.5" />
        <rect x="60" y="36" width="16" height="11" rx="3" fill="#E0F2FE" fill-opacity="0.5" stroke="#38BDF8" stroke-width="1.5" />
        <line x1="59" y1="41" x2="61" y2="41" stroke="#38BDF8" stroke-width="2" />
        <!-- Surgical Mask -->
        <rect x="44" y="49" width="32" height="18" rx="4" fill="#E0F2FE" stroke="#0891B2" stroke-width="1.5" />
        <line x1="48" y1="55" x2="72" y2="55" stroke="#BAE6FD" stroke-width="1" />
        <line x1="48" y1="60" x2="72" y2="60" stroke="#BAE6FD" stroke-width="1" />
      </svg>
    `)}`
  },
  {
    id: 'nurse-pediatrics',
    name: 'Saúde Materno-Infantil',
    role: 'Gorro Lilás & Pediatria',
    color: '#A855F7',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#260C38" />
            <stop offset="100%" stop-color="#12041C" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg5)" stroke="#A855F7" stroke-width="3" />
        <!-- Lilac Scrub -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="#9333EA" />
        <polygon points="60,94 48,78 72,78" fill="#F8C79D" />
        <!-- Little Teddy Bear / Heart badge -->
        <circle cx="74" cy="90" r="5" fill="#F472B6" />
        <path d="M72 89 Q74 87 76 89 Q74 92 72 89" fill="#FFFFFF" />
        <!-- Head -->
        <circle cx="60" cy="46" r="21" fill="#F8C79D" />
        <!-- Lilac Scrub Cap with print dots -->
        <path d="M38 42 C38 24 46 19 60 19 C74 19 82 24 82 42 Z" fill="#7E22CE" />
        <circle cx="50" cy="27" r="1.5" fill="#F472B6" />
        <circle cx="60" cy="25" r="1.5" fill="#F472B6" />
        <circle cx="70" cy="28" r="1.5" fill="#F472B6" />
        <circle cx="55" cy="33" r="1.5" fill="#F472B6" />
        <circle cx="65" cy="34" r="1.5" fill="#F472B6" />
        <!-- Face Features -->
        <circle cx="53" cy="46" r="2.2" fill="#18181B" />
        <circle cx="67" cy="46" r="2.2" fill="#18181B" />
        <path d="M55 53 Q60 57 65 53" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      </svg>
    `)}`
  },
  {
    id: 'nurse-white-coat',
    name: 'Profissional Clínico',
    role: 'Jaleco Branco & Estetoscópio',
    color: '#10B981',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0E231C" />
            <stop offset="100%" stop-color="#05120E" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#bg6)" stroke="#10B981" stroke-width="3" />
        <!-- White Lab Coat with Inner Dark Scrub -->
        <path d="M22 108 C22 84 38 78 60 78 C82 78 98 84 98 108 Z" fill="#047857" />
        <polygon points="60,94 48,78 72,78" fill="#F8C79D" />
        <!-- Coat Lapels -->
        <path d="M30 108 L44 80 L52 96 L40 108 Z" fill="#F8FAFC" />
        <path d="M90 108 L76 80 L68 96 L80 108 Z" fill="#F8FAFC" />
        <!-- Stethoscope -->
        <path d="M46 78 C46 96 52 104 60 104 C68 104 74 96 74 78" fill="none" stroke="#64748B" stroke-width="3" stroke-linecap="round" />
        <circle cx="60" cy="104" r="4.5" fill="#10B981" stroke="#FFFFFF" stroke-width="1.5" />
        <!-- Head & Hair -->
        <circle cx="60" cy="46" r="21" fill="#F8C79D" />
        <path d="M40 40 C40 25 48 20 60 20 C72 20 80 25 80 40 C77 32 72 27 60 27 C48 27 43 32 40 40 Z" fill="#1F2937" />
        <!-- Face Features -->
        <circle cx="53" cy="46" r="2.2" fill="#111827" />
        <circle cx="67" cy="46" r="2.2" fill="#111827" />
        <path d="M55 53 Q60 56 65 53" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      </svg>
    `)}`
  }
];
