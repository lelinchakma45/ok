import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcifjjrzwphyocsywwpo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWZqanJ6d3BoeW9jc3l3d3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjQ4MDAsImV4cCI6MjAxNDUwMDgwMH0.Ck_cQSLI9ysJaHQz-vO-jBzJrY_Iy-Wd-AxQyM8-k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
