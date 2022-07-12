const path = require('path')

const ROOT = path.resolve(__dirname, '../')

/** @type import('webpack').Configuration */
const config = {
  mode: 'production',
  target: 'electron-main',
  entry: path.join(ROOT, 'src/main/index.ts'),
  output: {
    filename: 'main.js',
    path: path.join(ROOT, 'dist'),
    clean: true
    // library: {
    //   type: 'commonjs2',
    // },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: path.join(ROOT, 'src/main')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}

module.exports = config
