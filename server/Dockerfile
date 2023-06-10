FROM ubuntu:20.04

RUN apt update

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN mkdir server
COPY . server
WORKDIR server

RUN npm i
RUN npm run build
RUN npm i -g pm2
RUN pm2 start

EXPOSE 3100
CMD ["pm2", "start"]
