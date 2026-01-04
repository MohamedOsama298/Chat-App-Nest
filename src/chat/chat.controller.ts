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
    if (req.user.userName) {
      req.body.members.push(req.user.userName);
    }
    this.chatService.create(req.body);
  }

  @Get('/user')
  async getUserChats(@Req() req) {
    const chats = await this.chatService.getUserChats(req.user.userName);

    const chatsPopulated = await Promise.all(
      chats.map(async (chat) => {
        const message = await this.messagesService.getChatLastMessage(chat._id);
        const updatedAt = message ? message.createdAt : chat.updatedAt;
        return {
          chatID: chat._id,
          name: chat.name,
          type: chat.type,
          members: chat.members,
          updatedAt: updatedAt,
          lastMessage: message,
        };
      }),
    );
    chatsPopulated.sort((a, b) =>
      Math.ceil(
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    );
    return chatsPopulated;
  }

  @Post('/group')
  createGroupChat(@Req() req) {
    this.chatService.create(req.body);
  }
}
