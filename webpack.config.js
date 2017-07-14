const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')//生成html，可以自己写
const ExtractTextPlugin = require('extract-text-webpack-plugin')//抽离CSS
const BabiliWebpackPlugin = require('babili-webpack-plugin')//打包js文件
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin")

const PATHS = {
	app:path.join(__dirname,'src/app'),
	build:path.join(__dirname,'dist'),
	proPub:path.join(__dirname,'dist/static')
}

let plugin = new ExtractTextPlugin({
	filename:'css/[chunkhash].[name].css',
	ignoreOrder:true
})

module.exports = {
	devtool:"source-map",
	performance:{
		hints:"warning",
		maxEntrypointSize:1000000,
		maxAssetSize:450000
	},
	entry:{
		app:PATHS.app,
		vendor:['./libs/jquery-1.9.1.min.js']
	},
	output:{
		path:PATHS.proPub,
		filename:'js/[chunkhash].[name].js',
		publicPath:PATHS.proPub
	},
	resolve: {
	    extensions: ['.js', '.vue', '.json','.css','.less'],
	    alias: {
	      '@': path.join(__dirname,'src/assets')
	    }
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:plugin.extract({
					use:{
						loader:'css-loader'
					},
					fallback:'style-loader'
				})
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
		new webpack.DefinePlugin({
	    	'process.env.NODE_ENV': JSON.stringify('production')
	    }),
		new HtmlWebpackPlugin({
			filename:PATHS.build+'/index.html',
			template:'index.html',
			inject:true,
			minify: {
		        removeComments: true,
		        collapseWhitespace: true,
		        removeAttributeQuotes: true
      		}
		}),
		plugin,
		new BabiliWebpackPlugin(),
		/*此方法也是压缩js的，但是可以兼容es5，在不使用babel时不使用此方法
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      },
	      sourceMap: true
	    }),*/
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest'] // 指定公共 bundle 的名字。
            /*
            minChunks: function (module) {
                该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }*/
        })
	]
}
