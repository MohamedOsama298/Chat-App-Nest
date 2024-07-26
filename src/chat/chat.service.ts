import { Injectable } from '@nestjs/common';
import { CreateChatDTO } from './DTO/createChat.dto';
import { Chat } from './schema/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  create(createChatDto: CreateChatDTO): Promise<Chat> {
    return this.chatModel.create(createChatDto);
  }

  getUserChats(userName: string): Promise<Chat[]> {
    return this.chatModel.find({ members: { $elemMatch: { $eq: userName } } });
  }
}
