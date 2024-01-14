FROM node:20
FROM base AS deps

WORKDIR /projects/counterApp

COPY package*.json ./

FROM base AS builder
WORKDIR /projects/counterApp
COPY --from=deps /projects/counterApp/node_modules ./node_modules


# Install app dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose port 4200 for the development server
EXPOSE 4200

# Define the command to run your application
CMD ["ng", "serve"]


