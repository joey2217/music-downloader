const webpack = require('webpack')
const { spawn, exec } = require('node:child_process')
const electron = require('electron')
const path = require('node:path')
const config = require('../config/webpack.main.config')
const preloadConfig = require('../config/webpack.preload.config')

const ROOT = path.resolve(__dirname, '../')
const now = () => `[${new Date().toLocaleString()}]`

/** @type import('child_process').ChildProcess  */
let electronProcess
/** @type import('webpack').Compiler  */
let watching

function startElectron () {
  console.log(now(), 'start electron')
  if (electronProcess != null) {
    // windows 上，不支持 signal 参数
    electronProcess.kill()
    // electronProcess = null
  }
  electronProcess = spawn(electron, [path.join(ROOT, 'dist/main.js')])
  electronProcess.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  electronProcess.stderr.on('data', (data) => {
    console.log(data.toString())
  })
  electronProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    watching.close()
    if (code === 0) {
      process.exit()
    }
  })
}

function buildPreload () {
  webpack(
    {
      // [配置对象](/configuration/)
      ...preloadConfig,
      mode: 'development',
    },
    (err, stats) => {
      // [Stats Object](#stats-object)
      if (err || stats.hasErrors()) {
        // [在这里处理错误](#error-handling)
        console.error('Error', err)
      }
      // 处理完成
      console.log(now(), stats.toJson('summary'))
      console.log('build preload success')
    }
  )
}

function startMain () {
  const compiler = webpack({
    // [Configuration Object](/configuration/)
    ...config,
    mode: 'development',
  })

  watching = compiler.watch(
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
        console.log('build main success')
        buildPreload()
        startElectron()
      }
    }
  )
}

function start () {
  // renderer
  exec(
    'npm run dev',
    { cwd: path.join(ROOT, 'src/renderer') },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    }
  )
  startMain()
}

start()
