import { createClient } from "@supabase/supabase-js";



const supabaseUrl = "https://kduobtxxfskjgdawjgfi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdW9idHh4ZnNramdkYXdqZ2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDAxMzksImV4cCI6MjA3NzMxNjEzOX0.x4q1dTIlPuJIwRog8myaU-6P1my3lpvEvdg_sMRrkMo";

export const supabase = createClient(supabaseUrl, supabaseKey);
