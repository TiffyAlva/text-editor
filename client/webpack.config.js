const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins(DONE) for a service worker(DONE? line 26) and manifest file(DONE? line 26).
// TODO: Add CSS loaders(DONE) and babel to webpack(DONE).

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),

      // new WebpackPwaManifest({
      //   name: 'Contact Cards Application',
      //   short_name: 'Contact Cards',
      //   description: 'Keep track of important contacts!',
      //   background_color: '#7eb4e2',
      //   theme_color: '#7eb4e2',
      //   start_url: './',
      //   publicPath: './',
      //   icons: [
      //     {
      //       src: path.resolve('src/images/icon-manifest.png'),
      //       sizes: [96, 128, 192, 256, 384, 512],
      //       destination: path.join('assets', 'icons'),
      //     },
      //     {
      //       src: path.resolve('src/images/icon-manifest.png'),
      //       size: '1024x1024',
      //       destination: path.join('assets', 'icons'),
      //       purpose: 'maskable'
      //     }
      //   ],
      // }), 

      new InjectManifest({
        swSrc: './sw.js',
        swDest: 'service-worker.js',
      }), 
      
    ],
    
      

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              
            },
          },
        },

      ],
    },
  };
};