
### 新增 sass 的 loader 來編譯 .scss

> npm i sass-loader node-sass --save-dev

(如果你的 npm 版本是 5 以上，可以不用加 --save-dev)

在 webpack.config.js 裡新增 scss sass 的 rule

```
module.exports = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
```

