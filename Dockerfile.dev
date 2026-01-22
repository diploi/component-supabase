# This Dockerfile will build the "functions" image for Supabase with the /functions folder code baked in

FROM supabase/edge-runtime:v1.67.4

# This will be set by the GitHub action to the folder containing this component
ARG FOLDER=/app

# Install Supabase CLI
ARG SUPABASE_CLI_VERSION=2.72.7
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates curl \
 && curl -fLO https://github.com/supabase/cli/releases/download/v${SUPABASE_CLI_VERSION}/supabase_${SUPABASE_CLI_VERSION}_linux_arm64.deb \
 && dpkg -i supabase_${SUPABASE_CLI_VERSION}_linux_arm64.deb \
 && rm supabase_${SUPABASE_CLI_VERSION}_linux_arm64.deb \
 && apt-get purge -y curl \
 && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/*

COPY . /app

# Copy the Supabase /functions, /migrations and seed.sql over to the correct locations
RUN mkdir -p /home/deno/functions /home/deno/supabase/migrations \
 && if [ -d "${FOLDER}/functions" ]; then cp --verbose -R "${FOLDER}/functions/." /home/deno/functions; fi \
 && if [ -d "${FOLDER}/migrations" ]; then cp --verbose -R "${FOLDER}/migrations/." /home/deno/supabase/migrations; fi \
 && if [ -f "${FOLDER}/seed.sql" ]; then cp --verbose "${FOLDER}/seed.sql" /home/deno/supabase/seed.sql; fi

RUN chown -R 1000:1000 /home/deno
RUN rm -rf /app