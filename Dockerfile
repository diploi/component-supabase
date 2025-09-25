# This Dockerfile will build the "functions" image for Supabase with the /functions folder code baked in

FROM supabase/edge-runtime:v1.67.4

# This will be set by the GitHub action to the folder containing this component
ARG FOLDER=/app

# Copy the /functions folder over to the correct location
COPY . /app
RUN mkdir -p /home/deno/functions
RUN cp --verbose -R ${FOLDER}/functions /home/deno
RUN chown -R 1000:1000 /home/deno
RUN rm -rf /app