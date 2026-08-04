FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine

USER root

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/frontend-security-headers.conf /etc/nginx/snippets/frontend-security-headers.conf
COPY docker/40-env-config.sh /docker-entrypoint.d/40-env-config.sh
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/40-env-config.sh \
  && mkdir -p /etc/nginx/snippets \
  && chown -R 101:0 /usr/share/nginx/html /etc/nginx/templates /etc/nginx/snippets /docker-entrypoint.d

USER 101

ENV API_PROXY_TARGET=http://backend:5000
ENV VITE_API_URL=/api
ENV VITE_RAZORPAY_KEY_ID=

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -q --spider http://127.0.0.1:8080/
