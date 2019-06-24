# ASP.Net Core IIS 出現 HTTP Error 500.19 - Internal Server Error

* Install the [.NET Core Windows Server Hosting bundle](https://aka.ms/dotnetcore-2-windowshosting)

* Restart the System or execute

```
>net stop was /y
>net start w3svc
```

* 在 IIS 站台(MyWeb) 設定應用程式集區 .NET CLR 版本為 "Non Managed Code"

* 在 IIS 站台(MyWeb)滑鼠右鍵, 設定 permission , 加入 "IIS AppPool\MyWeb" 使用者權限, 才能讓使用者存取 web.config

或者在 command 
> dotnet MyWeb.dll

啟動 localhost server 監聽 http Server

