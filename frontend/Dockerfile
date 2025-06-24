# Stage 1: Build the Angular app
FROM node:20 AS build

# Set the working directory
WORKDIR /app/superng

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod


# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

WORKDIR /app/superng

# Copy the built Angular app from the previous stage
COPY --from=build /app/superng/dist/frontend/browser/ /app/superng/

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

