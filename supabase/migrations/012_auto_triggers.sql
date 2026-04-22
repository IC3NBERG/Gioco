-- GEOPOLITICA AVANZATA - Database Triggers for Automation
-- Version: 1.0.0
-- Automazione senza Edge Functions

-- =====================================================
-- TRIGGER 1: Auto Cold War Escalation
-- Esegue dopo ogni insert in game_turns
-- =====================================================
CREATE OR REPLACE FUNCTION auto_cold_war_escalation()
RETURNS TRIGGER AS $$
DECLARE
    v_nation TEXT;
    v_turn INT;
BEGIN
    v_nation := NEW.nation_id;
    v_turn := NEW.turn_number;

    -- Per ogni relazione esistente
    UPDATE cold_war_states
    SET tension_level = LEAST(100, tension_level + 2),
        phase = CASE 
            WHEN tension_level + 2 >= 80 THEN 'cold_war'
            WHEN tension_level + 2 >= 50 THEN 'tension'
            ELSE phase
        END,
        last_interaction_turn = v_turn,
        updated_at = NOW()
    WHERE nation_a = v_nation OR nation_b = v_nation;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_cold_war_escalation
AFTER INSERT ON game_turns
FOR EACH ROW
EXECUTE FUNCTION auto_cold_war_escalation();

-- =====================================================
-- TRIGGER 2: Auto Spy Detection
-- Esegue quando un'operazione spia viene completata
-- =====================================================
CREATE OR REPLACE FUNCTION auto_spy_detection()
RETURNS TRIGGER AS $$
DECLARE
    v_target_security RECORD;
    v_detection_chance FLOAT;
BEGIN
    IF NEW.status != 'completed' THEN
        RETURN NEW;
    END IF;

    SELECT level, counter_intelligence INTO v_target_security
    FROM national_security
    WHERE nation_id = NEW.target_nation;

    IF v_target_security IS NOT NULL THEN
        v_detection_chance := v_target_security.counter_intelligence / 100.0;
        
        IF random() < v_detection_chance THEN
            INSERT INTO security_threats (
                nation_id,
                threat_type,
                severity,
                source_nation,
                description,
                detected_at
            ) VALUES (
                NEW.target_nation,
                'spy',
                'medium',
                NEW.source_nation,
                'Attività di spionaggio rilevata: ' || NEW.type,
                EXTRACT(EPOCH FROM NOW())::INT
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_spy_detection
AFTER INSERT ON spy_operations
FOR EACH ROW
EXECUTE FUNCTION auto_spy_detection();

-- =====================================================
-- TRIGGER 3: Auto Security Level Update
-- Aggiorna livello sicurezza ogni turno
-- =====================================================
CREATE OR REPLACE FUNCTION auto_security_update()
RETURNS TRIGGER AS $$
DECLARE
    v_current_level INT;
    v_threats_count INT;
BEGIN
    SELECT level INTO v_current_level 
    FROM national_security 
    WHERE nation_id = NEW.nation_id;

    IF v_current_level IS NULL THEN
        RETURN NEW;
    END IF;

    SELECT COUNT(*) INTO v_threats_count
    FROM security_threats
    WHERE nation_id = NEW.nation_id AND status = 'active';

    IF v_threats_count > 3 THEN
        UPDATE national_security
        SET level = LEAST(100, v_current_level + 5)
        WHERE nation_id = NEW.nation_id;
    ELSIF v_threats_count = 0 AND v_current_level > 30 THEN
        UPDATE national_security
        SET level = GREATEST(20, v_current_level - 2)
        WHERE nation_id = NEW.nation_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_security_update
AFTER INSERT ON game_turns
FOR EACH ROW
EXECUTE FUNCTION auto_security_update();

-- =====================================================
-- TRIGGER 4: Auto Space Quest Progress
-- Progress automatico delle quest spaziali
-- =====================================================
CREATE OR REPLACE FUNCTION auto_space_quest_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_tech JSONB;
    v_nation TEXT;
BEGIN
    v_nation := NEW.nation_id;
    v_tech := NEW.tech;

    IF v_tech IS NULL THEN
        RETURN NEW;
    END IF;

    UPDATE space_quests
    SET status = 'available',
        progress = progress + 5
    WHERE nation_id = v_nation 
    AND status = 'locked'
    AND (
        (requirements->>'technology')::INT <= (v_tech->>'technology')::INT
        OR (requirements->>'launchers')::INT <= COALESCE((v_tech->'launchers'->>'level')::INT, 0)
    );

    UPDATE space_quests
    SET status = 'in_progress',
        started_at = NEW.turn_number
    WHERE nation_id = v_nation
    AND status = 'available'
    AND progress >= 100;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_space_quest_progress
AFTER INSERT ON game_turns
FOR EACH ROW
EXECUTE FUNCTION auto_space_quest_progress();

-- =====================================================
-- TRIGGER 5: Auto Faction Evolution
-- Cambia le fazioni nel tempo
-- =====================================================
CREATE OR REPLACE FUNCTION auto_faction_evolution()
RETURNS TRIGGER AS $$
DECLARE
    v_consensus JSONB;
    v_new_factions JSONB;
BEGIN
    v_consensus := NEW.consensus;

    IF v_consensus IS NULL THEN
        RETURN NEW;
    END IF;

    v_new_factions := NEW.factions;

    IF (v_consensus->>'general')::INT < 30 THEN
        v_new_factions := jsonb_set(
            v_new_factions,
            '{0,base_approval}',
            ((v_new_factions->0->>'base_approval')::INT - 5)::TEXT,
            true
        );
        v_new_factions := jsonb_set(
            v_new_factions,
            '{2,base_approval}',
            ((v_new_factions->2->>'base_approval')::INT + 5)::TEXT,
            true
        );
    END IF;

    NEW.factions := v_new_factions;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_faction_evolution
BEFORE INSERT ON game_turns
FOR EACH ROW
EXECUTE FUNCTION auto_faction_evolution();

-- =====================================================
-- TRIGGER 6: Auto Event Generation
-- Genera eventi casuali
-- =====================================================
CREATE OR REPLACE FUNCTION auto_event_generation()
RETURNS TRIGGER AS $$
DECLARE
    v_event_types TEXT[] := ARRAY['economy', 'diplomacy', 'military', 'space'];
    v_random_event TEXT;
    v_severity TEXT;
BEGIN
    IF random() > 0.7 THEN
        v_random_event := v_event_types[floor(random() * array_length(v_event_types, 1)) + 1];
        v_severity := CASE 
            WHEN random() > 0.8 THEN 'positive'
            WHEN random() > 0.6 THEN 'negative'
            ELSE 'neutral'
        END;

        INSERT INTO game_events (
            turn_id,
            nation_id,
            type,
            title,
            description,
            severity
        ) VALUES (
            NEW.turn_id,
            NEW.nation_id,
            v_random_event,
            CASE v_random_event
                WHEN 'economy' THEN CASE WHEN v_severity = 'positive' THEN 'Crescita Inattesa' ELSE 'Crisi Economica' END
                WHEN 'diplomacy' THEN CASE WHEN v_severity = 'positive' THEN 'Alleanza Inattesa' ELSE 'Rottura Diplomatica' END
                WHEN 'military' THEN CASE WHEN v_severity = 'positive' THEN 'Espansione Militare' ELSE 'Minaccia Esterna' END
                WHEN 'space' THEN CASE WHEN v_severity = 'positive' THEN 'Successo Spaziale' ELSE 'Incidente Spaziale' END
            END,
            'Evento generato automaticamente',
            v_severity
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_event_generation
AFTER INSERT ON game_turns
FOR EACH ROW
EXECUTE FUNCTION auto_event_generation();

-- =====================================================
-- VERIFICA TRIGGER CREATI
-- =====================================================
SELECT trigger_name, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY trigger_name;