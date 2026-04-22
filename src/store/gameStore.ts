import { create } from 'zustand';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { 
  Nation, 
  GameTurn, 
  Relation, 
  GameEventDB, 
  ActionQueueItem,
  TurnResult,
  Economy,
  Consensus,
  Faction,
  TechTree
} from '../types';

const PA_LIMIT = 3;

interface GameStore {
  supabase: SupabaseClient | null;
  currentNationId: string | null;
  currentTurn: GameTurn | null;
  nations: Nation[];
  relations: Relation[];
  events: GameEventDB[];
  actionQueue: ActionQueueItem[];
  isLoading: boolean;
  error: string | null;
  paRemaining: number;
  pendingActions: Array<{ action_type: string; target?: string; params?: Record<string, unknown> }>;
  designDirection: 'A' | 'B' | 'C';

  initSupabase: (url: string, anonKey: string) => void;
  setCurrentNation: (nationId: string) => Promise<void>;
  loadLatestTurn: () => Promise<void>;
  loadNations: () => Promise<void>;
  loadRelations: () => Promise<void>;
  loadEvents: () => Promise<void>;
  loadActionQueue: () => Promise<void>;
  setDesignDirection: (dir: 'A' | 'B' | 'C') => void;

  addAction: (action: { action_type: string; target?: string; params?: Record<string, unknown> }) => boolean;
  removeAction: (index: number) => void;
  clearActions: () => void;

  resolveTurn: () => Promise<TurnResult | { success: false; error: string }>;

  checkWinLose: (turn: GameTurn) => 'win' | 'lose' | null;

  getEconomy: () => Economy | null;
  getConsensus: () => Consensus | null;
  getFactions: () => Faction[] | null;
  getTech: () => TechTree | null;
}

export const useGameStore = create<GameStore>((set, get) => ({
  supabase: null,
  currentNationId: null,
  currentTurn: null,
  nations: [],
  relations: [],
  events: [],
  actionQueue: [],
  isLoading: false,
  error: null,
  paRemaining: PA_LIMIT,
  designDirection: (typeof window !== 'undefined' && window.localStorage.getItem('designDirection') ? (window.localStorage.getItem('designDirection') as 'A'|'B'|'C') : 'A'),
  // Add a setter to update the design direction globally
  setDesignDirection: (dir: 'A' | 'B' | 'C') => {
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem('designDirection', dir); } catch {}
    }
    set({ designDirection: dir });
  },
  pendingActions: [],

  initSupabase: (url: string, anonKey: string) => {
    const supabase = createClient(url, anonKey, {
      auth: {
        persistSession: false,
      },
    });
    set({ supabase });
  },

  setCurrentNation: async (nationId: string) => {
    set({ currentNationId: nationId, isLoading: true, error: null });
    
    try {
      await get().loadLatestTurn();
      await get().loadNations();
      await get().loadRelations();
      await get().loadEvents();
      
      const pendingActions = get().pendingActions;
      const currentTurn = get().currentTurn;
      const paRemaining = currentTurn 
        ? Math.max(0, PA_LIMIT - pendingActions.length)
        : PA_LIMIT;
      
      set({ paRemaining, isLoading: false });
    } catch (err) {
      set({ 
        isLoading: false, 
        error: err instanceof Error ? err.message : 'Failed to load nation data' 
      });
    }
  },

  loadLatestTurn: async () => {
    const { supabase, currentNationId } = get();
    if (!supabase || !currentNationId) return;

    const { data, error } = await supabase
      .from('game_turns')
      .select('*')
      .eq('nation_id', currentNationId)
      .order('turn_number', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        set({ currentTurn: null, paRemaining: PA_LIMIT });
        return;
      }
      throw error;
    }

    set({ currentTurn: data, paRemaining: data.pa_remaining });
  },

  loadNations: async () => {
    const { supabase } = get();
    if (!supabase) return;

    const { data, error } = await supabase
      .from('nations')
      .select('*')
      .order('name');

    if (error) throw error;
    set({ nations: data || [] });
  },

  loadRelations: async () => {
    const { supabase, currentNationId } = get();
    if (!supabase || !currentNationId) return;

    const { data, error } = await supabase
      .from('relations')
      .select('*')
      .or(`nation_a.eq.${currentNationId},nation_b.eq.${currentNationId}`);

    if (error) throw error;
    set({ relations: data || [] });
  },

  loadEvents: async () => {
    const { supabase, currentNationId } = get();
    if (!supabase || !currentNationId) return;

    const { data, error } = await supabase
      .from('game_events')
      .select('*')
      .eq('nation_id', currentNationId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    set({ events: data || [] });
  },

  loadActionQueue: async () => {
    const { supabase, currentNationId, currentTurn } = get();
    if (!supabase || !currentNationId || !currentTurn) return;

    const { data, error } = await supabase
      .from('action_queue')
      .select('*')
      .eq('nation_id', currentNationId)
      .eq('turn_id', currentTurn.turn_id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    set({ actionQueue: data || [] });
  },

  addAction: (action) => {
    const { pendingActions, paRemaining } = get();
    
    if (pendingActions.length >= PA_LIMIT) {
      set({ error: 'PA limit reached' });
      return false;
    }

    set({ 
      pendingActions: [...pendingActions, action],
      paRemaining: paRemaining - 1,
      error: null,
    });
    return true;
  },

  removeAction: (index: number) => {
    const { pendingActions, paRemaining } = get();
    const newActions = [...pendingActions];
    newActions.splice(index, 1);
    
    set({ 
      pendingActions: newActions,
      paRemaining: paRemaining + 1,
    });
  },

  clearActions: () => {
    set({ 
      pendingActions: [],
      paRemaining: PA_LIMIT,
    });
  },

  resolveTurn: async () => {
    const { supabase, currentNationId, pendingActions } = get();
    
    if (!supabase || !currentNationId) {
      return { success: false, error: 'Not initialized' };
    }

    if (pendingActions.length === 0) {
      return { success: false, error: 'No actions to resolve' };
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resolve-turn`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            nation_id: currentNationId,
            actions: pendingActions,
          }),
        }
      );

      const result: TurnResult = await response.json();

      if (!result.success) {
        set({ isLoading: false, error: result.error || 'Failed to resolve turn' });
        return result;
      }

      await get().loadLatestTurn();
      await get().loadEvents();
      await get().loadActionQueue();
      
      set({ 
        isLoading: false, 
        pendingActions: [],
        paRemaining: PA_LIMIT,
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  checkWinLose: (turn: GameTurn) => {
    const consensus = turn.consensus?.general || 0;
    const debtGdp = turn.economy?.debt_gdp || 0;
    const turnNumber = turn.turn_number;

    if (consensus >= 80 && turnNumber >= 5) return 'win';
    if (debtGdp > 200 || consensus < 20) return 'lose';
    
    return null;
  },

  getEconomy: () => {
    return get().currentTurn?.economy || null;
  },

  getConsensus: () => {
    return get().currentTurn?.consensus || null;
  },

  getFactions: () => {
    return get().currentTurn?.factions || null;
  },

  getTech: () => {
    return get().currentTurn?.tech || null;
  },
}));

export default useGameStore;
