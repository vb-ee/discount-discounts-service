import fs from 'fs';

export class ImageUtil {
  public static renameImage(oldPath: string, newPath: string) {
    fs.rename(oldPath, `${newPath}`, (err) => {
      console.log(err);
    });
  }

  public static removeImage(imagePath: string) {
    fs.unlink(imagePath, (err) => console.log(err));
  }
}
