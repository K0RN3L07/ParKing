const fs = require("fs/promises");

async function fileExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

async function generateFile() {
    try {
        if (!fs.access(".env")){
            await fs.writeFile(".env",
                `DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_DIALECT=`);
            console.log("File generated!");
        }
        else{
            console.log("File already exists!");
        }
    } catch (err) {
        console.error(err);
    }
}

generateFile();