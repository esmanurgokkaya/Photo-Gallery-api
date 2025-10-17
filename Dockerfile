# Use official Node LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies (only package.json and package-lock.json first for better caching)
COPY package*.json ./

# Install build deps and production deps
RUN npm ci --only=production || npm install --only=production

# Install netcat for the wait-for script
RUN apk add --no-cache netcat-openbsd

# Copy app source

COPY . .

# Ensure Prisma client is generated (if using Prisma)

# Ensure wait-for script is executable and generate Prisma client if present
RUN chmod +x ./scripts/wait-for.sh || true
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Expose port (adjust if your app uses a different port)
EXPOSE 3000

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Default command: wait for DB then start the server
CMD ["sh", "-c", "./scripts/wait-for.sh $DB_HOST:$DB_PORT -- npm start"]
