FROM node:14
WORKDIR /node-mysql
COPY package.json .
RUN npm install
COPY . .
CMD npm start