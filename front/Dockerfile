FROM node:lts-alpine3.13
#front
WORKDIR /
COPY build /build
RUN npm install -g -y serve
RUN npm run build
EXPOSE 3000
RUN echo "serve -s build -l tcp://0.0.0.0:3000" > start.sh
CMD ["sh", "start.sh"]
