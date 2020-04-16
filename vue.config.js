const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
node: {
    process: false,
    },  
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'javascript', 'html', 'xml', 'css']
      }
    ])
  }
}