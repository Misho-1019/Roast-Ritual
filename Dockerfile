FROM node:22-slim
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/
RUN npm ci

COPY server/ ./server/
RUN rm -rf server/node_modules server/dist

RUN npx prisma generate --schema=server/prisma/schema.prisma
RUN npm run build -w server
RUN cp -r server/src/generated server/dist/

# Pre-download the Xenova embedding model so cold starts are instant
RUN node -e "const m=async()=>{const{pipeline}=require('@xenova/transformers');await pipeline('feature-extraction','Xenova/all-MiniLM-L6-v2')};m()"

EXPOSE 4000
CMD ["node", "server/dist/index.js"]
