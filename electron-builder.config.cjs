/*eslint-env node*/
const { version, name } = require("./package.json");

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration
 */
module.exports = {
  productName: "template",
  appId: "com.joey.template",
  artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
  directories: {
    output: "release",
    buildResources: "build",
  },
  files: ["dist", "!**/node_modules/**"],
  electronLanguages: ["en-US", "zh-CN"],
  win: {
    icon: "build/icon.ico",
    target: "nsis",
    signtoolOptions: {
      certificateFile: "build/template.pfx",
    },
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
    installerLanguages: ["zh_CN", "en_US"],
    // installerSidebar  164 × 314
  },
  mac: {
    icon: "build/icon.icns",
    target: "default",
    identity: null,
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
        type: "link",
        path: "/Applications",
      },
      {
        x: 130,
        y: 150,
        type: "file",
      },
    ],
  },
  releaseInfo: {
    releaseName: `v${version}`,
    releaseDate: new Date().toLocaleString("zh-CN"),
    releaseNotesFile: "build/release-notes.md",
  },
  // publish: {
  //   provider: "generic",
  //   url: "http://loclalhost:8080/", // 更新服务器地址
  // },
};
