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

  getMessages(userId: string): Promise<Message[]> {
    return this.messageModel.find({ sender: userId }).exec();
  }

  async addMessage(message: string, id: string): Promise<Message> {
    const createdUser = new this.messageModel({
      body: message,
      sender: id,
    });
    return createdUser.save();
  }
}
