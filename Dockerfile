# Use an official Node runtime as the base image
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Use NGINX as the web server to serve the React app
FROM nginx:alpine

# Copy the built React app from the builder stage into the NGINX web server
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX when the container launches
CMD ["nginx", "-g", "daemon off;"]
