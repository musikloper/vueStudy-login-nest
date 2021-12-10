import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from 'src/config/mylogger';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private readonly logger = new MyLogger(UserService.name)

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.userRepository = userRepository
  }

  async registerUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {

    try {
      const checkid = await this.checkUserid(createUserDto.id)

      if (checkid.result === 2) {
        this.logger.log('해당 유저가 이미 가입되었습니다')
        return checkid
      } else if (checkid.result === 1) {
        const insert = await getRepository(User)
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(createUserDto)
          .execute()
        
        this.logger.log(insert)

        const user = await getRepository(User)
          .createQueryBuilder('user')
          .where('id = :id', { id: insert.raw.insertId })
          .getOne()
        
        return { data: user, result: 1, resultMsg: '유저 등록 성공'}

      }
    } catch (err) {
      this.logger.error(err)
      throw new Error('유저 등록 실패')
    }
  }

  /**
   * id 사용여부 체크
   * @param id 
   * @returns UserResponseDto
   */
  async checkUserid(id: string): Promise<UserResponseDto> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where("id = :id", { id: id })
      .getOne()
    
    if (!user) {
      return { data: user, result: 1, resultMsg: '사용 가능한 아이디 입니다'}
    } else {
      return { data: user, result: 2, resultMsg: '이미 사용중인 아이디 입니다'}
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
