import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class Message {
  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sender' })
  sender: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
