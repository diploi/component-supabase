/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-import-prefix no-explicit-any

/**
 * This is the Supabase Edge Functions entrypoint.
 *
 * It bootstraps the Edge Runtime and routes incoming HTTP requests
 * to the appropriate function inside the /functions directory.
 *
 * It is required when running Edge Functions in a self-hosted setup,
 * but does not contain application business logic.
 *
 * You normally do not need to modify this file.
 *
 * @see https://github.com/supabase/supabase/blob/master/docker/volumes/functions/main/index.ts
 */

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js@2.94.1/edge-runtime.d.ts';

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts';

console.log('main function started');

const JWT_SECRET = Deno.env.get('JWT_SECRET');
const VERIFY_JWT = Deno.env.get('VERIFY_JWT') === 'true';

function getAuthToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    throw new Error('Missing authorization header');
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    throw new Error(`Auth header is not 'Bearer {token}'`);
  }
  return token;
}

async function verifyJWT(jwt: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);
  try {
    await jose.jwtVerify(jwt, secretKey);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

serve(async (req: Request) => {
  if (req.method !== 'OPTIONS' && VERIFY_JWT) {
    try {
      const token = getAuthToken(req);
      const isValidJWT = await verifyJWT(token);

      if (!isValidJWT) {
        return new Response(JSON.stringify({ msg: 'Invalid JWT' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (e: any) {
      console.error(e);
      return new Response(JSON.stringify({ msg: e.toString() }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const url = new URL(req.url);
  const { pathname } = url;
  const path_parts = pathname.split('/');
  const service_name = path_parts[1];

  if (!service_name || service_name === '') {
    const error = { msg: 'missing function name in request' };
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const servicePath = `/home/deno/functions/${service_name}`;
  console.error(`serving the request with ${servicePath}`);

  const memoryLimitMb = 150;
  const workerTimeoutMs = 1 * 60 * 1000;
  const noModuleCache = false;
  const importMapPath = null;
  const envVarsObj = Deno.env.toObject();
  const envVars = Object.keys(envVarsObj).map((k) => [k, envVarsObj[k]]);

  try {
    const worker = await EdgeRuntime.userWorkers.create({
      servicePath,
      memoryLimitMb,
      workerTimeoutMs,
      noModuleCache,
      // @ts-expect-error Supabase edge runtime supports importMapPath
      importMapPath,
      envVars,
    });
    return await worker.fetch(req);
  } catch (e: any) {
    const error = { msg: e.toString() };
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
