# Backend Dockerfile - Multi-stage build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from parent directory
COPY ../package*.json ./
COPY ../tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code from parent directory
COPY ../server ./server
COPY ../shared ./shared
COPY ../script ./script
COPY ../drizzle.config.ts ./

# Build the server
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Set Node environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files from parent directory
COPY ../package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the server only
CMD ["node", "dist/index.cjs"]
