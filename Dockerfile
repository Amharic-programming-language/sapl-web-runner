FROM node:18


# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install deps
RUN npm install

# Make start.sh executable
RUN chmod +x ./start.sh

EXPOSE 5000

CMD ["node", "index.js"]
