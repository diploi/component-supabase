# Migrations

Diploi automatically created this migrations directory and the `seed.sql` file for you.
They work with the Supabase CLI to manage schema changes and database seeding in a repeatable way.

For guidance and best practices, see the [official Supabase docs on database migrations](https://supabase.com/docs/guides/deployment/database-migrations).

> [!IMPORTANT]  
> Migrations are run automatically in **staging** and **production** deployments.
> In **development**, use the Supabase CLI to create and run migrations.

## Development

Migrations and the `seed.sql` file apply automatically only when you create a new development deployment.
Use the Supabase CLI to apply any future migrations.

> [!IMPORTANT]  
> If your Supabase component is located in a folder named `supabase`, you can run CLI commands directly from the `/app` directory.
> Otherwise, navigate to the component's folder before running any CLI commands.

#### Add migrations using the Supabase CLI:

1. Open an SSH connection (or a terminal in your IDE) to the deployment
2. Navigate to your Supabase components folder (`cd supabase`)
3. Run `supabase migration new <migration name>`

#### Run migrations using the Supabase CLI:

1. Open the Diploi Dashboard and copy the "PostgreSQL Connection URI" for your Supabase component
2. Open an SSH connection (or a terminal in your IDE) to the deployment
3. Navigate to your Supabase components folder (`cd supabase`)
4. Run `supabase migration up --db-url "<the url you copied for postgres>"`

## Staging & Production

Migrations are run automatically on every update.
The `seed.sql` is only run when a new deployment is created.
