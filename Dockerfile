FROM node:8

LABEL maintainer "tyzhou"

RUN mkdir -p /aimarket_server
WORKDIR /aimarket_server

COPY production /aimarket_server/production
COPY src /aimarket_server/src
COPY config /aimarket_server/config
COPY package.json /aimarket_server/package.json
COPY sql /aimarket_server/sql


RUN cd /aimarket_server && npm install && npm install forever -g 

EXPOSE 4000

# CMD node production/server.js
CMD ["forever",  "production/server.js"]
# CMD ["node"]