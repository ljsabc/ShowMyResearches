const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target:"web",
  entry: {
    'index': [
      path.resolve(__dirname, './index.js')
    ],
    'single': [
      path.resolve(__dirname, './singlePage/colorize.html')
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules/'),
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]

    },
    { 
      test: /\.pug$/,
      use: ["pug-loader"]
    },
    {
      test: /\.(png|jpg|jpeg|gif|ico|svg|eot|otf|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'assets/',
          name: '[name].[ext]',
          publicPath: 'assets',
        }
      }]
    },
    {
      test: /.+singlePage.+\.html$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: '/',
          name: '[name].[ext]',
          publicPath: 'assets',
        }
      }]
    },
    ]
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FixStyleOnlyEntriesPlugin({
      extensions: ['css', 'html']
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true,
      filename: '[name].min.css'
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin({
    }),
    new CopyPlugin([{
      from: './singlePage/assets',
      to: './assets',
    }])
  ]
}
