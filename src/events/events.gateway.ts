import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection {
  @SubscribeMessage('connection')
  handleMessage(client: any, payload: any): string {
    console.log(client, payload);
    return 'Hello world!';
  }

  @WebSocketServer() io: Server;
  handleConnection() {}
}
