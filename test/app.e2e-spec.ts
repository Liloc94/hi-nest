import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });
  // e2e 테스트는 말 그대로 처음부터 끝까지, Service 와 Controller,
  // 그리고 양식검증을 위한 ValidationPipe 까지 한번에 테스트하는 것을 의미한다
  // 그러기 위해서는 main.ts 에 설정한 ValidationPipe 를 test파일에서도 동일하게 적용시켜야 한다.
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'], other: 'thing' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
      // 항상 실제 애플리케이션과 같은 설정을 테스트 애플리케이션에 적용시켜야 한다.
      // 실제 구동환경과 테스트 구동환경의 설정이 같아야 원하는 테스트 결과가 도출된다.
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Movie', year: 2020, genres: ['Updated genre'] })
        .expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/999')
        .send({ title: 'potato' })
        .expect(404);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/999').expect(404);
    });
  });
});
