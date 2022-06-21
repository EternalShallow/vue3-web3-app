import webpack from 'webpack';

module.exports = {
  configureWebpack: {
    plugins: [
      ...new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
