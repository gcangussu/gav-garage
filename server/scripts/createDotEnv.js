const fs = require('fs');
const path = require('path');

const dotEnvPath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(dotEnvPath)) {
  const exampleEnvPath = path.resolve(__dirname, '../.env.example');
  fs.createReadStream(exampleEnvPath).pipe(fs.createWriteStream(dotEnvPath));
}
