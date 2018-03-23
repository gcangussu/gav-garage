const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = function config(env = {}) {
  const { production: isProduction } = env;

  return {
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader/url', 'file-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
    ],
    devServer: {
      historyApiFallback: true,
      overlay: {
        errors: true,
      }
    },
  };
};
