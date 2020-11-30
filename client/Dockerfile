FROM dndapp-shared

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]