(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{371:function(e,n,a){"use strict";a.r(n);var r=a(9),t=Object(r.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"多載函數"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多載函數","aria-hidden":"true"}},[e._v("#")]),e._v(" 多載函數")]),e._v(" "),a("p",[e._v("首先我們開啟VSCode , 按照下面動手做.")]),e._v(" "),a("p",[e._v("繼續回到 add 方法, 一般的 add 加法函數有兩個輸入參數回傳值是數字, 我們先宣告如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function add(a: number, b: number): number;\n")])])]),a("p",[e._v("之前上面有說明柯里化是...")]),e._v(" "),a("blockquote",[a("p",[e._v("柯里化後的新的函數, 輸入只有一個參數, 回傳值也是函數")])]),e._v(" "),a("p",[e._v("然後我們要將 add 柯里化, 所以再加以下宣告")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function add(a: number): (b: number) => number;\n")])])]),a("blockquote",[a("p",[e._v("(b: number) => number 是一個函數宣告, 表明有一個輸入參數 b, 回傳值是 number")])]),e._v(" "),a("p",[e._v("然後我們建立真正的add 加法函數, 輸入參數是無限個, 裡面不考慮加法如何實做, 我們先故意回傳 null")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function add(...args: any[]): any {\n   return null as any;\n}\n")])])]),a("p",[e._v("整個程式碼應該如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function add(a: number, b: number): number;\nfunction add(a: number): (b: number) => number;\nfunction add(...args: any[]): any {\n   return null as any;\n}\n")])])]),a("p",[e._v("這是Typescript 的多載函數宣告方法.")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("函數多載")]),e._v(" 是程式語言中允許建立很多個函數名稱相同, 但輸入參數類型可以不同, 數量也能不同, 甚至回傳值類型也可以不同")])]),e._v(" "),a("p",[e._v("現在我們輸入")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type OverloadedAdd = typeof add;\n")])])]),a("p",[e._v("我們用滑鼠移到 OverloadedAdd 上, 你會看到Typescript 描述 add 的柯里化函數的內容, 如下所示")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type OverloadedAdd = {\n   (a: number, b:number): number;\n   (a: number): (b: number) => number;\n};\n")])])]),a("p",[e._v("現在我們知道Typescript 對於 add 函數的柯里化宣告定義是甚麼樣子了.")]),e._v(" "),a("p",[e._v("清除所有程式碼, 這次我們輸入 CurryAdd 柯里化")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAdd = {\n   (a: number, b:number): number;\n   (a: number): (b: number) => number;\n};\n")])])]),a("p",[e._v("然後我們要重構一下, 提取這個部分")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("(b: number) => number \n")])])]),a("p",[e._v("變成下面程式碼")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAdd1 = (b: number) => number;\n")])])]),a("p",[e._v("因為只有一個參數, b 名稱很難看, 我們修改名稱為 a")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAdd1 = (b: number) => number;\n")])])]),a("p",[e._v("最後上述程式碼重構完後, 完整程式碼如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAdd1 = (a: number) => number;\n\ntype CurryAdd2 = {\n   (a: number, b:number): number;\n   (a: number): CurryAdd1;\n};\n")])])]),a("p",[e._v("觀察上面的程式碼, 你可以發現 type CurryAdd2 第一行是帶有兩個參數的原始宣告, 第二行是柯里化宣告.")]),e._v(" "),a("p",[e._v("故假如我們要 CurryAdd2 加法函數能夠接受三個參數.")]),e._v(" "),a("p",[e._v("所以我們可以這樣做, 建立 CurryAdd3 第一行表示要三個參數, 然後後面加上兩個 Curry 柯里化函數")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAdd3 = {\n   (a: number, b:number, c:number): number;\n   (a: number, b:number): CurryAdd1;\n   (a: number): CurryAdd2;\n};\n")])])]),a("p",[e._v("到目前為止, 我們可以手動建立輸入 n 個參數的 Curry 柯里化函數.")]),e._v(" "),a("p",[e._v("現在思維跳回一般的物件導向語言, 實際上我們的一般物件函數的定義, 並非只有兩個參數, 或三個參數. 如果我們手動輸入把這些物件導向函數柯里化為新的函數.")]),e._v(" "),a("p",[e._v("遇到物件導向函數有 5 個輸入參數, 那我們就得手工敲很多程式碼才能夠將它柯里化....")]),e._v(" "),a("p",[e._v("所以我們必須有一種方法可以重複做到這樣的功能.")]),e._v(" "),a("p",[e._v('幸好Typescript 有提供 "條件類型" (Conditional Types), 它允許我們根據條件判斷, 而回傳類型.')]),e._v(" "),a("p",[e._v("以下是Typescript 條件類型判斷語法")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type ConditionalType<T> =\n   T extends SomeType ? TypeA : TypeB;\n")])])]),a("p",[e._v("然後當我們輸入以下程式碼, Typescript 就會判斷 TypeX 的類型是不是 SomeType , 如果是的話就回傳 TypeA, 不是的話就回傳 TypeB .")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("const x: ConditionalType<TypeX>;\n")])])]),a("p",[e._v("所以在我們的 add 加法柯里化例子, 我們可以定義新的 CurryAddX 的條件類型")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("type CurryAddX<T> =\n   T extends [number, number, number] ? CurryAdd3 :\n   T extends [number, number] ? CurryAdd2 :\n   T extends [number] ? CurryAdd1 :\n   unknown\n;\n")])])]),a("p",[e._v("這個 CurryAddX 條件類型檢查 T 是否有匹配 [number, number, number] 三個參數, 有的話就給 CurryAdd3 柯里化函數.")]),e._v(" "),a("p",[e._v("沒有的話又檢查 T 是否有匹配 [number, number] 兩個參數, 有的話就給 CurryAdd2 柯里化函數.")]),e._v(" "),a("p",[e._v("以此類推到 unknown 未知結果.")]),e._v(" "),a("p",[e._v("unknown 是 Typescript 提供的類型, 表示是未知類型. 但是更安全的作法是動態檢查它的類型.")])])}),[],!1,null,null,null);n.default=t.exports},9:function(e,n,a){"use strict";function r(e,n,a,r,t,s,u,d){var p,l="function"==typeof e?e.options:e;if(n&&(l.render=n,l.staticRenderFns=a,l._compiled=!0),r&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),u?(p=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},l._ssrRegister=p):t&&(p=d?function(){t.call(this,this.$root.$options.shadowRoot)}:t),p)if(l.functional){l._injectStyles=p;var v=l.render;l.render=function(e,n){return p.call(n),v(e,n)}}else{var c=l.beforeCreate;l.beforeCreate=c?[].concat(c,p):[p]}return{exports:e,options:l}}a.d(n,"a",(function(){return r}))}}]);