# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy source code
COPY . .

# Accept build argument with default value
ARG VITE_API_URL=/api
# Set as environment variable for Vite to pick up during build
ENV VITE_API_URL=${VITE_API_URL}

# Debug: Print the value (optional, remove in production)
RUN echo "Building with VITE_API_URL=${VITE_API_URL}"

# Build the application (Vite will embed VITE_API_URL)
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]