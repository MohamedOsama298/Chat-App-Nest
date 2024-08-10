import { Injectable } from '@nestjs/common';
import { CreateChatDTO } from './DTO/createChat.dto';
import { Chat } from './schema/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetChatDTO } from './DTO/getChatDTO';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  create(createChatDto: CreateChatDTO): Promise<Chat> {
    return this.chatModel.create(createChatDto);
  }

  async getUserChats(userName: string): Promise<GetChatDTO[]> {
    let chats = [];
    await this.chatModel
      .find({ members: { $elemMatch: { $eq: userName } } })
      .exec()
      .then((result) => {
        chats = result;
      });
    return chats;
  }
}
