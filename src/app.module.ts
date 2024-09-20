import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';

// NestJS 는 여러개의 모듈로 구성되며, 각 모듈은 기본적으로 컨트롤러와 서비스를 요소로 갖는다
// app.module 은 AppController와 AppService를 가져야 한다.

// 모듈단위 요소들이 분리된 이후 필요한 모듈은 imports 에 배열로 추가하여 사용하는 것이 좋다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
