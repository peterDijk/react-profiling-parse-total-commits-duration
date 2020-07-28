import * as fs from 'fs';
import * as path from 'path';

export default (file: string) =>
  new Promise<string>((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, `../../${file}`), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
