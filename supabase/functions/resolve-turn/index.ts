import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const CONFIG_VERSION = 'v1';
const PA_LIMIT = 3;

const ResolveTurnRequest = z.object({
  nation_id: z.string().min(1),
  actions: z.array(z.object({
    action_type: z.string().min(1),
    target: z.string().optional(),
    params: z.record(z.unknown()).optional(),
  })).max(PA_LIMIT),
});

const ActionEffects: Record<string, { relationDelta?: number; consensusDelta?: number; cost?: number; risk?: number }> = {
  'trade_pact': { relationDelta: 5, cost: 0 },
  'non_aggression': { relationDelta: 8, cost: 0 },
  'economic_aid': { relationDelta: 10, consensusDelta: 2, cost: 50 },
  'sanctions': { relationDelta: -15, consensusDelta: -2 },
  'threat': { relationDelta: -10 },
  'state_visit': { relationDelta: 3 },
  'military_exercise': { relationDelta: -5, consensusDelta: 2 },
  'diplomatic_warning': { relationDelta: -5 },
  'media_campaign': { consensusDelta: 5 },
  'policy_reform': { consensusDelta: 3 },
  'budget_increase': { consensusDelta: 2, cost: 30 },
  'budget_cut': { consensusDelta: -3, cost: -20 },
  'technology_investment': { consensusDelta: 1 },
  'space_program': { consensusDelta: 3, cost: 100 },
  'military_ buildup': { consensusDelta: 2, cost: 80 },
  'treaty_join': { relationDelta: 10 },
  'treaty_leave': { relationDelta: -20 },
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function seededRandom(seed: string, min: number, max: number): number {
  const seedNum = hashString(seed);
  const rng = mulberry32(seedNum);
  return min + rng() * (max - min);
}

function calculateSeed(nationId: string, turnNumber: number, configVersion: string = CONFIG_VERSION): string {
  const input = `${nationId}-${turnNumber}-${configVersion}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16).padStart(16, '0');
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function calcMacro(prevEconomy: Record<string, unknown>, actions: Array<{ action_type: string; params?: Record<string, unknown> }>, seed: string) {
  const gdp = (prevEconomy.gdp as number) || 1000;
  const growth = (prevEconomy.growth as number) || 2.5;
  const inflation = (prevEconomy.inflation as number) || 2.0;
  const debt = (prevEconomy.debt as number) || 0;
  const reserves = (prevEconomy.reserves as number) || 100;

  let totalSpending = 0;
  let inflationPressure = 0;
  let sectorInvest = 0;

  for (const action of actions) {
    const effect = ActionEffects[action.action_type];
    if (effect?.cost) totalSpending += effect.cost;
    if (action.action_type.includes('budget') || action.action_type.includes('spending')) {
      inflationPressure += seededRandom(`${seed}-${action.action_type}`, 0.1, 0.5);
    }
    if (action.action_type.includes('investment') || action.action_type.includes('program')) {
      sectorInvest += seededRandom(`${seed}-${action.action_type}`, 0.5, 2.0);
    }
  }

  const taxRev = gdp * 0.4 * (1 - inflation / 100);
  const interest = debt * 0.03;
  const newDebt = Math.max(0, debt + (totalSpending - taxRev - interest));
  const debtGDP = newDebt / gdp;
  
  let newGrowth = growth + sectorInvest * 0.1;
  if (debtGDP > 1.5) newGrowth -= 0.8;
  if (debtGDP > 1.8) newGrowth -= 0.5;

  const newInflation = clamp(inflation + inflationPressure - (sectorInvest * 0.1), 0.5, 12);
  const newReserves = Math.max(0, reserves + taxRev - totalSpending - interest);

  return {
    gdp: Math.round(gdp * (1 + newGrowth / 100)),
    growth: clamp(newGrowth, -5, 15),
    inflation: Math.round(newInflation * 100) / 100,
    debt: Math.round(newDebt),
    debt_gdp: Math.round(debtGDP * 100) / 100,
    unemployment: clamp((prevEconomy.unemployment as number) || 5 + (newGrowth < 0 ? 0.5 : -0.2), 2, 25),
    budget_balance: Math.round((taxRev - totalSpending - interest) / gdp * 10000) / 100,
    reserves: Math.round(newReserves),
  };
}

function updateRelation(
  currentRelation: number,
  actionType: string,
  targetPersonality: string,
  seed: string
): number {
  const effect = ActionEffects[actionType] || {};
  let delta = effect.relationDelta || 0;
  
  if (targetPersonality === 'Aggressive') delta -= 2;
  else if (targetPersonality === 'Diplomatic') delta += 2;

  if (actionType === 'none') {
    delta = seededRandom(seed, -2, 0);
  }

  return clamp(currentRelation + delta, -100, 100);
}

function updateConsensus(
  prevConsensus: Record<string, unknown>,
  actions: Array<{ action_type: string; params?: Record<string, unknown> }>,
  seed: string
): Record<string, number> {
  const general = (prevConsensus.general as number) || 50;
  const economic = (prevConsensus.economic as number) || 50;
  const security = (prevConsensus.security as number) || 50;
  const freedom = (prevConsensus.freedom as number) || 50;

  let generalDelta = 0;
  let economicDelta = 0;
  let securityDelta = 0;
  let freedomDelta = 0;

  for (const action of actions) {
    const effect = ActionEffects[action.action_type];
    if (effect?.consensusDelta) {
      generalDelta += effect.consensusDelta;
      
      if (action.action_type.includes('budget') || action.action_type.includes('economy')) {
        economicDelta += effect.consensusDelta;
      } else if (action.action_type.includes('military') || action.action_type.includes('security')) {
        securityDelta += effect.consensusDelta;
      } else if (action.action_type.includes('reform') || action.action_type.includes('freedom')) {
        freedomDelta += effect.consensusDelta;
      }
    }
  }

  generalDelta += seededRandom(`${seed}-drift`, -1, 1);

  return {
    general: clamp(general + generalDelta, 0, 100),
    economic: clamp(economic + economicDelta, 0, 100),
    security: clamp(security + securityDelta, 0, 100),
    freedom: clamp(freedom + freedomDelta, 0, 100),
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const parsed = ResolveTurnRequest.parse(body);
    
    const { nation_id, actions } = parsed;

    const latestTurnRes = await supabase
      .from('game_turns')
      .select('*')
      .eq('nation_id', nation_id)
      .order('turn_number', { ascending: false })
      .limit(1)
      .single();

    let currentTurnNumber = 0;
    let currentPaRemaining = PA_LIMIT;
    let currentEconomy: Record<string, unknown> = {};
    let currentConsensus: Record<string, unknown> = {};
    let currentFactions: unknown[] = [];
    let currentTech: Record<string, unknown> = {};

    if (latestTurnRes.data) {
      currentTurnNumber = latestTurnRes.data.turn_number;
      currentPaRemaining = latestTurnRes.data.pa_remaining;
      currentEconomy = latestTurnRes.data.economy || {};
      currentConsensus = latestTurnRes.data.consensus || {};
      currentFactions = latestTurnRes.data.factions || [];
      currentTech = latestTurnRes.data.tech || {};
    }

    const pendingActionsRes = await supabase
      .from('action_queue')
      .select('id')
      .eq('nation_id', nation_id)
      .eq('status', 'pending');

    const pendingCount = pendingActionsRes.data?.length || 0;
    const paRemainingAfterPending = currentPaRemaining - pendingCount;

    if (actions.length > paRemainingAfterPending) {
      return new Response(JSON.stringify({
        success: false,
        error: `PA insufficient. Required: ${actions.length}, Available: ${paRemainingAfterPending}`,
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const newTurnNumber = currentTurnNumber + 1;
    const seed = calculateSeed(nation_id, newTurnNumber, CONFIG_VERSION);

    const newEconomy = calcMacro(currentEconomy as Record<string, unknown>, actions, seed) as Record<string, unknown>;
    const newConsensus = updateConsensus(currentConsensus as Record<string, unknown>, actions, seed);
    const updatedFactions = currentFactions.map((faction: unknown) => {
      const f = faction as Record<string, unknown>;
      const mobilization = (f.mobilization as number) || 50;
      const approval = (f.base_approval as number) || 50;
      return {
        ...f,
        mobilization: clamp(mobilization + seededRandom(`${seed}-${f.id}`, -5, 5), 0, 100),
        base_approval: clamp(approval + seededRandom(`${seed}-${f.id}-app`, -3, 3), 0, 100),
      };
    });

    const insertTurnRes = await supabase
      .from('game_turns')
      .insert({
        nation_id,
        turn_number: newTurnNumber,
        pa_remaining: PA_LIMIT,
        economy: newEconomy,
        consensus: newConsensus,
        factions: updatedFactions,
        tech: currentTech,
        rng_seed: seed,
      })
      .select()
      .single();

    if (insertTurnRes.error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create turn: ' + insertTurnRes.error.message,
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const newTurnId = insertTurnRes.data.turn_id;

    const updatePendingRes = await supabase
      .from('action_queue')
      .update({ status: 'applied', applied_at: new Date().toISOString() })
      .eq('nation_id', nation_id)
      .eq('turn_id', insertTurnRes.data.turn_id - 1 || currentTurnNumber)
      .eq('status', 'pending');

    if (actions.length > 0) {
      for (const action of actions) {
        await supabase.from('action_queue').insert({
          nation_id,
          turn_id: newTurnId,
          action_type: action.action_type,
          target: action.target,
          params: action.params || {},
          status: 'applied',
          applied_at: new Date().toISOString(),
        });
      }
    }

    const events: Array<{ type: string; title: string; description: string; severity: string }> = [];
    
    if (actions.length > 0) {
      events.push({
        type: 'system',
        title: `${actions.length} Azioni Eseguite`,
        description: `Turno ${newTurnNumber}: ${actions.map(a => a.action_type).join(', ')}`,
        severity: 'neutral',
      });
    }

    if (newEconomy.growth as number < 0) {
      events.push({
        type: 'economy',
        title: 'Recessione in Arrivo',
        description: `Crescita negativa: ${newEconomy.growth}%`,
        severity: 'negative',
      });
    } else if (newEconomy.growth as number > 5) {
      events.push({
        type: 'economy',
        title: 'Crescita Economica',
        description: `Crescita: ${newEconomy.growth}%`,
        severity: 'positive',
      });
    }

    if ((newEconomy.debt_gdp as number) > 150) {
      events.push({
        type: 'economy',
        title: 'Allerta Debito',
        description: `Debito/PIL: ${newEconomy.debt_gdp}% - Rischio recessione`,
        severity: 'critical',
      });
    }

    if (newConsensus.general < 25) {
      events.push({
        type: 'crisis',
        title: 'Crisi di Consenso',
        description: `Consenso generale: ${newConsensus.general}%`,
        severity: 'critical',
      });
    }

    const warnings: string[] = [];
    if ((newEconomy.debt_gdp as number) > 120) warnings.push('Debito elevato');
    if (newConsensus.general < 40) warnings.push('Consenso basso');

    let winLose: 'win' | 'lose' | undefined;
    if (newConsensus.general >= 80 && newTurnNumber >= 5) winLose = 'win';
    else if ((newEconomy.debt_gdp as number) > 200 || newConsensus.general < 20) winLose = 'lose';

    for (const event of events) {
      await supabase.from('game_events').insert({
        turn_id: newTurnId,
        nation_id,
        type: event.type,
        title: event.title,
        description: event.description,
        payload: { actions, economy: newEconomy, consensus: newConsensus },
        severity: event.severity,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      newTurn: {
        turn_id: newTurnId,
        nation_id,
        turn_number: newTurnNumber,
        pa_remaining: PA_LIMIT,
        economy: newEconomy,
        consensus: newConsensus,
        rng_seed: seed,
      },
      events,
      warnings,
      winLose,
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