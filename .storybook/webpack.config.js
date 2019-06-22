const PostcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = ({config}) => {

  config.module.rules.push({
    test: /\.jsx?$/, use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          "presets": [
            [
              "@babel/preset-env", {
              "useBuiltIns": "usage",
              "corejs": 3
            }
            ],
            "@babel/preset-react"
          ],
          "plugins": [
            "react-hot-loader/babel"
          ]
        }
      },
      {
        loader: 'eslint-loader',
      },
    ],
    exclude: /node_modules/,
  });

  config.module.rules.push({
    test: /\.(scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          sourceMap: true,
          hmr: true
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          localsConvention: 'asIs',
          modules: {
            localIdentName: '[local]'
          },
          importLoaders: 3
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          ident: 'postcss',
          plugins: () => [
            PostcssPresetEnv({
              autoprefixer: {grid: true}
            })
          ]
        }
      },
      'sass-loader',
    ],
    include: path.resolve(__dirname, '../'),
  });
  config.plugins.push(new MiniCssExtractPlugin());
  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  };

  config.devServer = {
    inline: true,
    hot: true
  };

  return config;
};
