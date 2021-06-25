const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'fdd',
    filename: 'fdd.js',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/preset-env", {
            "useBuiltIns": "entry",
            "corejs": 3,
            "targets": "> 0.25%, not dead"
          }]
          ]
        },
      },
    ],
  },
};
