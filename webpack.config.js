module.exports = {
  module: {
    rules: [
      {
        test: /\.js|js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};