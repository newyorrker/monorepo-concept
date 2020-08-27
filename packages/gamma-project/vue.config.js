const path = require('path');
// const stringHelper = require('./build-utils/stringHelper');

console.log(process.env.NODE_ENV, 'NODE_ENV');

const isLocal = process.env.VUE_APP_IS_LOCAL === 'true';
const targetPathForCI = process.env.npm_config_targetPath;

const publicPath = isLocal ? '/bundles/Versioned' : '/microservices-tender/merchant-vue-ui';
const targetPath = isLocal ? __dirname + '/wwwroot/bundles/Versioned' : "..\\..\\..\\..\\deploy_tmp\\Microservices-tender\\merchant-vue-ui"; //для билда
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	css: {
		loaderOptions: {
			css: {
				modules: {
					localIdentName: '[local]-[hash:3]'
				},
				localsConvention: 'camelCaseOnly'
			}
		},
		requireModuleExtension: true
	},
	// pages: {
	// 	root: {
	// 		entry: 'src/entryPoints/product-edit-page.ts',
	// 		template: 'src/templates/product-edit.html'
	// 	}
	// },
	devServer: {
		hot: true,
		port: 9901,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	runtimeCompiler: true,
	outputDir: targetPath,
	publicPath: publicPath,
	configureWebpack: {
		plugins: [
			//new BundleAnalyzerPlugin()
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				"<-": path.resolve(__dirname, "public")
			}
		}
	}
}