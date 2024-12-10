import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './middleware/user.middleware';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    MessageModule,
    ConfigModule.forRoot(),
    EventsModule,
    MongooseModule.forRoot(process.env.MONGO_CONNETCTION_STRING, {
      dbName: 'ChatApp',
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes('messages', 'user', 'chat');
  }
}
