FROM registry.jvdt.dev:5001/jordyjordy/dndapp-shared

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]