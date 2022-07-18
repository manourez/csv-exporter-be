import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './create-file.dto';
import { File } from './filtes.entity';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(File) private repository: Repository<File>) {}

  async createFile(file: Express.Multer.File) {
    const workBook: XLSX.WorkBook = XLSX.read(file.buffer, { type: 'buffer' });

    for (const sheetName of workBook.SheetNames) {
      const sheet: XLSX.WorkSheet = workBook.Sheets[sheetName];

      await this.proccessSheet(sheet);
    }

    return {
      statusCode: 201,
      message: 'le fichier a été créé avec succès !',
    };
  }

  async proccessSheet(sheet: XLSX.WorkSheet) {
    const jsonData: CreateFileDto[] = XLSX.utils.sheet_to_json(sheet);

    try {
      await this.repository.save(jsonData);
    } catch (e) {
      console.log(e);
    }
  }

  getFile() {
    return this.repository.find();
  }
}
