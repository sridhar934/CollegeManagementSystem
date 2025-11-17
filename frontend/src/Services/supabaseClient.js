import { createClient } from '@supabase/supabase-js';

// 🔹 Replace these with your Supabase project details
const SUPABASE_URL = 'https://icnfvdmnicbmkopvbgpn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljbmZ2ZG1uaWNibWtvcHZiZ3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTg0MDIsImV4cCI6MjA3ODQzNDQwMn0.AfgQf98y7iTYqHCVf69HfJbL3I4w7QFOvnrgQ80EEG0';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
