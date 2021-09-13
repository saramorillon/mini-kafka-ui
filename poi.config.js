const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: 'src/index.tsx',
  output: { dir: 'dist', publicUrl: '.', target: 'electron-renderer' },
  plugins: [{ resolve: '@poi/plugin-typescript' }],
  configureWebpack: {
    plugins: [new CopyPlugin([{ from: 'package.json' }, { from: 'index.js' }])],
  },
}
