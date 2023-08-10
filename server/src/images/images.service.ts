import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UploadedImage } from 'src/interfaces/uploadedImage';

@Injectable()
export class ImagesService {
  async createFile(file: UploadedImage): Promise<string> {
    try {
      const format = file.originalname.split('.').at(-1);
      const fileName = `image-${uuid.v4()}.${format}`;

      fs.writeFileSync(
        path.join(process.cwd(), '/static', fileName),
        (file as any).buffer,
      );
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error occured while downloading the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
