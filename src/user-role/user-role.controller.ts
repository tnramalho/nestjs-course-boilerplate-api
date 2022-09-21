import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleDto } from './dto/user-role.dto';

import { UserRoleService } from './user-role.service';

@ApiTags('user-role')
@Controller('user-role')
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
  create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<UserRoleDto> {
    return this.userUserRolesService.create(createUserRoleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'userUserRole_findAll',
    description: 'Endpoint to find all',
  })
  findAll(): Promise<UserRoleDto[]> {
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
  findOne(@Param('id') id: string) {
    return this.userUserRolesService.findOne(id);
  }

  @ApiOperation({
    operationId: 'userUserRole_delete',
    description: 'Endpoint to delete all',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUserRolesService.remove(id);
  }
}
