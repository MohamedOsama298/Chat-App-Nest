import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, Message } from './schema/message.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    CloudinaryModule,
  ],
  exports: [MessageService],
})
export class MessageModule {}
