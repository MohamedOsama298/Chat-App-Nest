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
        let updatedAt;
        if (messages.length > 0) {
          updatedAt = messages ? messages[messages.length - 1].createdAt : null;
        } else {
          updatedAt = chat.updatedAt;
        }
        return {
          chatID: chat._id,
          name: chat.name,
          type: chat.type,
          members: chat.members,
          updatedAt: updatedAt,
          messages,
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
}
