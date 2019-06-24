### 關於 ts-loader 的 appendTsSuffixTo

當你使用Vue + TypeScript + Webpack, 
其中TypeScript 使用的是ts-loader .

由於使用了vue 的單文件组件，所以ts-loader 
配置了appendTsSuffixTo: [/\.vue$/]

但是發現在使用thread-loader 和cache-loader 加速構建時，
會報

```
Could not find file: '*.vue.ts' 的錯誤。
```

但是項目中並沒有*.vue.ts 的文件


## 解決方案
由於報的是找不到文件錯誤，那我們就把TypeScript 代碼從.vue 中移出來。
使用一個單獨的ts 文件，然後vue 再引用這個ts 文件

xxx.vue 文件:

```
<template>
<div>
</div>
</template>

<script lang="ts" src="./xxx.ts"></script>

<style>
</style>
```


xxx.ts文件:

```
export default {
}
```