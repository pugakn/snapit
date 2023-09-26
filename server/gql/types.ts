import { SupabaseClient, User } from "https://esm.sh/@supabase/supabase-js@2.33.2";

export type Context = {
    supabaseClient: SupabaseClient<any, "public", any>
    supabaseClientAdmin: SupabaseClient<any, "public", any>
    supabaseUser: User | null
}