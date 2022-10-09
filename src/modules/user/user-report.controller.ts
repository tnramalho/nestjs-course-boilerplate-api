import {
  Controller,
  Get,
  UseInterceptors,
  Inject,
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Roles } from '../role/decorator/roles.decorator';
import { RoleEnum } from '../role/enum/role.enum';
import { USER_REPORT_CACHE_KEY } from './constant/user.constants';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user-report')
@ApiBearerAuth()
//@UseGuards(RolesGuard)
//@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.Admin)
export class UserReportController {
  constructor(
    private readonly usersService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(USER_REPORT_CACHE_KEY)
  @CacheTTL(300)
  @Get()
  async report() {
    return await this.usersService.findAll();
  }

  @Get('report_2')
  async report_() {
    const users = await this.cacheManager.get(USER_REPORT_CACHE_KEY);
    return users;
  }
}
