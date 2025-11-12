FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./
COPY tsconfig*.json ./

# Install all dependencies including devDependencies
RUN npm ci
COPY src ./src

# Compile TypeScript -> JavaScript
RUN npm run build  # "build": "tsc"


# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]