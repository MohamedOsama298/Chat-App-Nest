import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  getMessages(@Req() req): Promise<Message[]> {
    return this.messageService.getMessages(req.user._id);
  }

  @Post()
  addMessage(@Req() req, @Body() body): void {
    this.messageService.addMessage(body.message, req.user._id);
  }
}
