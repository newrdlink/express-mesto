const fsPromises = require('fs').promises

module.exports = (pathUrl) => {
  return fsPromises.readFile(pathUrl, { encoding: 'utf8' })
    .then(file => JSON.parse(file))
    .catch(error => console.error)
}