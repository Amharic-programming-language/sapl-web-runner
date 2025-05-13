FROM node:18


# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install deps
RUN npm install


RUN chmod +x /app/sapl


EXPOSE 5000

CMD ["node", "index.js"]
