FROM node:14 AS builder

WORKDIR /angular-frontend
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx ng build --configuration production



FROM nginx:alpine

COPY --from=builder /angular-frontend/dist/angular-frontend /usr/share/nginx/html

EXPOSE 80
