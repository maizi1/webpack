const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 模板插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理插件
const webpack = require('webpack');

const glob = require('glob');

const HTMLReg = /[^/]*(?=.html)/;
const JSReg = /[^/]*(?=.js)/;
const html = glob.sync('src/view/**/*.html').map(path => {
    let name = path.match(HTMLReg); // 从路径中提取出文件名
    return new HtmlWebpackPlugin({
        template: path,
        filename: name + '.html',
        chunks: [name],
    });
});

const entries = glob.sync('src/view/**/*.js').reduce((prev, next) => {
    console.log(next.match(JSReg));
    let name = next.match(JSReg)[1];
    prev[name] = './' + next;
    return prev;
}, {});
// console.log(glob.sync('src/view/**/*.js'));