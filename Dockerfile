FROM node:buster

RUN apt update && apt upgrade -y
WORKDIR opt
COPY package.json gulpfile.js ./

RUN npm install -g npm && \
	npm install -g npm && \
	npm install -g n && \
	n stable && \
	npm install -g gulp-cli && \
	npm install

# gulp watches on 3000 for sbadmin2. need to use container IP on host: e.g. 172.0.0.1:3000 or similar
EXPOSE 3000