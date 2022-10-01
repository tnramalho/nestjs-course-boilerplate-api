import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { API_KEY_HEADER } from '../../common/constants';
import { IsUUIDParam } from '../../common/decorators/is-strong-password';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorator/roles.decorator';
import { RoleEnum } from '../role/enum/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.Admin)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({
    operationId: 'user_create',
    description: 'Endpoint to create a new user',
  })
  @ApiOkResponse({
    description: 'Success user created',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'user_findAll',
    description: 'Endpoint to find all',
  })
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'user_findOne',
    description: 'Endpoint to create a new user',
  })
  @ApiOkResponse({
    description: 'Success user created',
  })
  @ApiNotFoundResponse({
    description: 'Was not able to find user',
  })
  async findOne(
    @IsUUIDParam('id')
    id: string
  ) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    operationId: 'user_update',
    description: 'Endpoint to update user',
  })
  @Patch(':id')
  async update(
    @IsUUIDParam('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    operationId: 'user_delete',
    description: 'Endpoint to delete all',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
