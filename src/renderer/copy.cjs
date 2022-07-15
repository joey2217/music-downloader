const path = require('path')
const fs = require('fs-extra')

const ROOT = path.resolve(__dirname, '../../')

const renderer = path.join(ROOT, 'dist/renderer')
fs.removeSync(renderer)
fs.moveSync('./dist', renderer)
