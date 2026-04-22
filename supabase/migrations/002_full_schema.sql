-- GEOPOLITICA AVANZATA - Schema Database Completo v2
-- Include 58 Nazioni + Multiplayer Schema
-- Version: 2.0.0
-- Stack: Supabase Postgres + RLS + JSONB

-- Abilita estensione pgcrypto per generazione UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- TABELLA: nations (58 NAZIONI) - Skip se esiste
-- =====================================================
CREATE TABLE IF NOT EXISTS nations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#3B82F6',
    flag_emoji TEXT,
    resources JSONB DEFAULT '{}',
    leader JSONB DEFAULT '{"name": "Leader", "personality": "Diplomatic", "ideology": "Pragmatic"}',
    start_relations JSONB DEFAULT '{}',
    tech_tree JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert 58 Nazioni
INSERT INTO nations (id, name, color, flag_emoji, resources, leader, start_relations, tech_tree) VALUES
-- Africa & Middle East
('afghanistan', 'Afghanistan', '#FF6B6B', '🇦🇫',
 '{"money": 500, "oil": 10, "steel": 5, "food": 20}',
 '{"name": "Hibatullah Akhundzada", "personality": "Aggressive", "ideology": "Nationalist"}',
 '{"pakistan": -10, "iran": 0, "usa": -30, "cina": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('algeria', 'Algeria', '#006233', '🇩🇿',
 '{"money": 600, "oil": 100, "steel": 20, "food": 40}',
 '{"name": "Abdelmadjid Tebboune", "personality": "Pragmatic", "ideology": "Nationalist"}',
 '{"francia": -10, "usa": 5, "marocco": -5, "italia": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('egitto', 'Egitto', '#C09300', '🇪🇬',
 '{"money": 600, "oil": 40, "steel": 20, "food": 50}',
 '{"name": "Abdel Fattah el-Sisi", "personality": "Aggressive", "ideology": "Nationalist"}',
 '{"usa": 5, "israel": -20, "saudita": 15, "italia": 10}',
 '{"launchers": {"level": 1, "progress": 25}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('emirati', 'Emirati Arabi Uniti', '#00732F', '🇦🇪',
 '{"money": 800, "oil": 100, "steel": 30, "food": 10}',
 '{"name": "Mohammed bin Zayed", "personality": "Diplomatic", "ideology": "Pragmatic"}',
 '{"saudita": 20, "usa": 15, "israel": 10, "cina": 10}',
 '{"launchers": {"level": 1, "progress": 45}, "satellites": {"level": 1, "progress": 30}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('iran', 'Iran', '#239E46', '🇮🇷',
 '{"money": 600, "oil": 100, "steel": 30, "food": 30}',
 '{"name": "Ebrahim Raisi", "personality": "Aggressive", "ideology": "Nationalist"}',
 '{"usa": -30, "russia": 15, "cina": 10, "iraq": 5}',
 '{"launchers": {"level": 1, "progress": 50}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('iraq', 'Iraq', '#007A3D', '🇮🇶',
 '{"money": 400, "oil": 80, "steel": 10, "food": 20}',
 '{"name": "Mohammed Shia Sudani", "personality": "Pragmatic", "ideology": "Pragmatic"}',
 '{"usa": 0, "iran": 10, "cina": 5, "turchia": -5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('israele', 'Israele', '#005BBB', '🇮🇱',
 '{"money": 700, "oil": 5, "steel": 30, "food": 15}',
 '{"name": "Benjamin Netanyahu", "personality": "Nationalist", "ideology": "Nationalist"}',
 '{"usa": 25, "egitto": -15, "iran": -30, "palestina": -40}',
 '{"launchers": {"level": 1, "progress": 40}, "satellites": {"level": 1, "progress": 35}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('kenya', 'Kenya', '#000000', '🇰🇪',
 '{"money": 400, "oil": 5, "steel": 10, "food": 40}',
 '{"name": "William Ruto", "personality": "Pragmatic", "ideology": "Pragmatic"}',
 '{"usa": 10, "cina": 5, "uk": 10, "etiopia": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('marocco', 'Marocco', '#C1272D', '🇲🇦',
 '{"money": 500, "oil": 5, "steel": 15, "food": 40}',
 '{"name": "Mohammed VI", "personality": "Conservative", "ideology": "Conservative"}',
 '{"francia": 10, "spagna": 5, "algeria": -10, "usa": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('nigeria', 'Nigeria', '#007A5E', '🇳🇬',
 '{"money": 600, "oil": 80, "steel": 20, "food": 60}',
 '{"name": "Bola Tinubu", "personality": "Pragmatic", "ideology": "Conservative"}',
 '{"usa": 10, "cina": 10, "uk": 10, "canada": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('qatar', 'Qatar', '#8A1538', '🇶🇦',
 '{"money": 700, "oil": 80, "steel": 15, "food": 5}',
 '{"name": "Tamim bin Hamad", "personality": "Pragmatic", "ideology": "Pragmatic"}',
 '{"saudita": 15, "usa": 15, "italia": 10, "turchia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('saudita', 'Arabia Saudita', '#006C35', '🇸🇦',
 '{"money": 900, "oil": 150, "steel": 30, "food": 10}',
 '{"name": "Mohammed bin Salman", "personality": "Pragmatic", "ideology": "Nationalist"}',
 '{"usa": 15, "emirati": 20, "iran": -20, "egitto": 10}',
 '{"launchers": {"level": 1, "progress": 40}, "satellites": {"level": 1, "progress": 30}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('sudafrica', 'Sudafrica', '#007749', '🇿🇦',
 '{"money": 600, "oil": 20, "steel": 40, "food": 40}',
 '{"name": "Cyril Ramaphosa", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"usa": 10, "cina": 15, "uk": 10, "zimbabwe": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('turchia', 'Turchia', '#E30A17', '🇹🇷',
 '{"money": 700, "oil": 20, "steel": 40, "food": 50}',
 '{"name": "Recep Tayyip Erdoğan", "personality": "Nationalist", "ideology": "Nationalist"}',
 '{"usa": 5, "russia": 0, "grecia": -10, "siria": -15}',
 '{"launchers": {"level": 1, "progress": 50}, "satellites": {"level": 1, "progress": 30}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

-- Americas
('argentina', 'Argentina', '#74ACDF', '🇦🇷',
 '{"money": 700, "oil": 30, "steel": 30, "food": 80}',
 '{"name": "Javier Milei", "personality": "Populist", "ideology": "Conservative"}',
 '{"usa": 10, "brasil": 15, "cina": 0, "regno_unito": -5}',
 '{"launchers": {"level": 1, "progress": 20}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('brasile', 'Brasile', '#009C3F', '🇧🇷',
 '{"money": 800, "oil": 40, "steel": 40, "food": 80}',
 '{"name": "Luiz Inácio Lula da Silva", "personality": "Populist", "ideology": "Progressive"}',
 '{"usa": 10, "argentina": 15, "cina": 15, "russia": 5}',
 '{"launchers": {"level": 1, "progress": 40}, "satellites": {"level": 1, "progress": 10}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('canada', 'Canada', '#FF0000', '🇨🇦',
 '{"money": 1000, "oil": 80, "steel": 50, "food": 60}',
 '{"name": "Justin Trudeau", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"usa": 25, "regno_unito": 20, "cina": -5, "francia": 10}',
 '{"launchers": {"level": 1, "progress": 15}, "satellites": {"level": 1, "progress": 5}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('colombia', 'Colombia', '#FFD900', '🇨🇴',
 '{"money": 500, "oil": 30, "steel": 15, "food": 40}',
 '{"name": "Gustavo Petro", "personality": "Populist", "ideology": "Progressive"}',
 '{"usa": 10, "venezuela": -5, "brasil": 10, "cina": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('messico', 'Messico', '#006341', '🇲🇽',
 '{"money": 700, "oil": 50, "steel": 30, "food": 60}',
 '{"name": "Claudia Sheinbaum", "personality": "Pragmatic", "ideology": "Progressive"}',
 '{"usa": 15, "cina": 5, "canada": 10, "cuba": 5}',
 '{"launchers": {"level": 1, "progress": 20}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('usa', 'Stati Uniti', '#3C3B6E', '🇺🇸',
 '{"money": 2500, "oil": 100, "steel": 100, "food": 100}',
 '{"name": "Joe Biden", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"canada": 20, "regno_unito": 20, "giappone": 15, "germania": 15}',
 '{"launchers": {"level": 3, "progress": 95}, "satellites": {"level": 3, "progress": 90}, "stations": {"level": 2, "progress": 60}, "lunar": {"level": 2, "progress": 50}, "mars": {"level": 1, "progress": 45}}'),

('venezuela', 'Venezuela', '#007934', '🇻🇪',
 '{"money": 300, "oil": 60, "steel": 10, "food": 20}',
 '{"name": "Nicolás Maduro", "personality": "Populist", "ideology": "Nationalist"}',
 '{"usa": -20, "russia": 15, "cina": 10, "colombia": -5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

-- Asia Pacific
('australia', 'Australia', '#00008B', '🇦🇺',
 '{"money": 900, "oil": 20, "steel": 50, "food": 60}',
 '{"name": "Anthony Albanese", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"usa": 20, "cina": -10, "giappone": 15, "regno_unito": 20}',
 '{"launchers": {"level": 1, "progress": 30}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('cina', 'Cina', '#DE2910', '🇨🇳',
 '{"money": 2000, "oil": 80, "steel": 150, "food": 90}',
 '{"name": "Xi Jinping", "personality": "Pragmatic", "ideology": "Nationalist"}',
 '{"usa": -20, "russia": 20, "giappone": -10, "india": 0}',
 '{"launchers": {"level": 3, "progress": 80}, "satellites": {"level": 3, "progress": 60}, "stations": {"level": 2, "progress": 30}, "lunar": {"level": 1, "progress": 50}, "mars": {"level": 1, "progress": 20}}'),

('corea_nord', 'Corea del Nord', '#0042A5', '🇰🇵',
 '{"money": 200, "oil": 5, "steel": 20, "food": 20}',
 '{"name": "Kim Jong-un", "personality": "Aggressive", "ideology": "Nationalist"}',
 '{"sudcorea": -50, "cina": 30, "russia": 15, "usa": -50}',
 '{"launchers": {"level": 1, "progress": 60}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('corea_sud', 'Corea del Sud', '#003478', '🇰🇷',
 '{"money": 1200, "oil": 30, "steel": 80, "food": 30}',
 '{"name": "Yoon Suk-yeol", "personality": "Conservative", "ideology": "Conservative"}',
 '{"usa": 20, "cina": -5, "giappone": 10, "nordcorea": -30}',
 '{"launchers": {"level": 2, "progress": 50}, "satellites": {"level": 2, "progress": 40}, "stations": {"level": 1, "progress": 20}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('filippine', 'Filippine', '#0038A8', '🇵🇭',
 '{"money": 500, "oil": 10, "steel": 15, "food": 50}',
 '{"name": "Bongbong Marcos", "personality": "Pragmatic", "ideology": "Nationalist"}',
 '{"usa": 15, "cina": -10, "giappone": 10, "vietnam": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('giappone', 'Giappone', '#FFFFFF', '🇯🇵',
 '{"money": 1400, "oil": 40, "steel": 100, "food": 30}',
 '{"name": "Fumio Kishida", "personality": "Technocratic", "ideology": "Pragmatic"}',
 '{"usa": 20, "cina": -10, "sudcorea": 5, "italia": 10}',
 '{"launchers": {"level": 2, "progress": 65}, "satellites": {"level": 2, "progress": 55}, "stations": {"level": 1, "progress": 30}, "lunar": {"level": 1, "progress": 10}, "mars": {"level": 0, "progress": 0}}'),

('india', 'India', '#FF9933', '🇮🇳',
 '{"money": 1000, "oil": 40, "steel": 60, "food": 80}',
 '{"name": "Narendra Modi", "personality": "Nationalist", "ideology": "Nationalist"}',
 '{"cina": -10, "pakistan": -30, "usa": 15, "russia": 10}',
 '{"launchers": {"level": 2, "progress": 85}, "satellites": {"level": 2, "progress": 70}, "stations": {"level": 1, "progress": 35}, "lunar": {"level": 1, "progress": 40}, "mars": {"level": 1, "progress": 30}}'),

('indonesia', 'Indonesia', '#FF0000', '🇮🇩',
 '{"money": 700, "oil": 40, "steel": 30, "food": 70}',
 '{"name": "Joko Widodo", "personality": "Pragmatic", "ideology": "Progressive"}',
 '{"cina": 5, "usa": 10, "australia": 10, "malaysia": 10}',
 '{"launchers": {"level": 1, "progress": 35}, "satellites": {"level": 1, "progress": 20}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('pakistan', 'Pakistan', '#01411C', '🇵🇰',
 '{"money": 500, "oil": 20, "steel": 20, "food": 50}',
 '{"name": "Shehbaz Sharif", "personality": "Pragmatic", "ideology": "Conservative"}',
 '{"india": -30, "cina": 15, "usa": 5, "afghanistan": -5}',
 '{"launchers": {"level": 1, "progress": 45}, "satellites": {"level": 1, "progress": 30}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('singapore', 'Singapore', '#ED2939', '🇸🇬',
 '{"money": 700, "oil": 10, "steel": 20, "food": 10}',
 '{"name": "Lee Hsien Loong", "personality": "Technocratic", "ideology": "Pragmatic"}',
 '{"usa": 15, "cina": 10, "malaysia": 10, "giappone": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('taiwan', 'Taiwan', '#DE2910', '🇹🇼',
 '{"money": 800, "oil": 5, "steel": 40, "food": 15}',
 '{"name": "Tsai Ing-wen", "personality": "Nationalist", "ideology": "Progressive"}',
 '{"usa": 15, "cina": -30, "giappone": 10, "sudcorea": 5}',
 '{"launchers": {"level": 1, "progress": 35}, "satellites": {"level": 1, "progress": 30}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('thailandia', 'Thailandia', '#A51931', '🇹🇭',
 '{"money": 600, "oil": 10, "steel": 25, "food": 50}',
 '{"name": "Srettha Thavisin", "personality": "Pragmatic", "ideology": "Conservative"}',
 '{"usa": 10, "cina": 5, "giappone": 10, "malaysia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('vietnam', 'Vietnam', '#DA251D', '🇻🇳',
 '{"money": 500, "oil": 10, "steel": 25, "food": 50}',
 '{"name": "Võ Văn Thưởng", "personality": "Pragmatic", "ideology": "Nationalist"}',
 '{"cina": 15, "usa": 5, "russia": 10, "filippine": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

-- Europe
('albania', 'Albania', '#E42E2E', '🇦🇱',
 '{"money": 400, "oil": 5, "steel": 10, "food": 25}',
 '{"name": "Bajram Begaj", "personality": "Diplomatic", "ideology": "Pragmatic"}',
 '{"italia": 15, "usa": 10, "grecia": 0, "cina": 0}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('austria', 'Austria', '#ED2939', '🇦🇹',
 '{"money": 600, "oil": 5, "steel": 20, "food": 30}',
 '{"name": "Alexander Van der Bellen", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"germania": 20, "italia": 10, "francia": 10, "usa": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('belgio', 'Belgio', '#FFD900', '🇧🇪',
 '{"money": 700, "oil": 10, "steel": 30, "food": 25}',
 '{"name": "Alexander De Croo", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"germania": 20, "francia": 15, "usa": 10, "italia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('finlandia', 'Finlandia', '#003580', '🇫🇮',
 '{"money": 600, "oil": 5, "steel": 20, "food": 25}',
 '{"name": "Sauli Niinistö", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"svezia": 20, "germania": 15, "usa": 10, "russia": -10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('francia', 'Francia', '#0055A4', '🇫🇷',
 '{"money": 1200, "oil": 20, "steel": 50, "food": 60}',
 '{"name": "Emmanuel Macron", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"germania": 20, "italia": 10, "usa": 15, "regno_unito": 5}',
 '{"launchers": {"level": 2, "progress": 70}, "satellites": {"level": 2, "progress": 50}, "stations": {"level": 1, "progress": 25}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('germania', 'Germania', '#000000', '🇩🇪',
 '{"money": 1500, "oil": 10, "steel": 80, "food": 40}',
 '{"name": "Olaf Scholz", "personality": "Technocratic", "ideology": "Conservative"}',
 '{"francia": 20, "italia": 15, "usa": 10, "polonia": 15}',
 '{"launchers": {"level": 2, "progress": 55}, "satellites": {"level": 2, "progress": 45}, "stations": {"level": 1, "progress": 20}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('grecia', 'Grecia', '#001489', '🇬🇷',
 '{"money": 400, "oil": 5, "steel": 15, "food": 30}',
 '{"name": "Kyriakos Mitsotakis", "personality": "Conservative", "ideology": "Conservative"}',
 '{"italia": 10, "francia": 10, "turchia": -10, "cipro": 20}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('italia', 'Italia', '#008C45', '🇮🇹',
 '{"money": 1000, "oil": 20, "steel": 40, "food": 50}',
 '{"name": "Giorgia Meloni", "personality": "Nationalist", "ideology": "Conservative"}',
 '{"francia": 10, "germania": 15, "usa": 10, "russia": -5}',
 '{"launchers": {"level": 1, "progress": 35}, "satellites": {"level": 1, "progress": 25}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('norvegia', 'Norvegia', '#BA0C2F', '🇳🇴',
 '{"money": 800, "oil": 60, "steel": 20, "food": 20}',
 '{"name": "Jonas Gahr Støre", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"svezia": 20, "usa": 15, "germania": 10, "russia": 0}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('nuova_zelanda', 'Nuova Zelanda', '#00247D', '🇳🇿',
 '{"money": 500, "oil": 5, "steel": 15, "food": 40}',
 '{"name": "Christopher Hipkins", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"australia": 25, "usa": 15, "uk": 15, "cina": 5}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('olanda', 'Paesi Bassi', '#FF6600', '🇳🇱',
 '{"money": 800, "oil": 10, "steel": 30, "food": 30}',
 '{"name": "Mark Rutte", "personality": "Diplomatic", "ideology": "Pragmatic"}',
 '{"germania": 20, "belgio": 15, "usa": 10, "francia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('polonia', 'Polonia', '#DC143C', '🇵🇱',
 '{"money": 600, "oil": 10, "steel": 30, "food": 40}',
 '{"name": "Donald Tusk", "personality": "Progressive", "ideology": "Progressive"}',
 '{"germania": 15, "usa": 15, "ucraina": 15, "russia": -15}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('portugallo', 'Portogallo', '#006600', '🇵🇹',
 '{"money": 500, "oil": 5, "steel": 20, "food": 30}',
 '{"name": "Luis Montenegro", "personality": "Diplomatic", "ideology": "Conservative"}',
 '{"spagna": 15, "francia": 10, "uk": 10, "usa": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('regno_unito', 'Regno Unito', '#00247D', '🇬🇧',
 '{"money": 1200, "oil": 30, "steel": 50, "food": 40}',
 '{"name": "Rishi Sunak", "personality": "Conservative", "ideology": "Conservative"}',
 '{"usa": 20, "francia": 10, "germania": 10, "australia": 15}',
 '{"launchers": {"level": 1, "progress": 40}, "satellites": {"level": 1, "progress": 35}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('romania', 'Romania', '#002B7F', '🇷🇴',
 '{"money": 500, "oil": 10, "steel": 20, "food": 30}',
 '{"name": "Klaus Iohannis", "personality": "Conservative", "ideology": "Conservative"}',
 '{"usa": 10, "ungheria": 5, "germania": 10, "francia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('russia', 'Russia', '#DA291C', '🇷🇺',
 '{"money": 1000, "oil": 150, "steel": 80, "food": 40}',
 '{"name": "Vladimir Putin", "personality": "Aggressive", "ideology": "Nationalist"}',
 '{"cina": 20, "india": 10, "usa": -20, "ucraina": -40}',
 '{"launchers": {"level": 3, "progress": 90}, "satellites": {"level": 3, "progress": 75}, "stations": {"level": 2, "progress": 40}, "lunar": {"level": 1, "progress": 30}, "mars": {"level": 1, "progress": 25}}'),

('spagna', 'Spagna', '#AA151B', '🇪🇸',
 '{"money": 800, "oil": 10, "steel": 30, "food": 50}',
 '{"name": "Pedro Sánchez", "personality": "Progressive", "ideology": "Progressive"}',
 '{"francia": 15, "germania": 10, "usa": 10, "italia": 10}',
 '{"launchers": {"level": 1, "progress": 25}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('svezia', 'Svezia', '#006AA7', '🇸🇪',
 '{"money": 700, "oil": 5, "steel": 25, "food": 25}',
 '{"name": "Ulf Kristersson", "personality": "Conservative", "ideology": "Conservative"}',
 '{"norvegia": 20, "germania": 15, "usa": 10, "finlandia": 15}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('svizzera', 'Svizzera', '#FF0000', '🇨🇭',
 '{"money": 900, "oil": 5, "steel": 30, "food": 15}',
 '{"name": "Viola Amherd", "personality": "Diplomatic", "ideology": "Pragmatic"}',
 '{"germania": 15, "francia": 10, "usa": 10, "italia": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('ucraina', 'Ucraina', '#0057B7', '🇺🇦',
 '{"money": 400, "oil": 10, "steel": 30, "food": 50}',
 '{"name": "Volodymyr Zelensky", "personality": "Diplomatic", "ideology": "Progressive"}',
 '{"usa": 15, "polonia": 15, "russia": -40, "germania": 10}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),

('ungheria', 'Ungheria', '#CD2939', '🇭🇺',
 '{"money": 500, "oil": 10, "steel": 20, "food": 30}',
 '{"name": "Viktor Orbán", "personality": "Nationalist", "ideology": "Nationalist"}',
 '{"polonia": 5, "germania": 10, "usa": 5, "russia": 0}',
 '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- TABELLA: game_turns (SNAPSHOT PER TURNO)
-- =====================================================
CREATE TABLE IF NOT EXISTS game_turns (
    turn_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    pa_remaining INT DEFAULT 3,
    config_version TEXT DEFAULT 'v1',
    economy JSONB DEFAULT '{"gdp": 1000, "growth": 2.5, "inflation": 2.0, "debt": 0, "debt_gdp": 0, "unemployment": 5.0, "budget_balance": 0, "reserves": 100}',
    consensus JSONB DEFAULT '{"general": 50, "economic": 50, "security": 50, "freedom": 50}',
    factions JSONB DEFAULT '[]',
    tech JSONB DEFAULT '{"launchers": {"level": 0, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}',
    rng_seed TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(nation_id, turn_number)
);

-- =====================================================
-- TABELLA: relations (RELAZIONI BILATERALI)
-- =====================================================
CREATE TABLE IF NOT EXISTS relations (
    nation_a TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    nation_b TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    value INT CHECK (value BETWEEN -100 AND 100) DEFAULT 0,
    agreements JSONB DEFAULT '{}',
    last_interaction_turn INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (nation_a, nation_b)
);

-- =====================================================
-- TABELLA: game_events (EVENT LOG)
-- =====================================================
CREATE TABLE IF NOT EXISTS game_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turn_id BIGINT REFERENCES game_turns(turn_id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('diplomacy', 'economy', 'crisis', 'election', 'space', 'military', 'media', 'system')),
    title TEXT NOT NULL,
    description TEXT,
    payload JSONB DEFAULT '{}',
    severity TEXT DEFAULT 'neutral' CHECK (severity IN ('positive', 'neutral', 'negative', 'critical')),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELLA: action_queue (AZIONI PENDENTI)
-- =====================================================
CREATE TABLE IF NOT EXISTS action_queue (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    turn_id BIGINT REFERENCES game_turns(turn_id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    target TEXT,
    params JSONB DEFAULT '{}',
    priority INT DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'failed', 'cancelled')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    applied_at TIMESTAMPTZ
);

-- =====================================================
-- TABELLA: consequences (EFFETTI DELAYED)
-- =====================================================
CREATE TABLE IF NOT EXISTS consequences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    turn_id BIGINT NOT NULL REFERENCES game_turns(turn_id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    effect_type TEXT NOT NULL,
    target TEXT NOT NULL,
    value INT NOT NULL,
    turns_remaining INT NOT NULL,
    applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELLA: game_sessions (MULTIPLAYER)
-- =====================================================
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Nuova Partita',
    status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'paused', 'finished')),
    current_turn INT DEFAULT 0,
    active_nations JSONB DEFAULT '[]',
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ
);

-- =====================================================
-- TABELLA: ai_turns (TURNI AI)
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_turns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
    nation_id TEXT NOT NULL REFERENCES nations(id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    actions JSONB DEFAULT '[]',
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELLA: config (CONFIGURAZIONE)
-- =====================================================
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert configurazione iniziale
INSERT INTO config (key, value, description) VALUES
    ('version', '"v2"', 'Versione schema'),
    ('game_rules', '{"pa_limit": 3, "turn_duration_hours": 24, "election_cycle": 12, "win_conditions": {"consensus": 80, "space": "colonization", "diplomatic": 90}, "lose_conditions": {"debt_gdp": 200, "consensus": 20, "isolation": 85}}', 'Regole del gioco'),
    ('ai_enabled', 'true', 'AI abilitata'),
    ('ai_nations', '["cina", "russia", "francia", "germania", "giappone", "india", "regno_unito", "brasile"]', 'Nazioni AI default')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE nations ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE consequences ENABLE ROW LEVEL SECURITY;

-- RLS Policies - skip (già creati in 001)

-- =====================================================
-- Create initial turns for all 58 nations (turn 0)
-- =====================================================
INSERT INTO game_turns (nation_id, turn_number, pa_remaining, economy, consensus, factions, tech, rng_seed)
SELECT 
    id,
    0,
    3,
    '{"gdp": 1000, "growth": 2.5, "inflation": 2.0, "debt": 0, "debt_gdp": 0, "unemployment": 5.0, "budget_balance": 0, "reserves": 100, "sectors": {"agriculture": {"level": 3, "efficiency": 0.7, "maintenance_cost": 5}, "industry": {"level": 3, "efficiency": 0.6, "maintenance_cost": 10}, "services": {"level": 4, "efficiency": 0.8, "maintenance_cost": 15}}}',
    '{"general": 50, "economic": 50, "security": 50, "freedom": 50}',
    '[{"id": "progressives", "name": "Progressisti", "type": "Progressive", "base_approval": 35, "weight": 0.3, "demands": {"environment": 1, "social": 1}, "mobilization": 30}, {"id": "conservatives", "name": "Conservatori", "type": "Conservative", "base_approval": 30, "weight": 0.25, "demands": {"tradition": 1, "economy": 1}, "mobilization": 25}, {"id": "nationalists", "name": "Nazionalisti", "type": "Nationalist", "base_approval": 20, "weight": 0.2, "demands": {"military": 1, "sovereignty": 1}, "mobilization": 20}, {"id": "globalists", "name": "Globalisti", "type": "Globalist", "base_approval": 15, "weight": 0.15, "demands": {"trade": 1, "cooperation": 1}, "mobilization": 15}]',
    COALESCE(tech_tree, '{"launchers": {"level": 1, "progress": 0}, "satellites": {"level": 0, "progress": 0}, "stations": {"level": 0, "progress": 0}, "lunar": {"level": 0, "progress": 0}, "mars": {"level": 0, "progress": 0}}'),
    encode(digest(id || '-0-v2', 'sha256'), 'hex')
FROM nations
ON CONFLICT (nation_id, turn_number) DO NOTHING;

-- =====================================================
-- Create initial relations between all nations
-- =====================================================
INSERT INTO relations (nation_a, nation_b, value)
SELECT n1.id, n2.id, 0
FROM nations n1
CROSS JOIN nations n2
WHERE n1.id < n2.id
ON CONFLICT (nation_a, nation_b) DO NOTHING;

-- =====================================================
-- Update existing relations from start_relations
-- =====================================================
UPDATE relations r
SET value = COALESCE(
    (SELECT CAST(start_relations->>n2.id AS INT)
     FROM nations n1
     WHERE n1.id = r.nation_a
     AND n1.start_relations ? n2.id),
    (SELECT CAST(n2.start_relations->>n1.id AS INT)
     FROM nations n2
     WHERE n2.id = r.nation_b
     AND n2.start_relations ? n1.id),
    0
)
WHERE EXISTS (
    SELECT 1 FROM nations n1 WHERE n1.id = r.nation_a
) AND EXISTS (
    SELECT 1 FROM nations n2 WHERE n2.id = r.nation_b
);

-- =====================================================
-- Create system event for game start
-- =====================================================
INSERT INTO game_events (nation_id, type, title, description, severity)
SELECT n.id, 'system', 'Partita Iniziata', 'La simulazione geopolitica è iniziata con ' || 58 || ' nazioni. Buona fortuna!', 'positive'
FROM nations n
WHERE NOT EXISTS (
    SELECT 1 FROM game_events e WHERE e.nation_id = n.id AND e.title = 'Partita Iniziata'
);