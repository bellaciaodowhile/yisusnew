import { useEffect } from 'react';
import { supabase } from './supabaseClient';

export function useKeepAlive(tableName = 'clients') {
  useEffect(() => {
    const pingSupabase = async () => {
      try {
        await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
      } catch (err) {
        // Falla silenciosa para no interrumpir la experiencia del usuario
      }
    };

    pingSupabase();

    const interval = setInterval(pingSupabase, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tableName]);
}