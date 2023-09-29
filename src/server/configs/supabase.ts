import { createClient } from '@supabase/supabase-js';
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient';
import env from '../../../env-config.js';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_API_KEY environment variables are required.'
  );
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseApiKey
);
