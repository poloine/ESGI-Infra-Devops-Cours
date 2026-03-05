FROM node:22-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --include=dev

COPY src src
COPY tsconfig.json tsconfig.json
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]