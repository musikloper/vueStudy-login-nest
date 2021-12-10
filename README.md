# Nest 기본 프로젝트

## 시작하기
### 1 프로젝트 받기
```
git clone 'url'
```

### 2 필요모듈 설치
```
npm i
```

## ormconfig.json 
typeorm 마이그레이션 설정 파일
### username, password, database 설정 해줘야한다

## ecosystem.config.js 
pm2 배포 설정 파일

## /config
설정 파일 폴더

## configuration.ts 
데이터 베이스 연결설정 파일

## default.res.dto.ts 
response default파일 모든 response DTO는 이 파일을 상속받아 만든다.

## mylogger.ts 
로깅 파일

## /common/
모듈 공통함수나 미들웨어 인터셉터를 넣는 곳

## .env 
처음에 만들어줘야 한다
