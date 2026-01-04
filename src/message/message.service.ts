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

  async getMessagesPerChat(
    chatId: string,
    pageNum: number = 1,
    pageSize: number = 10,
  ): Promise<{ data: Message[]; totalPages: number }> {
    const totalRecords = await this.messageModel.countDocuments({
      chat: chatId,
    });

    const totalPages = Math.ceil(totalRecords / pageSize);
    const data = await this.messageModel
      .find({ chat: chatId }, { chat: 0, __v: 0, updatedAt: 0 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .populate('sender', 'userName -_id')
      .exec();

    return { data, totalPages };
  }

  async addMessage(
    message: string,
    id: string,
    chatID: string,
    imageUrl?: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      body: message,
      sender: id,
      imageUrl,
      chat: chatID,
    });
    return newMessage.save();
  }

  getChatLastMessage(chatID: string) {
    return this.messageModel
      .findOne({ chat: chatID }, { chat: 0, __v: 0, updatedAt: 0 })
      .sort({ createdAt: -1 })
      .populate('sender', 'userName -_id')
      .exec();
  }
}
