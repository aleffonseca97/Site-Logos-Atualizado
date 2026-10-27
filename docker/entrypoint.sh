#!/bin/sh
set -eu

mkdir -p /data /app/public/uploads

db_path="${DATABASE_URL#file:}"

if [ ! -f "$db_path" ] && [ -f /opt/seed/logos.db ]; then
  echo "Restaurando banco cadastrado..."
  cp /opt/seed/logos.db "$db_path"
fi

if [ -d /opt/seed/uploads ] && [ -z "$(ls -A /app/public/uploads 2>/dev/null || true)" ]; then
  echo "Restaurando uploads..."
  cp -a /opt/seed/uploads/. /app/public/uploads/
fi

if [ ! -f "$db_path" ]; then
  echo "Banco novo: criando tabelas e usuário admin..."
  node /opt/prisma-cli/node_modules/prisma/build/index.js db push --skip-generate
  node --experimental-strip-types prisma/seed.ts
else
  echo "Sincronizando schema..."
  node /opt/prisma-cli/node_modules/prisma/build/index.js db push --skip-generate
fi

exec node server.js
