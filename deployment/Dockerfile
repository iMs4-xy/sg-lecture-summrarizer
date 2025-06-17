# Use Singapore timezone as base
FROM node:18-slim
ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

# Install Python and FFmpeg for video processing
RUN apt-get update && apt-get install -y ffmpeg python3

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend files
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all files
COPY . .

# Install Python dependencies
RUN pip3 install google-cloud-speech openai

# Expose ports
EXPOSE 5000
EXPOSE 3000

# Start application
CMD ["sh", "-c", "cd backend && node server.js & cd ../frontend && npm start"]
