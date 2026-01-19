# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the application
RUN npx vite build

# Stage 2: Production
FROM nginx:alpine AS production

# Replace entire nginx config (not just conf.d)
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default conf.d to avoid conflicts
RUN rm -rf /etc/nginx/conf.d/*

# Copy built assets from builder stage
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Expose port 80 only (HTTPS handled by reverse proxy)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
