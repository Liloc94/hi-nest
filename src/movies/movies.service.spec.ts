import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

// NestJS 는 기본적인 자바스크립트 테스트 라이브러리로 jest를 제공한다
// "test": "jest",

// "test:watch": "jest --watch",

// "test:cov": "jest --coverage"
//TODO : npm run test:cov 실행 시, test 결과값을 아래와 같이 표시해줌.
// -----------------------|---------|----------|---------|---------|-------------------
// File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// -----------------------|---------|----------|---------|---------|-------------------
// All files              |    6.84 |        0 |    5.88 |    4.91 |
//  src                   |       0 |      100 |       0 |       0 |
//   app.module.ts        |       0 |      100 |     100 |       0 | 1-14
//   main.ts              |       0 |      100 |       0 |       0 | 1-19
//  src/app               |       0 |      100 |       0 |       0 |
//   app.controller.ts    |       0 |      100 |       0 |       0 | 1-7
//  src/movies            |   11.11 |        0 |    6.66 |     8.1 |
//   movies.controller.ts |       0 |      100 |       0 |       0 | 1-52
//   movies.module.ts     |       0 |      100 |     100 |       0 | 1-9
//   movies.service.ts    |   27.77 |        0 |    12.5 |   21.42 | 11-39
//  src/movies/dto        |       0 |      100 |     100 |       0 |
//   create-movie.dto.ts  |       0 |      100 |     100 |       0 | 1-14
//   update-movie.dto.ts  |       0 |      100 |     100 |       0 | 1-4
//  src/movies/entities   |       0 |      100 |     100 |       0 |
//   Movie.entity.ts      |       0 |      100 |     100 |       0 | 1
// -----------------------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        3.819 s
// Ran all test suites.

// "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",

// "test:e2e": "jest --config ./test/jest-e2e.json"
// e2e(end to end) 테스트는 기본적으로 특정링크를 통해 다른 페이지로 리디렉트 되야하는 경우에 사용된다
// 전체 시스템을 모두 테스트 해준다.

// 유닛 테스트는 함수 단위로 자잘한 기능들을 테스트하는 것을 의미한다.

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // service 변수를 통해 MovieService 내의 함수에 접근할 수 있다.
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
      // MovieService의 함수 getAll의 반환값이 배열 형태임을 기대한다. -> 타입검증 테스트
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID: 999 not found.');
      }
    });

    describe('deleteOne', () => {
      it('should deletes a movie', () => {
        service.create({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        });
        const beforeDelete = service.getAll().length;
        service.deleteOne(1);
        const afterDelete = service.getAll().length;

        expect(afterDelete).toBeLessThan(beforeDelete);
        // 하나의 영화를 삭제했으므로 length 값이 작을 것을 기대한다는 의미이다.
      });

      it('should return a 404', () => {
        try {
          service.deleteOne(999);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      service.update(1, {
        title: 'Updated Test',
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
