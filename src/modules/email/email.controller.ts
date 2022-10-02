import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({
    operationId: 'send_email',
    description: 'Endpoint to send a new email',
  })
  @Post()
  async sendEmail() {
    return this.emailService.sendTestEmail();
  }

  @ApiOperation({
    operationId: 'send_email_with_template',
    description: 'Endpoint send a test email',
  })
  @Post('template')
  async sendEmailTemplate(@Body() dto: EmailDto) {
    return this.emailService.sendEmailWithTemplate(dto.to, dto.firstName);
  }
}
