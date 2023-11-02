const path = require('path');
const webpack = require('webpack');
const refreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'reaction-speed', // 굳이 필요는 없음
  mode: 'development', // 실 서비스에서는 production으로 변경
  //mode: 'production',
  devtool: 'eval', // 빠르게 하겠다? 배포시 'hidden-source-map'

  resolve: {
    extensions: ['.js', '.jsx'] // entry.app의 파일명에 해당 확장자 파일을 검색해 준다.
  },

  // entry에 있는 파일을 module을 적용한 후 output으로 출력한다라고 이해하면 쉽다.
  entry: {
    app: ['./client'] // client.jsx에서 wordRelay.jsx를 불러오기 때문에 적어주지 않아도 된다.
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/, // 규칙을 적용할 파일들(js, jsx 파일에 이 룰을 적용한다)
        loader: 'babel-loader', // babel-loader를 적용하겠다
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 5% in KR'] // https://github.com/browserslist/browserslist
              },
              debug: true
            }],
            ['@babel/preset-react'],
          ],
          plugins: [
            'react-refresh/babel' // hot reloading
          ]
          // preset : 플러그인들의 모임
          // preset-env : 구버전 브라우저에서도 호환되도록 지원(문법)
        }
      }
    ],
  },

  plugins: [
    new refreshPlugin()
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }, // 출력

  devServer: {
    hot: true,
    // webpack-dev-server 4버전 부터
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
  }
};