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

@Module({
  imports: [UserModule, MessageModule, ConfigModule.forRoot(), EventsModule],
  controllers: [AppController, MessageController, UserController],
  providers: [AppService, EventsGateway, MessageService, UserService],
})
export class AppModule {}
