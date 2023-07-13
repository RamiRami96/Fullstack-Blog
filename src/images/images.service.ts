import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class ImagesService {
  async createFile(file: string): Promise<string> {
    try {
      const fileName = 'image-' + uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), (file as any).buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error occured while downloading the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
