import fs from "node:fs";

if (process.argv.length < 3) {
  console.log(`Please supply a directory to install to`);
  process.exit(1);
}

const directory2InstallTo = maybeCreateDirectory(process.argv[2].trim());
const files = {
  "htmlhelpers.min.js": fs.readFileSync(`./Bundle/htmlhelpers.min.js`),
  "htmlhelpers.script.min.js": fs.readFileSync(`./Bundle/htmlhelpers.script.min.js`),
};
Object.entries(files).forEach( ([fileName, file]) => {
  fs.writeFileSync(`${directory2InstallTo}/${fileName}`, file);
  console.log(`File ${fileName} written to ${directory2InstallTo}`);
});

process.exit(0);

function maybeCreateDirectory(directory2InstallTo) {
  const directoryExists = fs.existsSync(directory2InstallTo);
  
  if (!directoryExists) {
    try {
      fs.mkdirSync(directory2InstallTo);
      return directory2InstallTo;
    } catch(err) {
      console.log(`Directory [${directory2InstallTo}] can not be created, probably invalid name.`);
      process.exit(1);
    }
  }
}
