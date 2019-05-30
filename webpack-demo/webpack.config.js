const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // html 模板插件
const webpack = require('webpack');

module.exports = {
    mode: 'development', // 模式！ 可选值 development, production 或 none。 其默认值为 production。
    // entry: './src/index.js', // 设置入口文件路径 默认为 src/index.js
    // 多入口文件时使用对象， 以键值对的形式设置，属性名可在 ouput 中通过 [name] 访问。
    entry: {
        app: './src/index.js',
    },
    // 输出路径 及 文件名 通过 [name] 访问到 entry 中对应路径的属性名
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        usedExports: true,
    },
    // inline-source-map 压缩后 代码报错跟踪 生产环境禁用 使用开发服务器时
    // devtool: 'inline-source-map',
    // 开发服务器
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        // 文件打包规则
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
};
