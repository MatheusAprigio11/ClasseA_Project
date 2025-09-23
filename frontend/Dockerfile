FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g expo-cli && npm install

COPY . .

EXPOSE 19000 19001 19002 8081

CMD ["npx", "expo", "start", "--web", "--clear"]
