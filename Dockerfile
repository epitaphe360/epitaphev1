# Epitaphe - Production Dockerfile
# Single service: Node.js backend + static frontend serving

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better Docker caching)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy ALL source code needed for build
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY drizzle.config.ts ./

# Copy source directories
COPY client ./client
COPY cms-dashboard ./cms-dashboard
COPY server ./server
COPY shared ./shared
COPY script ./script

# Build the application (creates dist/index.cjs + dist/public/)
RUN npm run build

# ============================================
# Production stage - minimal image
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy migrations if needed
COPY migrations ./migrations

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start command
CMD ["node", "dist/index.cjs"]
