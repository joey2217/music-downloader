const { version, author } = require('./package.json')

const year = new Date().getFullYear()
const productName = 'ElectronApp'

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName,
  appId: 'com.example.app',
  copyright: `Copyright © ${year} ${author}`,
  directories: {
    output: 'release',
    buildResources: 'resources',
  },
  files: ['dist'],
  win: {
    icon: 'resources/icon.ico',
    target: {
      target: 'nsis',
      arch: ['x64'],
    },
  },
  nsis: {
    oneClick: false,
    language: '2052',
    perMachine: true,
    allowToChangeInstallationDirectory: true,
  },
  mac: {
    icon: 'resources/icon.icns',
    target: 'dmg',
  },
  dmg: {
    window: {
      width: 540,
      height: 380,
    },
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  extraMetadata: {
    version,
  },
  publish: {
    provider: 'generic',
    url: 'http://162.14.110.244/update/', // TODO update url
    channel: 'latest',
  },
}
