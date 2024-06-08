import { Module } from '@nestjs/common';
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
    AuthModule,
  ],
  controllers: [AppController, MessageController, UserController],
  providers: [AppService, EventsGateway, MessageService, UserService],
})
export class AppModule {}
