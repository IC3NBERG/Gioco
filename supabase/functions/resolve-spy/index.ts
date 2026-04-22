import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const SpyEffects: Record<string, { experience?: number; risk?: number; effect?: Record<string, number> }> = {
  reconnaissance: { experience: 10, risk: 0.2 },
  assassination: { experience: 25, risk: 0.5, effect: { elimination: 50 } },
  sabotage: { experience: 20, risk: 0.35, effect: { production: -20 } },
  theft: { experience: 15, risk: 0.25, effect: { technology: 15 } },
  kidnapping: { experience: 20, risk: 0.4, effect: { tech_advance: 20 } },
  coup: { experience: 30, risk: 0.5 },
  disinformation: { experience: 10, risk: 0.15, effect: { consensus: -10 } },
  propaganda: { experience: 10, risk: 0.1 },
  bribery: { experience: 15, risk: 0.3 },
  double_agent: { experience: 20, risk: 0.35 },
};

const CounterIntelligenceBonus: Record<string, number> = {
  usa: 0.35,
  regno_unito: 0.30,
  russia: 0.25,
  cina: 0.25,
  francia: 0.20,
  germania: 0.15,
  giappone: 0.15,
  italia: 0.10,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
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
    const { nation_id, operations } = body;

    if (!nation_id || !operations || !Array.isArray(operations)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing nation_id or operations',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = [];
    const newEvents = [];

    for (const op of operations) {
      const { type, target_nation, agent_id } = op;
      const effect = SpyEffects[type] || SpyEffects['reconnaissance'];
      
      const counterBonus = CounterIntelligenceBonus[target_nation] || 0.1;
      const adjustedRisk = clamp(effect.risk + counterBonus - 0.1, 0.05, 0.9);
      const success = Math.random() > adjustedRisk;

      if (success) {
        if (agent_id) {
          await supabase.from('spy_agents')
            .update({ 
              experience: (agent_id.experience || 0) + (effect.experience || 10),
              missions_completed: (agent_id.missions_completed || 0) + 1,
            })
            .eq('id', agent_id);
        }

        const operationId = crypto.randomUUID();
        await supabase.from('spy_operations').insert({
          id: operationId,
          source_nation: nation_id,
          target_nation,
          type,
          status: 'completed',
          progress: 100,
          risk: adjustedRisk,
          completed_at: Math.floor(Date.now() / 1000),
        });

        if (target_nation && effect.effect) {
          const securityLevel = await supabase.from('national_security')
            .select('level, counter_intelligence')
            .eq('nation_id', target_nation)
            .single();

          if (securityLevel.data) {
            const detectionChance = (securityLevel.data.counter_intelligence || 20) / 100;
            
            if (Math.random() < detectionChance) {
              await supabase.from('security_threats').insert({
                nation_id: target_nation,
                threat_type: 'spy',
                severity: 'medium',
                source_nation: nation_id,
                description: `Attività di spionaggio rilevata: ${type}`,
                detected_at: Math.floor(Date.now() / 1000),
              });
              
              newEvents.push({
                type: 'security',
                title: 'Spia Rilevata',
                description: `Attività di spionaggio da ${nation_id} rilevata`,
                severity: 'negative',
              });
            }
          }
        }

        results.push({
          operation: op,
          success: true,
          operation_id: operationId,
        });
      } else {
        await supabase.from('spy_operations').insert({
          id: crypto.randomUUID(),
          source_nation: nation_id,
          target_nation,
          type,
          status: 'failed',
          progress: Math.floor(Math.random() * 50),
          risk: adjustedRisk,
          completed_at: Math.floor(Date.now() / 1000),
        });

        if (agent_id) {
          await supabase.from('spy_agents')
            .update({ cover_blow: (agent_id.cover_blow || 0) + adjustedRisk })
            .eq('id', agent_id);
        }

        newEvents.push({
          type: 'security',
          title: 'Operazione Fallita',
          description: `Operazione di spionaggio fallita`,
          severity: 'negative',
        });

        results.push({
          operation: op,
          success: false,
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      results,
      events: newEvents,
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