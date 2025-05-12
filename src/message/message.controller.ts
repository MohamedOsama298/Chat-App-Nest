import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('messages')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('')
  getMessages(@Query() qr): Promise<Message[]> {
    return this.messageService.getMessagesPerChat(qr.chatID);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addMessage(
    @Req() req,
    @Body() body,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg)',
        })
        .addMaxSizeValidator({ maxSize: 60000 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
  ): Promise<Message> {
    console.log(image);
    let imageurl;
    if (image) imageurl = await this.cloudinaryService.uploadFile(image);
    if (imageurl)
      return this.messageService.addMessage(
        body.message,
        req.user._id,
        body.chatID,
        imageurl.url,
      );
    else
      return this.messageService.addMessage(
        body.message,
        req.user._id,
        body.chatID,
      );
  }
}
