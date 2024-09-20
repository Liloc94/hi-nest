import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // dto 내에 class-validator decorator와 함께 정의된 요소가 아닌 모든 요소를 사전에 차단한다
      forbidNonWhitelisted: true,
      // 화이트리스트에서 걸러진 요소에 관련한 error 를 throw 해주는 기능.
      transform: true,
      // 클라이언트측에서 받은 정보를 컨트롤러 내에서 지정한 타입으로 자동형변환을 실행하는 기능.
    }),
  );
  await app.listen(3000);
}
bootstrap();
