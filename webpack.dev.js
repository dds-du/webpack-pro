const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')//生成html，可以自己写
const ExtractTextPlugin = require('extract-text-webpack-plugin')//抽离CSS

const PATHS = {
	app:path.join(__dirname,'src/app'),
	dev:path.join(__dirname,'/')
}

let plugin = new ExtractTextPlugin({
	filename:'[name].css',
	ignoreOrder:true
})

module.exports = {
	devtool:"source-map",
	entry:{
		app:[PATHS.app,'webpack-hot-middleware/client?reload=true']
	},
	output:{
		path:PATHS.dev,
		filename:'[name].js',
		publicPath:'/'
	},
	resolve: {
	    extensions: ['.js', '.vue', '.json','.css','.less'],
	    alias: {
	      '@': path.join(__dirname,'src/assets')
	    }
	},
	module:{
		rules:[
			/*
			//es-lint代码风格检测模块
			{
				test:/\.js$/,
				enforce:'pre',
				loader:'eslint-loader',
				options:{
					emitWarning:true
				}
			}*/
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.less$/,
				exclude:/node_modules/,
		        use:plugin.extract({
		        	use:[ 'css-loader','less-loader'],
		        	fallback: 'style-loader'
		        }),
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:true
		}),
		plugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(), 
	]
}
