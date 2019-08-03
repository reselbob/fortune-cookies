FROM node:8.9-alpine

WORKDIR /app
COPY . /app
RUN chmod +x /app/wait-for-it.sh
RUN apk add --no-cache bash
RUN npm install --only=production
EXPOSE 3000
CMD node index.js