import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('')
  getMessages(@Query() qr): Promise<Message[]> {
    return this.messageService.getMessagesPerChat(qr.chatID);
  }

  @Post()
  addMessage(@Req() req, @Body() body): void {
    this.messageService.addMessage(body.message, req.user._id, body.chatID);
  }
}
