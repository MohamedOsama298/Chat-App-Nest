import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { MessageController } from './message/message.controller';
import { UserController } from './user/user.controller';
import { MessageService } from './message/message.service';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { Message, MessageSchema } from './message/schema/message.schema';
import { UserMiddleware } from './middleware/user.middleware';
import { ChatModule } from './chat/chat.module';
import { Chat, ChatSchema } from './chat/schema/chat.schema';
import { ChatController } from './chat/chat.controller';

@Module({
  imports: [
    UserModule,
    MessageModule,
    ConfigModule.forRoot(),
    EventsModule,
    MongooseModule.forRoot(
      'mongodb+srv://test:test@cluster0.dhueo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { dbName: 'ChatApp' },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    AuthModule,
    ChatModule,
  ],
  controllers: [
    AppController,
    MessageController,
    UserController,
    ChatController,
  ],
  providers: [AppService, EventsGateway, MessageService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes('messages', 'user','chat');
  }
}