module.exports = {
  entry: 'src/index.tsx',
  output: { dir: 'dist', publicUrl: '.', target: 'electron-renderer' },
  plugins: [{ resolve: '@poi/plugin-typescript' }],
}
