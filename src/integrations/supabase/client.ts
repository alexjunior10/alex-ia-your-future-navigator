import { createClient } from "@supabase/supabase-js";

// Public Supabase project credentials (anon key — safe for client-side use).
// import.meta.env.VITE_* is inlined at build time for client bundles,
// but NOT for SSR bundles on Vercel. Provide hardcoded fallbacks so the
// Supabase client works in both environments.
const SUPABASE_URL = "https://lufkhjzhvacpjavjvurg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZmtoanpodmFjcGphdmp2dXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjQ2NTEsImV4cCI6MjA5Nzg0MDY1MX0.raJ-oqekYsgAtZ-DKKJt8w8QFhDLfpnfrFW7qFQlUoo";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
