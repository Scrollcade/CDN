const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.startsWith('.')) continue; // ignore hidden
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const rootDir = __dirname;
const imgDir = path.join(rootDir, 'img', 'assets', 'characters');
const audioDir = path.join(rootDir, 'audio', 'Impact');

const imgFiles = fs.existsSync(imgDir) ? getFiles(imgDir).map(f => {
    return {
        type: 'file',
        name: path.basename(f),
        download_url: 'https://cdn.jsdelivr.net/gh/Scrollcade/CDN@main/' + path.relative(rootDir, f)
    };
}) : [];

const audioFiles = fs.existsSync(audioDir) ? getFiles(audioDir).map(f => {
    return {
        type: 'file',
        name: path.basename(f),
        download_url: 'https://cdn.jsdelivr.net/gh/Scrollcade/CDN@main/' + path.relative(rootDir, f)
    };
}) : [];

const indexData = {
    images: imgFiles,
    audio: audioFiles
};

fs.writeFileSync(path.join(rootDir, 'assets.json'), JSON.stringify(indexData, null, 2));
console.log('assets.json generated successfully!');
