import { Controller, Get, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageService } from 'src/message/message.service';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private messagesService: MessageService,
  ) {}

  @Post()
  createChat(@Req() req) {
    this.chatService.create(req.body);
  }

  @Get('/user')
  async getUserChats(@Req() req) {
    const chats = await this.chatService.getUserChats(req.user.userName);
    const chatsPopulated = await Promise.all(
      chats.map(async (chat) => {
        const messages = await this.messagesService.getMessagesPerChat(
          chat._id,
        );
        return {
          chatID: chat._id,
          messages,
        };
      }),
    );
    return chatsPopulated;
  }
}
