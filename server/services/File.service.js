/* Сервис для различных операций с файловой системой */
import fs from 'fs';


export default class FileService {
  /* Получение списка файлов в папке и ее подпапках */
  static getFiles(dir) {
    const result = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = `${dir}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        result.push(...FileService.getFiles(filePath));
      } else {
        result.push(filePath);
      }
    });
    return result;

  }
}
