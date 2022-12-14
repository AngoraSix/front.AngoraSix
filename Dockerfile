# Dockerfile
FROM node:14-slim as builder
WORKDIR /opt/hoc-web
COPY . .
ARG BUILD
ENV A6_APP_BUILD $BUILD
RUN npm install --production
RUN npm run build
EXPOSE 80
ENTRYPOINT [ "npm", "run", "start:prod" ]
CMD [ ]