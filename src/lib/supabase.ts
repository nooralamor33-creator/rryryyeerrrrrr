import { createClient } from '@supabase/supabase-js'

// Note: env var names are swapped in the secrets configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_URL as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
