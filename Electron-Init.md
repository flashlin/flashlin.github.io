


指令內容說明如下:

electron-packager. MyApp: 將目前全部資料打包成MyApp這個名字
* --platform = darwin(Mac),win32(Windows),linux(LINUX)
* --arch = ia32,x64,all
* --version = Electron版本
* --icon = icon路徑
* --asar = true or false,設定true 是把程式文件封裝,比較不容易被看到原始碼
* --out = 輸出文件名稱(dist)
* --ignore = 忽略檔案不要打包,建議把electron都忽略掉,因為打包後裡面就有了,可以減少檔案大小
* --version-string.CompanyName = 新增安裝檔公司名稱
* --version-string.ProductName = 新增安裝檔產品名稱


Building the projects in this solution one at a time. 
D:\VDisk\GitRepository\Webpack\Electron-DealerApp\node_modules\edge\build\edge_nativeclr.vcxproj(20,3): error MSB4019: The imported pro
ject "D:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file ex
ists on disk.

[http://landinghub.visualstudio.com/visual-cpp-build-tools](Visual C++ 2015 Build Tools)


當你執行 
```
> npm config set python python2.7
> npm config set msvs_version 2015
> node_modules\edge\tools\build.bat release
```

會出現下面的錯誤

```
Use of const in strict mode
```

請執行以下指令
```
> npm install -g node-gyp@0.10.6 request@2.25.0
```



> npm install --build-from-source node-sass
