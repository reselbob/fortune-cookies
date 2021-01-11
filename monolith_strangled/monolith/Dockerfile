FROM node:10.16.2-alpine

WORKDIR /app
COPY . /app
RUN npm install --only-production
EXPOSE 3000
CMD ["node", "server.js"]
