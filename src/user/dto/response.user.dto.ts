import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DefaultResponseDto } from "src/config/default.res.dto";
import { User } from "../entities/user.entity";


export class UserResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: '유저'
  })
  data?: User
}

export class UsersResponseDto extends DefaultResponseDto {
  @ApiProperty({
    description: '유저들',
    type: 'array',
    isArray: true, 
    items: {
      $ref: getSchemaPath(User)
    }
  })
  data?: User[]
}