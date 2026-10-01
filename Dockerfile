# Stage 1: Build the application
FROM node:24.15.0-alpine3.23 AS build

# Install pnpm and build dependencies
RUN npm install -g pnpm@10 && mkdir /app

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Create the final image
FROM node:24.15.0-alpine3.23 AS prod

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Create non-root user and app directory
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nuxt \
  && mkdir /app && chown nuxt:nodejs /app

# Set working directory
WORKDIR /app

# Copy ONLY the self-contained build output (no node_modules, no source)
COPY --from=build --chown=nuxt:nodejs /app/.output ./

USER nuxt

# Expose the application port
EXPOSE 3000

# Start the application directly with node (no pnpm needed)
CMD ["node", "server/index.mjs"]
