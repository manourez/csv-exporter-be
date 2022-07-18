import { Express } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './create-file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.createFile(file);
  }

  @Get()
  getFile() {
    return this.fileService.getFile();
  }
}
