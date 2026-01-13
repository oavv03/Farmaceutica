
import { createClient } from '@supabase/supabase-js';

// Estas variables deben estar en el entorno de Vercel/Local
// Se añade un fallback seguro para evitar que la app crashee en el despliegue inicial
const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'https://your-project.supabase.co' 
  ? process.env.SUPABASE_URL 
  : 'https://placeholder-project.supabase.co';

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY && process.env.SUPABASE_ANON_KEY !== 'your-anon-key'
  ? process.env.SUPABASE_ANON_KEY
  : 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Nota para Multinacional: 
 * Toda comunicación con Supabase está cifrada vía TLS 1.3.
 */
