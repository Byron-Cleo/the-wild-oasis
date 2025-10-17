import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ssfcarevvonsugcegupz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZmNhcmV2dm9uc3VnY2VndXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjcxMjksImV4cCI6MjA3NjA0MzEyOX0.rIOxhrb2uWjOE6TyXsTLRlT_KyRt7Y35gMvdai1peuE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
