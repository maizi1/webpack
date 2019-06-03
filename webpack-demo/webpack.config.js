const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理插件
const webpack = require('webpack');

const glob = require('glob');

const HTMLReg = /[^/]*(?=.html)/;
const JSReg = /[^/]*(?=.js)/;

const html = glob.sync('src/view/**/*.html').map(path => {
    let name = path.match(HTMLReg)[0]; // 从路径中提取出文件名
    return new HtmlWebpackPlugin({
        template: path,
        filename: name + '.html',
        chunks: [name],
    });
});

const entries = glob.sync('src/view/**/*.js').reduce((prev, next) => {
    let name = next.match(JSReg)[0];
    prev[name] = './' + next;
    return prev;
}, {});

module.exports = {
    mode: 'development', // 模式！ 可选值 development, production 或 none。 其默认值为 production。
    // 多入口文件时使用对象， 以键值对的形式设置，属性名可在 ouput 中通过 [name] 访问。
    entry: entries,
    // 输出路径 及 文件名 通过 [name] 访问到 entry 中对应路径的属性名
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // optimizanpm install --save-dev webpack-mergetion: {
    // usedExports: true,
    // },
    // 开发服务器
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(html),
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
