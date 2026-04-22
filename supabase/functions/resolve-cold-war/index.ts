import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const TensionThresholds = {
  neutral: 20,
  tension: 50,
  cold_war: 80,
  crisis: 95,
};

const ProvocationEffects: Record<string, number> = {
  military_exercise: 15,
  proxy_support: 25,
  propaganda: 10,
  arms_race: 20,
  embargo: 15,
  mediaction: 12,
};

const DeescalationEffects: Record<string, number> = {
  deescalate_proposal: -15,
  troop_withdraw: -10,
  arms_treaty: -20,
  trade_agreement: -12,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getPhase(tension: number): string {
  if (tension >= TensionThresholds.crisis) return 'crisis';
  if (tension >= TensionThresholds.cold_war) return 'cold_war';
  if (tension >= TensionThresholds.tension) return 'tension';
  return 'neutral';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { nation_a, nation_b, action, turn_number } = body;

    if (!nation_a || !nation_b) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing nation_a or nation_b',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const existingState = await supabase.from('cold_war_states')
      .select('*')
      .or(`nation_a.eq.${nation_a},nation_b.eq.${nation_a}`)
      .or(`nation_a.eq.${nation_b},nation_b.eq.${nation_b}`)
      .neq('phase', 'neutral')
      .single();

    const currentTension = existingState.data?.tension_level || 0;
    const currentPhase = existingState.data?.phase || 'neutral';

    let newTension = currentTension;
    let newPhase = currentPhase;
    let response: { escalation: boolean; phase_change: boolean; crisis: boolean } = {
      escalation: false,
      phase_change: false,
      crisis: false,
    };

    if (action === 'auto_check') {
      if (turn_number - (existingState.data?.last_interaction_turn || 0) >= 3) {
        if (currentTension >= TensionThresholds.tension) {
          newTension = clamp(newTension + 3, 0, 100);
          response.escalation = true;
        }
      }
    } else if (action === 'provoke') {
      const provocationType = body.provocation_type || 'military_exercise';
      const impact = ProvocationEffects[provocationType] || 10;
      newTension = clamp(currentTension + impact, 0, 100);
      response.escalation = true;
    } else if (action === 'deescalate') {
      const reduction = body.reduction || 15;
      newTension = clamp(currentTension - reduction, 0, 100);
    } else {
      newTension = clamp(currentTension + (action || 0), 0, 100);
    }

    newPhase = getPhase(newTension);

    if (newPhase !== currentPhase) {
      response.phase_change = true;
    }

    if (newPhase === 'crisis' && currentPhase !== 'crisis') {
      response.crisis = true;
    }

    if (existingState.data) {
      await supabase.from('cold_war_states')
        .update({
          tension_level: newTension,
          phase: newPhase,
          last_interaction_turn: turn_number,
          updated_at: new Date().toISOString(),
        })
        .eq('nation_a', nation_a)
        .eq('nation_b', nation_b);
    } else {
      await supabase.from('cold_war_states').insert({
        nation_a: nation_a,
        nation_b: nation_b,
        phase: newPhase,
        tension_level: newTension,
        last_interaction_turn: turn_number,
      });
    }

    if (action && action !== 'auto_check') {
      await supabase.from('cold_war_provocations').insert({
        source_nation: nation_a,
        target_nation: nation_b,
        type: action,
        description: `Azione: ${action}`,
        tension_impact: newTension - currentTension,
        turn_created: turn_number,
      });
    }

    const events = [];
    if (response.crisis) {
      events.push({
        type: 'crisis',
        title: 'CRISI',
        description: `Tensione critica con ${nation_b}!`,
        severity: 'critical',
      });
    } else if (response.phase_change) {
      events.push({
        type: 'system',
        title: `Fase Guerra Fredda Cambiata`,
        description: `Nuova fase: ${newPhase}`,
        severity: 'neutral',
      });
    }

    return new Response(JSON.stringify({
      success: true,
      tension: newTension,
      phase: newPhase,
      response,
      events,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});