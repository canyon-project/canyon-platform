const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const proxy = require('./proxy')

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/main.[hash].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'swc-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg|eot|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/media',
            },
          },
        ],
      },
    ],
  },
  // 文件引用不需要后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // 本地开发服务
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0', //允许ip访问
    hot: true, // 模块热替换机制
    port: 8000,
    compress: true,
    open: false, // 打开浏览器，默认false
    proxy: proxy.DEV,
  },
  // 插件配置处~
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.[hash].chunk.css',
    }),
    new WebpackBar(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          filter: async (resourcePath) => {
            // 排除index.html
            if (resourcePath.includes('public/index.html')) {
              return false
            }
            return true
          },
        },
      ],
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
}
