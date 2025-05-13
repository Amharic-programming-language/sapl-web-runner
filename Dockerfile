FROM node:16-buster

# Install Wine and dependencies
RUN apt-get update && apt-get install -y \
    wine64 \
    xvfb \
    fontconfig \
    winetricks \
    ttf-mscorefonts-installer \
    curl \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install npm dependencies
RUN npm install

# Make start.sh executable
RUN chmod +x ./start.sh

# Start script
CMD ["./start.sh"]
