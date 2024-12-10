import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  private readonly messages: Message[] = [];

  getMessagesPerChat(chatId: string): Promise<Message[]> {
    return this.messageModel
      .find({ chat: chatId }, { chat: 0, __v: 0, updatedAt: 0 })
      .populate('sender', 'userName -_id')
      .exec();
  }

  async addMessage(
    message: string,
    id: string,
    chatID: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      body: message,
      sender: id,
      chat: chatID,
    });
    return newMessage.save();
  }
}
