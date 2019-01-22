// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    output: !isProd ? undefined : {
        // publicUrl: './',
        fileNames: {
            js: '[name].[chunkhash:8].js'
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


