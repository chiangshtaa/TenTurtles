var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
        // loaders: [
        //     'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        //     'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=true'
        // ]
      // }
    ]
  }
};

 // use: [
 //    {
 //      loader: 'file-loader',
 //      options: {
 //        query: {
 //          name:'assets/[hash].[ext]'
 //        }
 //      }
 //    },
 //    {
 //      loader: 'image-webpack-loader',
 //      options: {
 //        query: {
 //          mozjpeg: {
 //            progressive: true,
 //          },
 //          gifsicle: {
 //            interlaced: true,
 //          },
 //          optipng: {
 //            optimizationLevel: 7,
 //          }
 //        }
 //      }
 //    }]

