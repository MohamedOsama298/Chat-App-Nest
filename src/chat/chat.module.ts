import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema } from './schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from 'src/message/message.service';
import { Message, MessageSchema } from 'src/message/schema/message.schema';

@Module({
  providers: [ChatService, MessageService],
  controllers: [ChatController],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  exports: [ChatService],
})
export class ChatModule {}
