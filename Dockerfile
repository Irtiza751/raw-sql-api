FROM node:19-alpine
WORKDIR /src/app
COPY ["package.json", "package-lock.json*"]
RUN npm install
COPY . .
EXPOSE 5800
USER node
CMD ["npm", "run", "start:dev"]
