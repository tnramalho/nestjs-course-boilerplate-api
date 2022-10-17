import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { Roles } from '../role/decorator/roles.decorator';
import { RoleEnum } from '../role/enum/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleDto } from './dto/user-role.dto';

import { UserRoleService } from './user-role.service';

@ApiTags('user-role')
@Controller('user-role')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.Admin)
export class UserRoleController {
  constructor(private readonly userUserRolesService: UserRoleService) {}

  @Post()
  @ApiOperation({
    operationId: 'userUserRole_create',
    description: 'Endpoint to create a new userUserRole',
  })
  @ApiOkResponse({
    description: 'Success userUserRole created',
  })
  async create(
    @Body() createUserRoleDto: CreateUserRoleDto
  ): Promise<UserRoleDto> {
    return this.userUserRolesService.create(createUserRoleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'userUserRole_findAll',
    description: 'Endpoint to find all',
  })
  async findAll(): Promise<UserRoleDto[]> {
    return this.userUserRolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'userUserRole_findOne',
    description: 'Endpoint to create a new userUserRole',
  })
  @ApiOkResponse({
    description: 'Success userUserRole created',
  })
  @ApiNotFoundResponse({
    description: 'Was not able to find userUserRole',
  })
  async findOne(@Param('id') id: string) {
    return this.userUserRolesService.findOne(id);
  }

  @ApiOperation({
    operationId: 'userUserRole_delete',
    description: 'Endpoint to delete all',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userUserRolesService.remove(id);
  }
}
