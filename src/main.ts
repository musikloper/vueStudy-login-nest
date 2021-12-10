import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { MyLogger } from './config/mylogger';

import * as fs from 'fs';

declare const module: any;

const logger = new Logger('INFO');
logger.log(`env: ${process.env.NODE_ENV}`);
logger.log(`port: ${process.env.PORT}`);

// https 설정
async function bootstrap() {
  // let httpsOptions = null;
  // if (fs.existsSync('/etc/letsencrypt/live/admin.mfast.co.kr/fullchain.pem')) {
  //   httpsOptions = {
  //     ca: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/fullchain.pem',
  //       'utf8',
  //     ),
  //     cert: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/cert.pem',
  //       'utf8',
  //     ),
  //     key: fs.readFileSync(
  //       '/etc/letsencrypt/live/admin.mfast.co.kr/privkey.pem',
  //       'utf8',
  //     ),
  //   };
  // }
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
    logger: new MyLogger(),
  });
  const PORT = Number(process.env.PORT) + Number(process.env.INSTANCE_ID);
  
  // Frontend Vue.js 설정 추가
  app.setGlobalPrefix('api')


  // 글로벌권한 가드
  // app.useGlobalGuards(new RolesGuard());

  // swagger 비밀번호 설정
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('application API') // 제목
    .setDescription('어플리케이션 API 문서 입니다.') // 설명
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  logger.log(`listening on port ${PORT}`);

  // hot reload 설정 추후 삭제
  if (module.hot) {
    // nest hot reload 설정
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
