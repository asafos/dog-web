// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production';
const {SITE_NAME} = require('./src/constants/appData');

module.exports = {
    output: {
        // publicUrl: './',
        fileNames: !isProd ? undefined : {
            js: '[name].[chunkhash:8].js'
        },
        html: {
            title: SITE_NAME
        }
    },
    // assets: {
    //     inlineImageMaxSize: 999999
    // },
    // chainWebpack(config, options) {
    //     if (options.analyze) {
    //         config.plugin('analyzer')
    //             .use(BundleAnalyzerPlugin)
    //     }
    // },
    babel: {
        transpileModules: ['@material-ui', '@int', 'react-native-base64', 'redux']
    },
    devServer: {
        // host: 'localhost',
        // port: serverPort
        proxy: 'http://[::1]:8000'
    }
};


