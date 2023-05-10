import * as fs from 'fs';
import sharp from 'sharp';
import glob from 'glob';

// interface Compressio {

// }

// https://github.com/GoogleChromeLabs/squoosh for image optimization and compression
// https://github.com/lovell/sharp as a second option (for speed mostly)
// https://github.com/isaacs/node-glob for checking subfolders and files

async function getImageMetadata(item) {
  try {
    const metadata = await sharp(item).metadata();
    // console.log(metadata.width);
    return metadata.width;
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

// 1. Get all image files
const targetDir = './slides/';

glob(
  targetDir + '/**/*.{jpg,jpeg,png,gif}',
  { dot: true, matchBase: true },
  (err, files) => {
    if (err) {
      console.log('Error', err);
    } else {
      // console.log(files)
      const list = files.map((file) => {
        const meta = getImageMetadata(file);

        return meta;
      });

      console.log(list);

      // fs.appendFile('test.txt', list, function (err) {
      //   if (err) {
      //     // append failed
      //   } else {
      //     // done
      //   }
      // });
    }
  }
);

// 2. Rename them?
// 3. Resize if bigger than
// 4. Save with new name (original one)
// 5. Delete work files
