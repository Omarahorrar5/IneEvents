#to run the container: docker container run -d -p 5000:5000 --env-file .env ineserver
#because .env is ignored and doesnt exist in image filesystem

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
