import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  private readonly messages: Message[] = [];

  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }
}
