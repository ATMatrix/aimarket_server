FROM node:8

LABEL maintainer "tyzhou"

RUN mkdir -p /aimarket_server

WORKDIR /aimarket_server

COPY . /aimarket_server

RUN npm install && npm install forever -g && npm run build

EXPOSE 4000

ENV NODE_ENV production
# CMD node production/server.js
CMD ["forever",  "production/server.js"]