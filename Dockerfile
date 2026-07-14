FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/
RUN npm ci

COPY server/prisma/ ./server/prisma/
RUN npx prisma generate --schema=server/prisma/schema.prisma

COPY server/tsconfig.json ./server/
COPY server/src/ ./server/src/
RUN npm run build -w server
RUN cp -r server/src/generated/prisma server/dist/generated/

EXPOSE 4000
CMD ["node", "server/dist/index.js"]
