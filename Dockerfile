# Stage 1: Build
FROM node:22-alpine3.20 AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
    yarn cache clean

# Bundle app source
COPY . .
RUN yarn build

# Stage 2: Production
FROM node:22-alpine3.20

# Create app directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
