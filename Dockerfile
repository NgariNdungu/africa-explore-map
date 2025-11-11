# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for reproducible builds
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production, as preview serves the build output
RUN npm run build

# Expose the port on which the Vite preview server will run
EXPOSE 4173

# Command to run the application preview
# The '--' ensures flags are passed to the vite command
# '--host' makes the server accessible outside the container
CMD ["npm", "run", "preview", "--", "--host"]
