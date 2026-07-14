FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/
RUN npm ci

COPY server/ ./server/
RUN rm -rf server/node_modules server/dist

RUN npx prisma generate --schema=server/prisma/schema.prisma
RUN npm run build -w server
RUN cp -r server/src/generated/ server/dist/

EXPOSE 4000
CMD ["node", "server/dist/index.js"]
