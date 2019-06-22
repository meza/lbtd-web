import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import PostcssPresetEnv from 'postcss-preset-env';
import OptimizeCssAssetPlugin from 'optimize-css-assets-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';

export default function (env, arg) {

  const mode = arg.mode || 'development';
  const isDev = (mode === 'development');

  return {
    entry: {
      hotLoader: 'react-hot-loader/patch',
      main: './src/index.jsx',
    },
    target: 'web',
    output: {
      filename: isDev? '[name].[hash].js' : '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
              },
            },
          ],
        },
        {
          test: /\.scss?$/,
          use: [
            {
              loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              options: {
                sourceMap: true,
                hmr: isDev,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localsConvention: 'asIs',
                modules: {
                  localIdentName: '[local]',
                },
                importLoaders: 3,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  PostcssPresetEnv({
                    autoprefixer: {grid: true},
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png)$/i,
          loader: 'responsive-loader',
          options: {
            name: 'assets/[name]-[width]x[height].[contenthash].[ext]',
            adapter: require('responsive-loader/sharp')
          },
        },
        {
          test: /\.(gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: 'assets/[name].[contenthash].[ext]',
              limit: 8192,
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(),
      new StylelintWebpackPlugin({}),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new OptimizeCssAssetPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
    },
    mode: mode,
    devtool: isDev ? 'cheap-module-eval-source-map' : 'nosources-source-map',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    stats: {
      all: false,
      assets: true,
      assetsSort: 'size',
      builtAt: true,
      children: true,
      env: true,
      timings: true,
      // modules: false,
      // maxModules: 0,
      errors: true,
      warnings: true,
      //   // our additional options
      //   moduleTrace: true,
      errorDetails: true,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ecma: 6,
            warnings: false,
            parse: {},
            compress: {
              inline: true,
              drop_console: !isDev,
              dead_code: true,
              sequences: true,
              passes: 1,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
            },
            mangle: !isDev,
            module: false,
            output: {
              comments: false,
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: false,
            keep_fnames: false,
            safari10: false,
          },
        }),
      ],
    },
  };
}
