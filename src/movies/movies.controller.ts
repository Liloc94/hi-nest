import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // 의존성 주입 : 위에서 타입지정을 하는 것만으로
  // NestJS를 통해 모듈파일 내의 서비스와 컨트롤러 간에 자동으로 이루어진다

  @Get()
  getAll(): Movie[] {
    // @Req() req, @Res() res --> NestJS 에서 Express를 사용하는 방식
    // NestJS는 Fastify 라이브러리 사용을 권장하고 있고, 실제로 Express 보다 2배가량 빠른 처리속도를 갖고 있다.
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number) {
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
  // @Put --> 모든 리소스를 업데이트
  @Patch('/:id') // --> 특정 리소스만을 업데이트
  path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
