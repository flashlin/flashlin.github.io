### Vue2 With Typescript

當你嘗試編譯(Compile) Typescript 配合Vue2 時候, 出現下面錯誤訊息

```
typescript declaration error, vue/vue-router has no default export
```

請在tsconfig.json 設定中加上

```
{
	"compilerOptions": {
		"allowSyntheticDefaultImports": true
	}
}
```
