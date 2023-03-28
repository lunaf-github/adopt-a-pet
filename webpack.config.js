const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode:"development",
  entry:path.join(__dirname,'index.js'),
  output: {
    path: path.join(__dirname,'dist'),
    filename:'bundle.js'
  },
  resolve:{
    extensions: ['*','.js','.jsx']
  },
  module: {
   rules:[
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use:['babel-loader'],
    },
    {
      test: /\.css$/,
      use:['style-loader', 'css-loader'],
    }
   ]
 },
 devServer:{
  static: {
   directory: path.join(__dirname, 'dist'),
  },
  port: 3000,
 },
 plugins: [
   new HTMLWebpackPlugin({
     title:'Development',
     template: path.join(__dirname,'src','index.html'),
   })
 ]
};