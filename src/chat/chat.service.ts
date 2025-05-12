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
    createChatDto.members = createChatDto.members.map((member) => {
      return {
        userName: member,
      };
    });
    return this.chatModel.create(createChatDto);
  }

  async getUserChats(userName: string): Promise<GetChatDTO[]> {
    let chats = [];
    await this.chatModel
      .aggregate([
        { $match: { members: { $elemMatch: { userName: userName } } } },
        {
          $addFields: {
            name: {
              $cond: {
                if: { $eq: ['$type', 'Private'] },
                then: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: '$members',
                            as: 'member',
                            cond: { $ne: ['$$member.userName', userName] },
                          },
                        },
                        as: 'filteredMember',
                        in: '$$filteredMember.userName',
                      },
                    },
                    0,
                  ],
                },
                else: '$name',
              },
            },
          },
        },
      ])
      .exec()
      .then((result) => {
        chats = result;
      });
    return chats;
  }
}
