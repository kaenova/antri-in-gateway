FROM nginx:1.20.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN apk add py3-pip python3-dev
RUN apk add alpine-sdk
RUN apk add build-base

WORKDIR /app

COPY requirements.txt ./

RUN pip install setuptools pip
RUN pip install -r  requirements.txt

COPY ./ ./

CMD ["./run_tunnel.sh"]
