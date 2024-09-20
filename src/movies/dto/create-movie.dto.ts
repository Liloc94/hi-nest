import { IsNumber, IsOptional, IsString } from 'class-validator';
// class-validator, class-transformer 설치 필요
// npm i class-validator class-transformer

export class CreateMovieDto {
  @IsString() // 지정한 타입과 일치하는 decorator 사용
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
