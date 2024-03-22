const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const os = require('os');
const threads = os.cpus().length;
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}
const pages = {
	index: {
		title: pkg.description,
		env: process.env.NODE_ENV === 'production',
		entry: 'src/index.js',
		template: 'public/index.html',
		filename: 'index.html'
	},
	login: {
		title: pkg.description,
		env: process.env.NODE_ENV === 'production',
		entry: 'src/login.js',
		template: 'public/index.html',
		filename: 'login.html'
	},
	main: {
		title: pkg.description,
		env: process.env.NODE_ENV === 'production',
		entry: 'src/main.js',
		template: 'public/index.html',
		filename: 'main.html'
	}
};
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	publicPath: './',
	assetsDir: 'static',
	outputDir: 'assets', //测试环境包名部署名称
	productionSourceMap: false,
	//filenameHashing: false,
	devServer: {
		open: {
			target: 'login.html'
		},
		host: '127.0.0.1',
		//开启热更新
		hot: true,
		compress: true,
		proxy: {
			'/dev-api': {
				// target: 'http://oa.zgpt.wisesoft.net.cn',
				target: 'http://172.16.9.188:88/',
				//  secure: false, // 如果是https接口，需要配置这个参数
				ws: true,
				changeOrigin: true, // 接口跨域 需打开这个参数
				pathRewrite: {
					'^/dev-api': ''
				}
			}
		}
	},
	pages: pages,
	chainWebpack: config => {
		//开启多线程打包
		config.module
			.rule('js')
			.test(/\.m?jsx?$/)
			.use('thread-loader')
			.before('cache-loader')
			.loader('thread-loader')
			.options({
				workers: 8,
				// 默认为 20
				workerParallelJobs: 50
			})
			.end();
		config.module
			.rule('vue')
			.test(/\.vue$/)
			.use('thread-loader')
			.before('cache-loader')
			.loader('thread-loader')
			.options({
				workers: 8,
				// 默认为 20
				workerParallelJobs: 50
			})
			.end();
		config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src'));
		if (process.env.NODE_ENV === 'production') {
			for (let i in pages) {
				config.plugins.delete(`prefetch-${i}`).delete(`preload-${i}`);
			}
			if (process.env.NODE_ENV === 'production') {
				config.optimization.splitChunks({
					chunks: 'all',
					cacheGroups: {
						styles: {
							name: 'styles',
							test: /\.(sa|sc|c)ss$/,
							chunks: 'all',
							enforce: true
						},
						vendor: {
							chunks: 'initial',
							test: /node_modules/,
							name: 'vendor',
							priority: 2,
							reuseExistingChunk: true,//如果当前块包含已经从主包中分离出来的模块，那么该模块将被重用，而不是生成新的模块
							enforce: true
						},
						common: {
							chunks: 'all',
							test: /[\\/]src[\\/]js[\\/]/,
							name: 'common',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 1,
							reuseExistingChunk: true,
							enforce: true
						},
						eossElement: {
							name: 'element-ui',
							test: /[\\/]node_modules[\\/]eoss-element[\\/]/,
							chunks: 'initial',
							priority: 3,
							reuseExistingChunk: true,
							enforce: true
						},
						eossUi: {
							name: 'eoss-ui',
							test: /[\\/]node_modules[\\/]eoss-ui[\\/]/,
							chunks: 'initial',
							priority: 3,
							reuseExistingChunk: true,
							enforce: true
						},
						echarts: {
							name: 'echarts',
							test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
							chunks: 'all',
							priority: 4,
							reuseExistingChunk: true,
							enforce: true
						},
						zrender: {
							name: 'zrender',
							test: /[\\/]node_modules[\\/]zrender[\\/]/,
							chunks: 'all',
							priority: 3,
							reuseExistingChunk: true,
							enforce: true
						},
						runtimeChunk: {
							name: 'manifest'
						}
					}
				});
			}
		}
	},
	configureWebpack: config => {
		//调试JS
		//config.devtool = 'source-map';
		config.devtool = process.env.NODE_ENV === 'production' ? false : 'source-map';
		if (process.env.NODE_ENV === 'production') {
			config.plugins.push(
				new CompressionPlugin({
					test: /\.(js|css|less)$/, // 匹配文件名
					algorithm: 'gzip', //采用的压缩算法
					threshold: 10240, // 对超过10k的数据压缩
					deleteOriginalAssets: false, // 不删除源文件
					minRatio: 0.8 // 压缩比
				})
			);
			config.plugins.push(
				new ESLintWebpackPlugin({
					// 指定检查文件的根目录
					context: path.resolve(__dirname, '../src'),
					exclude: 'node_modules', // 默认值
					cache: true, // 开启缓存
					// 缓存目录
					cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
					threads // 开启多进程
				})
			);
		}
	},
	css: {
		// 	//查看CSS属于哪个css文件
		sourceMap: process.env.NODE_ENV === 'production' ? false : true,
		loaderOptions: {
			sass: {
				// prependData 是一个字符串，它会被自动添加到所有由 sass-loader 处理的 SASS/SCSS 文件的开头。
				// 在这个例子中，它被用来导入一个全局的 SASS 文件（config.base.scss）。
				// 这意味着在项目的任何地方编写 SASS/SCSS 代码时，都无需单独导入这个文件，从而可以直接使用其中定义的变量、mixin 或函数。
				additionalData: `@import "@/assets/style/config.base.scss";`, //引入全局变量
				// sass-loader v8 中，这个选项名是 "prependData"
				// prependData: `@import "@/assets/style/config.base.scss";` //引入全局变量
				sassOptions: {
					outputStyle: 'expanded'
				}
			}
		}
	}
});
