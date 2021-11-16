FROM ubuntu/nginx:latest
RUN apt update
RUN apt install python3-pip python3-dev build-essential -y
RUN apt-get update
RUN apt-get install systemd -y

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app

COPY requirements.txt ./

RUN pip3 install setuptools pip
RUN pip3 install -r  requirements.txt

COPY ./ ./

RUN chmod +x ./tunnel.sh

CMD ["./tunnel.sh"]
