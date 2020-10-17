const path = require('path');

const ClosurePlugin = require('closure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = env => ({
  mode: env.NODE_ENV,
  devtool: !env.production && 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /(node_modules)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        exclude: /(node_modules)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
          publicPath: 'assets/fonts',
          name: () => '[name].[ext]'
        }
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/audio',
          publicPath: 'assets/audio',
          name: () => '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              publicPath: 'assets/images',
              name: () => '[name].[ext]'
            },
          },
          { loader: 'image-webpack-loader' }
        ]
      },
    ]
  },

  entry: {
    'app.js': './src/js/app.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve('./src'),
      path.resolve('./src/js'),
      path.resolve('./node_modules')
    ]
  },

  output: {
    filename: 'app.js',
    publicPath: 'public',
    path: path.resolve(__dirname, './public')
  },

  optimization: {
    minimizer: [
      new ClosurePlugin({
        mode: 'STANDARD',
        output: {
          filename: './public/app.js',
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        js: {
          name: 'js',
          test: /\.js$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        css: {
          name: 'css',
          test: /\.s?css$/,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      hmr: env.NODE_ENV !== 'production'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    })
  ],
});
