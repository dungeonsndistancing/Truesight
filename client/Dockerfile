FROM registry.jvdt.dev:5001/jordyjordy/dndapp-shared as build-stage

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine as production-stage

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/client/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]