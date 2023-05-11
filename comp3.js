import glob from 'glob';
import sharp from 'sharp';
import fs from 'fs';

const newDir = 'TEST';
const maxWidth = 1200;

if (fs.existsSync('./' + newDir)) {
  fs.rmSync('./' + newDir, { recursive: true, force: true });
}
fs.mkdirSync('./' + newDir);

sharp.cache(false);
glob('**/*', function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for (let i = 0; i < res.length; i++) {
      if (res[i].startsWith('node_modules') || res[i].startsWith(newDir)) {
        continue;
      }
      if (
        res[i].toLowerCase().endsWith('.jpeg') ||
        res[i].toLowerCase().endsWith('.jpg') ||
        res[i].toLowerCase().endsWith('.png')
      ) {
        try {
          sharp(res[i])
            .resize({ width: 1200, withoutEnlargement: true })
            .jpeg({
              quality: 60
            })
            .png({
              compressionLevel: 7,
              quality: 60
            })
            .toFile('./' + newDir + '/' + res[i])
            .then((res) => {
              console.log('960 Done!', res);
            })
            .catch((err) => {
              console.error('960 Error processing files', err);
            });
        } catch (error) {
          console.log('960 error', error);
        }
      } else if (fs.lstatSync(res[i]).isDirectory()) {
        fs.mkdirSync('./' + newDir + '/' + res[i]);
      }
    }
  }
});
