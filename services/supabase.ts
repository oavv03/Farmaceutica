
import { createClient } from '@supabase/supabase-js';

// Estas variables deben estar en el entorno de Vercel/Local
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Nota para Multinacional: 
 * Toda comunicación con Supabase está cifrada vía TLS 1.3.
 * Se recomienda habilitar RLS (Row Level Security) en las tablas:
 * - profiles (user_id = auth.uid())
 * - medical_records (user_id = auth.uid())
 * - orders (user_id = auth.uid())
 */
