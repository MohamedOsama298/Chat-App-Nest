import { Controller, Get, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  createChat(@Req() req) {
    this.chatService.create(req.body);
  }

  @Get('/user')
  getUserChats(@Req() req) {
    return this.chatService.getUserChats(req.user.userName);
  }
}
