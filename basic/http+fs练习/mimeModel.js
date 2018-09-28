const fs = require('fs');

let data = fs.readFileSync('./mime.json')

module.exports = JSON.parse(data.toString());
