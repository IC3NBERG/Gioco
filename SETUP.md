# GEOPOLITICA AVANZATA - Configurazione

## ISTRUZIONI PER CONFIGURAZIONE

### 1. Supabase Setup (Obbligatorio)

1. Crea un progetto su https://supabase.com
2. Copia le credenziali dalle impostazioni del progetto:
   - Project URL → `VITE_SUPABASE_URL`
   - Project API keys (anon public) → `VITE_SUPABASE_ANON_KEY`
   - Service role key (per edge functions) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Database Setup

Esegui le migrazioni SQL in ordine:
```bash
supabase db push
# oppure copia il contenuto di:
# supabase/migrations/001_schema.sql
# supabase/migrations/002_full_schema.sql
```

### 3. Edge Functions

Deploy le funzioni:
```bash
supabase functions deploy resolve-turn
```

### 4. Variabili Environment

Crea un file `.env.local` con le tue credenziali:

```bash
# Required - Your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional - Game Configuration
VITE_GAME_NAME=Geopolitica Avanzata
VITE_GAME_VERSION=1.2.0
VITE_MAX_NATIONS=58
VITE_TURNS_PER_YEAR=4
```

---

## GAME CONFIGURATION

Le impostazioni di gioco sono configurabili in `src/config/gameConfig.ts`:

- PA_PER_TURN: 3 (Punti Azione per turno)
- MAX_TURNS_PER_YEAR: 4
- VICTORY_CONSENSUS_THRESHOLD: 80
- VICTORY_SPACE_LEVEL: 3
- AI_THINK_TIME_MS: 500
- EVENT_RETENTION_DAYS: 30

---

## STARTING VALUES

Ogni nazione inizia con:
- GDP: 1000
- Growth: 2.5%
- Inflation: 2.0%
- Consensus: 50%
- Tech Level: 1 (launchers)
- PA: 3