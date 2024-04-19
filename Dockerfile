# 빌드 스테이지
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 앱 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 앱 소스코드 복사
COPY . .

# 앱 빌드
RUN npm run build