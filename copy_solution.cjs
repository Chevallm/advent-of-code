const fs = require('fs');

const sourcePath = 'src/2024';
const destinationPath = 'public/2024';

fs.rm(destinationPath, {recursive: true}, (err) => {
    if (err) throw err;
    fs.cp(sourcePath, destinationPath, {recursive: true, force: true}, (err) => {
        console.error(err?.message);
    });
})
