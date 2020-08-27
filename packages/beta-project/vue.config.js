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
		},
		proxy: {
			'/merchantwebapi': {
				target: 'http://localhost:51448/',
				secure: false,
				ws: false,
				pathRewrite: { '^/merchantwebapi': '' }
			},
			'/marketwebapi': {
				target: 'http://localhost:13160',
				secure: false,
				ws: false,
				pathRewrite: { '^/marketwebapi': '' }
			},
			'/market': {
				target: 'http://localhost:51129',
				secure: false,
				ws: false,
				pathRewrite: { '^/market': '' }
			},
			'/tender': {
				target: 'http://localhost:25777',
				secure: false,
				ws: false,
				pathRewrite: { '^/tender': '' }
			},
			'/onboarding': {
				target: 'http://localhost:55242',
				secure: false,
				ws: false,
				pathRewrite: { '^/onboarding': '' }
			},
			'/merchantinterfaces': {
				target: 'http://localhost:55524',
				secure: false,
				ws: false,
				pathRewrite: { '^/merchantinterfaces': '' }
			}
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
				"@": path.resolve(__dirname, "src")
			}
		}
	}
}