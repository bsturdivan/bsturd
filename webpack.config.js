const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const RobotstxtPlugin = require("robotstxt-webpack-plugin")

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
      lang: 'en-US',
      link: {
        rel: 'canonical',
        href: 'https://bsturd.com'
      },
      meta: {
        description:
          'I write code for a fashion brand. I converse with a computer and humanize it, to teach it to be approachable to my nephew, my parents, and everyone in between.',
        viewport: 'width=device-width, initial-scale=1.0 viewport-fit=cover',
        robots: 'index, follow',
        'og:title': 'Brian Sturdivan | Good guy',
        'og:description': 'I write code for a fashion brand. I converse with a computer and humanize it, to teach it to be approachable to my nephew, my parents, and everyone in between.',
        attribute: {
          name: 'og:image',
          content: 'https://en.gravatar.com/userimage/27056451/c2dde4e2da056e1801dde06142461eb1?size=1000',
        },
        'og:url': 'https://bsturd.com/',
        'og:type': 'profile',
      },
    }),
    new FaviconsWebpackPlugin('./src/images/favicon.svg'),
    new RobotstxtPlugin({ 
      policy: [
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 10,
      },
    ],
    host: "http://bsturd.com",
  }),
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
