# Use an official Node runtime as a parent image
FROM node:20.2.0-alpine

# Set the working directory to /app
WORKDIR /wms-users-service

ENV NODE_ENV production
ENV COUNTER_COLLECTION Counter
ENV DB_NAME WMS
ENV DB_CONN_STRING mongodb://mongodb:27017
ENV USER_COLLECTION User
ENV JWT_SECRET secret_key
ENV PORT 4001

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 4001 for the application to run on
EXPOSE 4001

# Start the application
CMD ["node", "index.js"]
