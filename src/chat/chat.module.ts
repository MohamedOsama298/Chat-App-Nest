import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatSchema } from './schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from 'src/message/message.module';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MessageModule,
  ],
  exports: [ChatService],
})
export class ChatModule {}
