FROM node:latest
COPY . /front
WORKDIR /front
RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 8080