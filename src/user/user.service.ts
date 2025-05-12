import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './DTO/createUser.dto';
import { Chat } from 'src/chat/schema/chat.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  getUser(userName: string): Promise<User> {
    return this.userModel.findOne({ userName: userName }).exec();
  }

  async searchUsers(
    searchQuery: string,
    requestSender: string,
  ): Promise<User[]> {
    let userFriends = [];
    await this.userModel
      .findOne({ userName: requestSender }, { _id: 0, friends: 1 })
      .then((doc) => {
        userFriends = doc.friends;
      });

    return this.userModel
      .find(
        {
          $and: [
            { userName: { $regex: searchQuery, $options: 'i' } },
            { userName: { $ne: requestSender } },
          ],
        },
        {
          userName: 1,
          isFriend: {
            $cond: {
              if: { $in: ['$userName', userFriends] },
              then: true,
              else: false,
            },
          },
        },
      )
      .exec();
  }

  async addFriend(friend: string, requestSender: string) {
    const session = await this.userModel.startSession();
    try {
      await session.withTransaction(async () => {
        const transact1 = await this.userModel.updateOne(
          { userName: requestSender },
          { $addToSet: { friends: friend } },
          { session },
        );
        const transact2 = await this.userModel.updateOne(
          { userName: friend },
          { $addToSet: { friends: requestSender } },
          { session },
        );
        await this.chatModel.create(
          [
            {
              type: 'Private',
              members: [{ userName: requestSender }, { userName: friend }],
              name: 'private',
            },
          ],
          { session },
        );

        if (!(transact1.modifiedCount || transact2.modifiedCount)) {
          throw new HttpException(
            'Seems like this user is already a friend',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Seems like this user is already a friend',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }

  async getUserFriends(userName: string): Promise<User[]> {
    return await this.userModel
      .find({ userName }, { _id: 0, friends: 1 })
      .exec();
  }
}
