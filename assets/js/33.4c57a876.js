(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{371:function(t,e,a){"use strict";a.r(e);var s=a(0),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"關於-ts-loader-的-appendtssuffixto"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#關於-ts-loader-的-appendtssuffixto","aria-hidden":"true"}},[t._v("#")]),t._v(" 關於 ts-loader 的 appendTsSuffixTo")]),t._v(" "),a("p",[t._v("當你使用Vue + TypeScript + Webpack,\n其中TypeScript 使用的是ts-loader .")]),t._v(" "),a("p",[t._v("由於使用了vue 的單文件组件，所以ts-loader\n配置了appendTsSuffixTo: [/.vue$/]")]),t._v(" "),a("p",[t._v("但是發現在使用thread-loader 和cache-loader 加速構建時，\n會報")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Could not find file: '*.vue.ts' 的錯誤。\n")])])]),a("p",[t._v("但是項目中並沒有*.vue.ts 的文件")]),t._v(" "),a("h2",{attrs:{id:"解決方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解決方案","aria-hidden":"true"}},[t._v("#")]),t._v(" 解決方案")]),t._v(" "),a("p",[t._v("由於報的是找不到文件錯誤，那我們就把TypeScript 代碼從.vue 中移出來。\n使用一個單獨的ts 文件，然後vue 再引用這個ts 文件")]),t._v(" "),a("p",[t._v("xxx.vue 文件:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('<template>\n<div>\n</div>\n</template>\n\n<script lang="ts" src="./xxx.ts"><\/script>\n\n<style>\n</style>\n')])])]),a("p",[t._v("xxx.ts文件:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("export default {\n}\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);