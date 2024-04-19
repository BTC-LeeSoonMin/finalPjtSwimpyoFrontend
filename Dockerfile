# 빌드 스테이지
FROM node:alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# 앱 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 앱 빌드
RUN npm run build