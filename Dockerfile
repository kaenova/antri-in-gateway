FROM golang:1.17.1-alpine3.13
RUN apk add py3-pip python3-dev
RUN apk add alpine-sdk
RUN apk add build-base

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
COPY requirements.txt ./

RUN go mod download
RUN pip install setuptools pip
RUN pip install -r  requirements.txt

COPY ./ ./

RUN go build -o ./appbin

CMD ["./appbin"]
