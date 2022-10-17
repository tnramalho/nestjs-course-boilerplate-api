import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  CACHE_MANAGER,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { IsUUIDParam } from '../../common/decorators/is-strong-password';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorator/roles.decorator';
import { RoleEnum } from '../role/enum/role.enum';
import { USER_REPORT_CACHE_KEY } from './constant/user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
//@UseGuards(RolesGuard)
//@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.Admin)
export class UserController {
  constructor(
    private readonly usersService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private async updateReportCache() {
    this.cacheManager.set(USER_REPORT_CACHE_KEY, await this.findAll());
  }

  @Post()
  @ApiOperation({
    operationId: 'user_create',
    description: 'Endpoint to create a new user',
  })
  @ApiOkResponse({
    description: 'Success user created',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    this.updateReportCache();
    return user;
  }

  @Get()
  @ApiOperation({
    operationId: 'user_findAll',
    description: 'Endpoint to find all',
  })
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
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
    return await this.usersService.findOne(id);
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
    const user = await this.usersService.update(id, updateUserDto);
    this.updateReportCache();
    return user;
  }

  @ApiOperation({
    operationId: 'user_delete',
    description: 'Endpoint to delete all',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    this.updateReportCache();
  }
}
