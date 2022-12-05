import fs from 'fs';
import sharp from 'sharp';
import glob from 'glob';

const getDirRecursively = (dir) => {
    const getChildrenRecursively = (dir) => {
        // Get child directories under the dir.
        const readdir = fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isDirectory());

        if (readdir.length === 0) {
            // There're no directories under the dir.
            return dir;
        } else {
            // Get directories recursively. Require >=Node11
            return readdir
                .map((p) => getChildrenRecursively(`${dir}/${p.name}`))
                .flat();
        }
    };

    return [dir, ...getChildrenRecursively(dir)];
};

(async () => {
    const files = [];
    const sourceDirs = getDirRecursively('images');

    // TODO resize function somewhere
    // https://github.com/lovell/sharp/

    for (let inDir of sourceDirs) {
        // Make output path: demo/001 => dest/demo/001
        const destDir = 'COMPRESSED/' + inDir;
        const arrFiles = [];

        glob(`${inDir}/*.{jpg,png,JPG,PNG}`, function (er, files) {
            files.forEach((file) => {
                console.log('file ===> ' + file);

                let path = file.replace(/[\w\-]+\.\w+/, '');
                path = './TEST/' + path;

                console.log('PATH ===> ' + path);

                if (!fs.existsSync(path)) {
                    fs.mkdir(path, { recursive: true }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('New directory successfully created.');
                        }
                    });
                }

                try {
                    sharp(file)
                        .resize({ width: 1200, withoutEnlargement: true })
                        .jpeg({
                            quality: 60,
                        })
                        .png({
                            compressionLevel: 7,
                            quality: 60,
                        })
                        .toFile('./TEST/' + file)
                        .then((res) => {
                            console.log('960 Done!', res);
                        })
                        .catch((err) => {
                            console.error('960 Error processing files', err);
                        });
                } catch (error) {
                    console.log('960 error', error);
                }
            });

            if (files.length > 0) {
                arrFiles.push(files);
            }
        });
    }
})();
