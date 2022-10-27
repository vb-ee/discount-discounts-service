import { rename, unlink } from 'fs';

export class ImageUtil {
  public static renameImage(oldPath: string, newPath: string) {
    rename(oldPath, `${newPath}`, (err) => {
      console.log(err);
    });
  }

  public static removeImage(imagePath: string) {
    unlink(imagePath, (err) => console.log(err));
  }
}
