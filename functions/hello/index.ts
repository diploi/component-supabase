// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// deno-lint-ignore-file no-import-prefix
import { serve } from 'https://deno.land/std@0.177.1/http/server.ts';

serve(async () => {
  return new Response(`"Hello from Edge Functions!"`, {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl '<Your Supabase component URL>/functions/v1/hello' \
//   --header 'Authorization: Bearer <anon/service_role API key>'
