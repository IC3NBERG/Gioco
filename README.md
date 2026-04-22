# GEOPOLITICA AVANZATA

Simulazione geopolitica turn-based 3D con diplomazia, economia, conflitti e programma spaziale.

## 🚀 Quick Start

```bash
# 1. Installa dipendenze
npm install

# 2. Configura variabili ambiente
cp .env.example .env.local
# Modifica .env.local con le tue credenziali Supabase

# 3. Avvia sviluppo
npm run dev
```

## 🛠️ Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + Zustand
- **3D Globe**: Three.js + @react-three/fiber + @react-three/drei
- **Backend**: Supabase (Postgres + Edge Functions + Realtime)
- **Testing**: Vitest

## 📁 Struttura

```
src/
├── components/
│   ├── Dashboard.tsx      # KPI + azioni + gestione turni
│   ├── Globe3D.tsx       # Globo 3D interattivo
│   └── SpaceProgram.tsx   # Programma spaziale
├── data/
│   └── nations.ts        # 58 nazioni con dati completi
├── store/              # Zustand store
├── utils/              # Logica di gioco
└── types.ts            # Tipi TypeScript

supabase/
├── migrations/         # Schema DB
└── functions/        # Edge Functions
```

## 🌍 Nazioni

58 nazioni con:
- Posizioni geografiche (lat/lng)
- Risorse iniziali
- Leader con ideologia e personalità
- Relazioni bilaterali
- Progresso tecnologico spaziale

## 🚀 Programma Spaziale

Tech tree completo:
- **Lanciatori** → Satelliti → Stazione Spaziale → Base Lunare → Missione Marziana

## 🗺️ Mappa 3D

- Globo interattivo con Three.js
- Visualizzazione dall'alto (orbita)
- Marker per ogni nazione
- Tooltip al passaggio del mouse
- Zoom e rotazione con il mouse

## 🎮 Come Giocare

1. Seleziona una nazione dal menu
2. Gestisci i tuoi Punti Azione (PA) - 3 per turno
3. Esegui azioni: diplomazia, economia, leggi, spazio
4. Sviluppa il programma spaziale
5. Obiettivo: 
   - Consenso ≥80% per 5 turni, OPPURE
   - Base Lunare livello 3, OPPURE
   - Missione Marziana completata

## ⚙️ Variabili Ambiente

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🧪 Test

```bash
npm run test
npm run test:watch
```

## 📜 Licenza

MIT