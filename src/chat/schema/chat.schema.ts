import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ enum: ['Group', 'Private'], default: 'Private' })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        userName: {
          type: mongoose.Schema.Types.String,
          ref: 'User',
          required: true,
        },
        lastSeen: { type: Date, default: null },
      },
    ],
    required: true,
  })
  members: { user: mongoose.Schema.Types.ObjectId; lastSeen: Date }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
