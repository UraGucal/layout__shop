const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MD5FilesRename = require('./node/md-5-webpack-provider');

const md5_files_rename = new MD5FilesRename({
	production: true,
	path_to_hash: '../build/version.md5'
});

module.exports = {
	output: {
		path: path.join(__dirname, '../build'),
		publicPath: '../',
		filename: 'js/[name].min.js'
	},
	devServer: {
		port: 7000,
		compress: false,
		hot: true,
		overlay: true
	},
	entry: {
		main: './src/main.js'
		// wpEditor: "./src/wp-editor.js",
	},
	module: {
		rules: [
			{
				test: /\.(s[ass|sc]ss|css)$/,
				loader: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(jpg?g|gif|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]'
				}
			},
			{
				test: /\.(eot|ttf|woff|woff2|otf)$/,
				loader: 'file-loader',
				query: {
					limit: 10000,
					name: 'fonts/[name].[ext]'
				}
			}
		]
	},
	plugins: [
		// md5_files_rename,
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css'
		}),
		new OptimizeCssAssetsWebpackPlugin()
	]
};
