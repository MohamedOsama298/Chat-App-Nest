import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema } from './schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  exports: [ChatService],
})
export class ChatModule {}
