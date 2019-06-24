
NPM 每次在安裝的時候，都會安裝很久很久，就算是好幾個類似的專案，每次在執行 npm install 時都需要花費大量的時間，而且在網路不穩定的環境下還可能造成中斷。Yarn 可以讓這些問題好轉些.

### NPM 與 Yarn 指令比較

大多數的指令用法和原本並無差異，只要將 npm 換成 yarn 即可，特別要注意的是 npm install [package] 安裝少數套件在 yarn 是不支援的，yarn 的套件都是必須儲存 (--save)。


|NPM	|Yarn	|說明
|---|---|---|
|npm install				|yarn install	|-
|npm install [package]	|X					|不支援直接安裝套件
|npm install --save [package] |yarn add [paakage]	|僅是將 --save 改成 add
|npm install --save-dev [package]	|yarn add [paakage] --dev	|
|npm install --global [package]	|yarn global add [package]	|
|npm uninstall [package]	|X		|
|npm uninstall --save [package]	|yarn remove [package]	|
|rm -rf node_modules && npm install	|yarn upgrade	|移除再安裝 變 直接升級套件


