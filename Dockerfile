FROM nginx:1.19.6-alpine
RUN \
  echo '{"status":"UP"}' > /opt/liveness.txt && \
  echo '{"status":"UP"}' > /opt/readiness.txt && \
  mkdir -p /data/logs/nginx

ENV TZ "Asia/Shanghai"
ARG BASE_VERSION
COPY ./src/main/nginx/nginx.conf /etc/nginx/
COPY ./src/main/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./dist-${BASE_VERSION}/index.html /opt

ENTRYPOINT ["nginx", "-g", "daemon off;"]
