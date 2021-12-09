FROM nginx:1.21.4-alpine

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app

COPY package.json ./

RUN apk add --update nodejs npm curl nano

RUN npm install .

COPY ./ ./

CMD ["/bin/sh"]
