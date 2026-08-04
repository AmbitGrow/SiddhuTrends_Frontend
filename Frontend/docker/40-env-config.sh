#!/bin/sh
set -eu

: "${VITE_API_URL:=/api}"
: "${VITE_RAZORPAY_KEY_ID:=}"

envsubst '${VITE_API_URL} ${VITE_RAZORPAY_KEY_ID}' \
  < /usr/share/nginx/html/env.template.js \
  > /usr/share/nginx/html/env.js
