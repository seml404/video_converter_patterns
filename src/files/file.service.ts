import { isAbsolute, join, dirname } from "path";
import { promises } from "fs";
export class FileService {
  async fileExists(file_path: string) {
    try {
      await promises.stat(file_path);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  public getFiletPath(path: string, name: string, ext: string) {
    if (!isAbsolute(path)) {
      path = join(__dirname + "/" + path);
    }
    return join(dirname(path) + "/" + name + "." + ext);
  }

  async deleteExistingFile(path: string) {
    if (await this.fileExists(path)) {
      promises.unlink(path);
    }
  }
}
