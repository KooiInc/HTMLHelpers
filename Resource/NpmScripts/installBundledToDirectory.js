import fs from "node:fs";

if (process.argv.length < 3) {
  console.log(`Please supply a directory to install to`);
  process.exit(1);
}

const directory2InstallTo = process.argv[2];

const directoryExists = fs.existsSync(directory2InstallTo);

if (!directoryExists) {
  console.log(`It seems that [${directory2InstallTo}] does not exist.` +
     ` Create it first please` );
  process.exit(1);
}

const files = {
  "htmlhelpers.min.js": fs.readFileSync(`./Bundle/htmlhelpers.min.js`),
  "htmlhelpers.script.min.js": fs.readFileSync(`./Bundle/htmlhelpers.script.min.js`),
};

Object.entries(files).forEach( ([fileName, file]) => {
  fs.writeFileSync(`${directory2InstallTo}/${fileName}`, file);
  console.log(`File ${fileName} written to ${directory2InstallTo}`);
});

process.exit(0);
