FROM node:latest
COPY . /backend
WORKDIR /backend
RUN npm install
RUN npm install -g prisma
RUN npx prisma migrate dev --name init
EXPOSE 3000
CMD ["npm", "start"]
