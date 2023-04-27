const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    // clean: {
    //   dry: true,
    // },
  },
  mode: 'none',

  //   module: {
  //     rules: [
  //       {
  //         test: /\.(png|jpg)$/,
  //         type: 'asset/resource',
  //       },
  //     ],
  //   },

  //   module: {
  //     rules: [
  //       {
  //         test: /\.(png|jpg)$/,
  //         type: 'asset/inline',
  //       },
  //     ],
  //   },

  //   module: {
  //     rules: [
  //       {
  //         test: /\.(png|jpg)$/,
  //         type: 'asset',
  //       },
  //     ],
  //   },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3 kilobytes
          },
        },
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        //webpack will read the loader from right to left
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Kenji App',
      // filename: 'subfolder/custom_filename.html',
      meta: {
        description: 'Some description',
      },
    }),
  ],
};
