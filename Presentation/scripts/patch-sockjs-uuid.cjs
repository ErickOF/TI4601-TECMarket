const fs = require('fs');
const path = require('path');

const transportPath = path.join(__dirname, '..', 'node_modules', 'sockjs', 'lib', 'transport.js');

if (!fs.existsSync(transportPath)) {
  process.exit(0);
}

const source = fs.readFileSync(transportPath, 'utf8');
const oldRequire = "uuidv4 = require('uuid').v4;";
const newRequire = "uuidv4 = require('crypto').randomUUID;";

if (source.includes(newRequire)) {
  process.exit(0);
}

if (!source.includes(oldRequire)) {
  console.warn('patch-sockjs-uuid: expected uuid require was not found; leaving SockJS unchanged.');
  process.exit(0);
}

fs.writeFileSync(transportPath, source.replace(oldRequire, newRequire));
