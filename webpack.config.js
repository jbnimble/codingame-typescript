const webpack = require('webpack')
const join = require('path').join

// for each game, add a new 'entry'
// [name] is replaced by the key in the entry object
module.exports = {
  entry: {
    'power-of-thor-episode-1': join(__dirname, 'src/main', 'power-of-thor-episode-1.ts'),
    'chuck-norris': join(__dirname, 'src/main', 'chuck-norris.ts'),
    'mars-lander-2': join(__dirname, 'src/main', 'mars-lander-episode-2.ts')
  },
  output: {
    filename: '[name].js', path: join(__dirname, 'out')
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }]
  },
  plugins: [new webpack.DefinePlugin({'isRunAtCodingame': true})]
}
