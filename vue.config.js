/* eslint-disable */
// you can just require .json, saves the 'fs'-hassle
const package = require('./package.json');

function modify(buffer) {
  // copy-webpack-plugin passes a buffer
  const manifest = JSON.parse(buffer.toString());
  manifest.status = "ok"

  // make any modifications you like, such as
  manifest.version = package.version;

  // pretty print to JSON with two spaces
  manifest_JSON = JSON.stringify(manifest, null, 2);
  return manifest_JSON;
}

module.exports = {
    devServer: {
        proxy: 'http://localhost:4000',
        
    },
    chainWebpack: config => {
      config.plugin('copy')
            .tap(args => {
              args[0].push({
                from: "./src/version.json",
                to:   "./version.json",
                transform (content, path) {
                    return modify(content)
                }
              })
              return args
            })
    }
  }
