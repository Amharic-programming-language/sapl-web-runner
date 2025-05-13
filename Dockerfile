FROM node:alpine3.21

# Install Wine (for running .exe)
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y wine64 wine32

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install deps
RUN npm install

# Make start.sh executable
RUN chmod +x ./start.sh

# Start script
CMD ["./start.sh"]