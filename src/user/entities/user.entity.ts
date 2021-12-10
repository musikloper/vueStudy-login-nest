import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('USER')
export class User {

  // id, pwd, name, email, birthdate, zipcode, address, address_detail
  @ApiProperty({
    example: 1,
    description: '일련 번호'
  })
  @PrimaryGeneratedColumn()
  seq: number;
  
  @ApiProperty({
    example: 'asdf',
    description: '아이디'
  })
  @Column('varchar', { length: 100 })
  id: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호'
  })
  @Column('varchar', { length: 100 })
  pwd: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름'
  })
  @Column('varchar', { length: 100 })
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    description: '이메일'
  })
  @Column('varchar', { length: 100 })
  email: string;

  @ApiProperty({
    example: '1990-01-01',
    description: '생년월일'
  })
  @Column('datetime')
  birthdate: Date;

  @ApiProperty({
    example: '12345',
    description: '우편번호'
  })
  @Column('varchar', { length: 10 })
  zipcode: string;

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '도로명 주소'
  })
  @Column('varchar', { length: 200 })
  road_address: string;

  @ApiProperty({
    example: '서울특별시 강남구',
    description: '지번'
  })
  @Column('varchar', { length: 200 })
  old_address: string;

  @ApiProperty({
    example: '서울아파트 101동 101호',
    description: '상세주소'
  })
  @Column('varchar', { length: 200 })
  address_detail: string;


}
