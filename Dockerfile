FROM nginx:1.21.4-alpine

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app

COPY package.json ./

RUN apk add --update nodejs npm

RUN npm install .

COPY ./ ./

CMD ["node", "main.js"]
