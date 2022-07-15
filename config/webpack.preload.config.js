const path = require('path')

const ROOT = path.resolve(__dirname, '../')

/** @type import('webpack').Configuration */
const config = {
  mode: 'production',
  target: 'electron-preload',
  entry: {
    preload: path.join(ROOT, 'src/main/windows/preload.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.join(ROOT, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: path.join(ROOT, 'src/main'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

module.exports = config
