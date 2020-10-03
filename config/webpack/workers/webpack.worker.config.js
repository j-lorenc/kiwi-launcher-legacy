const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('../webpack.base.config');

module.exports = merge.smart(baseConfig, {
  target: 'node',
  entry: {
    import: './src/workers/import.ts',
  },
  output: {
    path: path.resolve(__dirname, '../../..', 'dist/worker/'),
    filename: '[name].js',
  },
  externals: {
    '@journeyapps/sqlcipher': 'commonjs @journeyapps/sqlcipher',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.node?$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    alias: {
      sqlcipher: '@journeyapps/sqlcipher',
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: ['./src/workers/*.ts'],
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
