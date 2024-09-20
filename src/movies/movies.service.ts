import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);
    const movie = this.movies.find((movie) => movie.id === id);
    // + 연산자를 붙이면 parsInt로 인식하여 형변환이 일어난다.
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found.`);
    }

    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1, // 인덱스가 1부터 넘버링 되도록 +1 로 설정
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
