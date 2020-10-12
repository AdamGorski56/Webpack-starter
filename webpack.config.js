const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



module.exports = {
    mode: "production", 
    entry: {
      main: "./src/index.js",
      libs: "./src/libs.js",
    },
    
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
         
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              }
            },
  
          {
            test: /\.html$/i,
            loader: 'html-loader',
            options: { minimize: true }
          },
          
          {
            test: /\.scss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options:{
                  name:"[name].[hash].[ext]"
                }
              },
            ],
          },
        ],
      },

      plugins : [

        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),

        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),

        new CleanWebpackPlugin({}),

      ]
}