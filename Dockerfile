# Stage 1: Build Angular Application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package*.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy application code
COPY . .

# Build Angular application
RUN npm run build

RUN apt-get update && \
    apt-get install -y firefox-esr xvfb libgtk2.0-0 libdbus-glib-1-2 libxtst6 libnss3

ENV \
    MOZ_HEADLESS=1 \
    FIREFOX_BINARY=/usr/bin/firefox  

RUN npm run test:headless

# Stage 2: Run Angular Tests with Firefox Headless
FROM node:18

# Set working directory
WORKDIR /app

# Copy built application from Stage 1
COPY --from=build /app/dist/angular-karma-project/browser/* .

# Build Angular application
RUN npm install serve -g

# Run Angular tests with Firefox headless
CMD ["serve", "-s", ".", "-p", "4200"]