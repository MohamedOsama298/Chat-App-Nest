import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ enum: ['Group', 'Private'], default: 'Private' })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [mongoose.Schema.Types.String], ref: 'User' })
  members: string[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
