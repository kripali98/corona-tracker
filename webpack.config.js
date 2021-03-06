const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
 template: './src/index.html'
});
module.exports = {
	entry: "./src/index.js",
	output: {
		path:__dirname+ "/dist",
		filename:"./bundle.js"
	},
  module: {
    rules: [{
   test: /\.js$/,
   exclude: /node_modules/,
   loader: 'babel-loader'  
 },
  {
   test: /\.css$/,
   use: ['style-loader', 'css-loader']
  }
]},
 plugins: [htmlPlugin]
};