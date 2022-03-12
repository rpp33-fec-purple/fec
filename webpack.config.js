const path = require('path');
// const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    filename: 'bundle.js',
    path:path.join(__dirname, "/client/dist"),
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  }
  // plugin: [new HtmlWebPackPlugin ({
  //   template: './client/dist/index.html',
  //   fileName: './index.html'
  // })]
}