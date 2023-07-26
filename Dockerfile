FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json /app

RUN npm ci --omit=dev

RUN npx basetag link --hook

RUN npx basetag rebase

COPY . .

ARG variable=default_value

ARG port=3000

ENV ENVIREMENT_VARIABLE $variable

ENV PORT $port

EXPOSE $PORT

CMD ["npm", "run", "cluster"]