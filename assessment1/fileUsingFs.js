const fsPromises = require('fs').promises;

(async function writeFile() {
    try {
        await fsPromises.writeFile("./newFile.txt", "This is assignment for creating file")
        console.log("File written successfully");
    } catch (err) {
        console.error(err);
    }
})();
