# Frontend Dockerfile - Multi-stage build for Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# Install dependencies
RUN npm ci

# Copy source code
COPY client ./client
COPY cms-dashboard ./cms-dashboard
COPY shared ./shared

# Build the client
RUN npm run build

# Production stage - serve with a simple HTTP server
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install serve to serve static files
RUN npm install -g serve

# Copy built client from builder
COPY --from=builder /app/dist/public ./build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
