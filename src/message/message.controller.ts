import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './interfaces/message.interface';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  getMessages(): Message[] {
    return this.messageService.getMessages();
  }

  @Post()
  addMessage(@Body() message: Message): void {
    this.messageService.addMessage(message);
  }
}
