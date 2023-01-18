const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 4200,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Brian Sturdivan | Good guy',
      meta: {
        description:
          'I write code for a fashion brand. I converse with a computer and humanize it, to teach it to be approachable to my nephew, my parents, and everyone in between.',
        viewport: 'width=device-width, initial-scale=1.0',
        robots: 'index, follow',
      },
    }),
    new FaviconsWebpackPlugin('./src/images/favicon.svg'),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            assert: { type: 'css' },
            loader: 'css-loader',
            options: {
              exportType: 'css-style-sheet',
            },
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
}
