# This Dockerfile will build the "functions" image for Supabase with the /functions folder code baked in

FROM supabase/edge-runtime:v1.67.4

# This will be set by the GitHub action to the folder containing this component
ARG FOLDER=/app

# Copy the /functions folder over to the correct location
COPY . /app
RUN cp -R ${FOLDER}/functions /home/deno/functions