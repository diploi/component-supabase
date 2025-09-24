<img alt="icon" src=".diploi/icon.svg" width="32">

# Supabase Component for Diploi

[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/component/supabase)
[![component on diploi badge](https://diploi.com/component.svg)](https://diploi.com/component/supabase)
[![latest tag badge](https://badgen.net/github/tag/diploi/component-supabase)](https://diploi.com/component/supabase)

Run [Supabase](https://supabase.com/) on Diploi.

Based on the official [supabase/docker](https://github.com/supabase/supabase/tree/master/docker) `docker-compose.yml` file.

## Operation

A full Supabase implementation.

### Limitations

We know of a few limitations that currently exist with Supabase on Diploi. We are actively working on fixes.
- Connection URI's dislayed on Supabase Studio are wrong, please use the ones on Diploi Console
- Logs view on Supabase Studio is empty, please use the logging functionality built-in to Diploi

### Authentication

Self-hosted Supabase comes with a simple basic auth implementation by default. Diploi implements custom authentication for the admin panel, making it easier to use.
You can authenticate with a single-click from Diploi Console, or use username & password to login.

You can find the admin credentials from a deployments "Options" tab in the Diploi Console.

### Development

You can develop custom functions with [Deno](https://deno.com/).
We will create a `/functions` directory for you with a preconfigured `main` function and an example `hello` function.

## Links

- [Supabase documentation](https://supabase.com/docs)
- [Self-Hosting Supabase with Docker](https://supabase.com/docs/guides/self-hosting/docker)
- [Generate Supabase API keys](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys)
