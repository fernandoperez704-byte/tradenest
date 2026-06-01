const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(process.cwd(), "public");

function convertImages(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) return convertImages(fullPath);

    if (file.toLowerCase().endsWith(".png") && stat.size > 300 * 1024) {
      const outputPath = fullPath.replace(/\.png$/i, ".webp");

      sharp(fullPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath)
        .then(() => console.log(`Converted: ${outputPath}`))
        .catch(console.error);
    }
  });
}

convertImages(publicDir);