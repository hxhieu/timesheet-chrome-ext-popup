const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    eventPage: path.join(__dirname, 'src/eventPage.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [new Dotenv()],
};
