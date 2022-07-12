const webpack = require('webpack')
const { spawn } = require('child_process')
const electron = require('electron')
const path = require('path')
const config = require('../config/webpack.main.config')

const ROOT = path.resolve(__dirname, '../')
const now = () => `[${new Date().toLocaleString()}]`

/** @type import('child_process').ChildProcess  */
let electronProcess

const compiler = webpack({
  // [Configuration Object](/configuration/)
  ...config,
  mode: 'development',
})

const watching = compiler.watch(
  {
    // Example [watchOptions](/configuration/watch/#watchoptions)
    aggregateTimeout: 3000,
    poll: undefined,
  },
  (err, stats) => {
    // [Stats Object](#stats-object)
    // Print watch/build result here...
    if (err || stats.hasErrors()) {
      console.error('Error', err)
    } else {
      console.log(now(), stats.toJson('summary'))
      startElectron()
    }
  }
)

function startElectron () {
  console.log(now(), 'start electron')
  if (electronProcess != null) {
    // windows 上，不支持 signal 参数
    electronProcess.kill()
    // electronProcess = null
  }
  electronProcess = spawn(electron, [path.join(ROOT, 'dist/main.js')])
  // electronProcess.stdout.on('data', (data) => {
  //   logger.info(data.toString(), defaultLogOptions)
  // })
  electronProcess.stderr.on('data', (data) => {
    console.log(data.toString())
  })
  electronProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    watching.close()
  })
}
