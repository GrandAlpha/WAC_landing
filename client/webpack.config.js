const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const createConfig = (
  _,
  { mode },
) => {
  const isProd = mode === 'production';
  const plugins = [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new MiniCssExtractPlugin({ filename: "css/[name].css", }),
  ];

  return {
    entry: {
      main: path.resolve(__dirname, `src/index`),
    },
    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/static/',
      filename: 'js/[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            require.resolve('postcss-loader'),
            require.resolve('sass-loader'),
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico|json)$/i,
          type: (isProd ? 'asset' : 'asset/resource'),
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
    plugins,
    resolve: {
      extensions: ['.js'],
      alias: {
        '@client': path.resolve(__dirname, 'src'),
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            chunks: 'all',
            name: 'vendors',
            test: /([\\/])node_modules\1/,
            enforce: true,
          },
        },
      },
      ...(isProd && {
        minimize: true,
        minimizer: [new TerserPlugin({ parallel: true })],
      })
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    target: ['web', 'es5'],
    mode,
  };
};

module.exports = createConfig;
