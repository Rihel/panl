var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');
var webpack=require('webpack');
/**
 * 定义一些文件夹的路径
 * */
var ROOT_PATH=path.resolve(__dirname);
var APP_Path=path.resolve(ROOT_PATH,'app');
var Dist_Path=path.resolve(ROOT_PATH,'dist');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
module.exports={
	entry:{
		app: path.resolve(APP_Path, 'index.js'),
		mobile: path.resolve(APP_Path, 'mobile.js'),
		vendors: ['jquery', 'moment']
	},
	output:{
		path:Dist_Path,
		filename:'[name].[hash].js'
	},
	plugins:[

		new htmlWebpackPlugin({
			title: 'Hello World app',
			template: path.resolve(TEM_PATH, 'index.html'),
			filename: 'index.html',
			//chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks: ['app', 'vendors'],
			//要把script插入到标签里
			inject: 'body'
		}),
		new htmlWebpackPlugin({
			title: 'Hello Mobile app',
			template: path.resolve(TEM_PATH, 'mobile.html'),
			filename: 'mobile.html',
			chunks: ['mobile', 'vendors'],
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	module:{
		loaders:[
			{
				test:/\.scss$/,
				loaders:['style','css','sass'],
				include:APP_Path
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=400'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: APP_Path,
				query: {
					presets: ['es2015']
				}
			},
		]
	},
	derServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
	}
}