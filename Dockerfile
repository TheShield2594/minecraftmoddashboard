# ---- build stage ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV DB_PATH=/data/modpack-codex.db
# Pull patched Alpine packages (e.g. openssl/libssl3/libcrypto3) on top of the
# base image.
RUN apk upgrade --no-cache
COPY package.json package-lock.json ./
# Install prod deps, then drop the npm/corepack/yarn toolchain bundled in the
# base image: the app runs with plain `node`, and npm's vendored deps (tar,
# brace-expansion, ...) are a recurring source of scanner CVEs.
RUN npm ci --omit=dev \
 && npm cache clean --force \
 && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
      /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
      /opt/yarn* /usr/local/bin/yarn /usr/local/bin/yarnpkg /root/.npm
COPY server ./server
COPY --from=build /app/dist ./dist

VOLUME /data
EXPOSE 8080
CMD ["node", "server/index.js"]
