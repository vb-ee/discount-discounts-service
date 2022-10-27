import { rename, unlink } from 'fs';

export class ImageUtil {
  renameImage(oldPath: string, newPath: string) {
    rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  }

  removeImage(imagePath: string) {
    unlink(`${process.env.PWD}/images/${imagePath}`, (err) => {
      if (err) throw err;
    });
  }
}
