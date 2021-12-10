import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    example: 'userid',
    description: '아이디'
  })
  @IsString()
  id: string

  @ApiProperty({
    example: '1234',
    description: '비밀번호'
  })
  @IsString()
  pwd: string

  @ApiProperty({
    example: '홍길동',
    description: '이름'
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'test@test.com',
    description: '이메일'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: '1990-01-01',
    description: '생년월일'
  })
  @IsDate()
  birthdate: Date

  @ApiProperty({
    example: '12345',
    description: '우편번호'
  })
  @IsString()
  zipcode: string

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '도로명 주소'
  })
  @IsString()
  road_address: string;

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '지번'
  })
  @IsString()
  old_address: string;

  @ApiProperty({
    example: '서울아파트 101동 101호',
    description: '상세주소'
  })
  @IsString()
  address_detail: string;
}
