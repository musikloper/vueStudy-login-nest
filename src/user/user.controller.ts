import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyLogger } from 'src/config/mylogger';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response.user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {

  private readonly logger = new MyLogger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(createUserDto)
    return this.userService.registerUser(createUserDto);
  }

  @ApiOperation({ summary: 'id 중복 체크'})
  @ApiCreatedResponse({ description: 'id 중복 체크' })
  @Get('/idcheck')
  idcheck(@Query('id') id: string): Promise<UserResponseDto> {
    return this.userService.checkUserid(id)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
