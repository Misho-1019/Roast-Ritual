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
RUN cp -r server/src/generated server/dist/

RUN node -e "
const fs = require('fs');
function ls(dir, i) {
  try { fs.readdirSync(dir).forEach(f => { console.log(i+f); var p=dir+'/'+f; if (fs.statSync(p).isDirectory()) ls(p,i+'  '); }); } catch(e) { console.log(i+'ERR:'+e.message); }
}
console.log('=== dist/ ===');
ls('server/dist','');
console.log('=== Prisma ===');
try { require('./server/dist/generated/prisma/index.js'); console.log('Prisma OK'); } catch(e) { console.log('Prisma ERR: '+e.message); }
console.log('=== Server entry ===');
try { require('./server/dist/index.js'); setTimeout(() => process.exit(0), 1000); } catch(e) { console.log('Server ERR: '+e.message); }
"

EXPOSE 4000
CMD ["node", "server/dist/index.js"]
