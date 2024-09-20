import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
// npm i @nestjs/mapped-types ---> DTO의 타입변환과 사용을 위한 패키지 설치
