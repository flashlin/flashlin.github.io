# SignalR


### SQL Server 環境

> Install-Package Microsoft.AspNet.SignalR.SqlServer -Version 2.2.1

```
string sqlConnectionString = ConfigurationManager.ConnectionStrings["SignalRService"].ToString();
GlobalHost.DependencyResolver.UseSqlServer(sqlConnectionString);
app.MapSignalR(hubConfiguration);
```

SignalR會自動幫我們建立3張資料表
* SignalR.Message_0
* SignalR.Message_0_Id
* SignalR.Schema


### Redis 環境

> Install-Package Microsoft.AspNet.SignalR.Redis

得先裝幾個工具
> yum -y install net-tools wget gcc tcl

安裝完畢後...我們就開始下載壓縮檔吧!!
> wget http://download.redis.io/releases/redis-3.0.7.tar.gz

再來就是解壓縮了
> tar xzf redis-3.0.7.tar.gz

接著先進入Redis的目錄底下
> cd redis-3.0.7

編譯一下
```
> make
> make install
```

先來建立個相關的目錄
```
> mkdir /etc/redis
> mkdir /var/redis
```

建立完畢後，再來複製設定檔!!

> cp ~/redis-3.0.7/redis.conf /etc/redis/redis_6379.conf

複製完後我們來建立一下工作的目錄
> mkdir /var/redis/6379

再來我們進去文件裡修改一下設置
> vi /etc/redis/redis_6379.conf

```
daemonize yes
pidfile /var/run/redis_6379.pid
logfile /var/log/redis_6379.log
dir /var/redis/6379
```

重新設定一下防火牆
```
firewall-cmd --permanent --add-port=6379/tcp
firewall-cmd --reload
```

把redis設定為開機就啟始!!
先進去
> vi /lib/systemd/system/redis_6379.service

接著照下設定
```
[Unit]
Description=Redis on port 6379
After=network.target
[Service]
Type=forking
ExecStart=/user/local/bin/redis-server /etc/redis/redis_6379.conf
ExecStop=/user/local/bin/redis-cli -p 6379 shutdown
[Install]
WantedBy=nulti-user.target
```

再來我們註冊Redis的服務
```
> systemctl daemon-reload
> systemctl enable redis_6379.service
```

再來啟用他!!
> systemctl start redis_6379.service

再來ping一下看看有沒有成功!!
> redis-cli ping

到這裡我們終於安裝完Redis 了,
需要的只是在....Startup.cs 裡面加上這短短的一行就結束了!!

> GlobalHost.DependencyResolver.UseRedis(server, port, password, eventKey);

開一下Redis查詢一下Log , 我們輸入下列來進入Redis

> redis-cli -a password

再來輸入下面指令來查詢eventKey 為Redis 的紀錄
> SUBSCRIBE Redis 


### Azure 環境

> Install-Package Microsoft.AspNet.SignalR.ServiceBus



## Custom SignalR Host

```
Install-Package Microsoft.AspNet.SignalR.SelfHost
Install-Package Microsoft.Owin.Cors
```

接著我們在console 專案中把服務給on起來

```
static void Main(string[] args){
	string url = "http://localhost:8080";
	using(WebApp.Start(url)){
		Console.WriteLine("Server running on {0}", url);
		Console.ReadLine();
	}
}
```

Startup.cs
```
class Startup {
	public void Configuration(IappBuilder app){
		app.UseCors(CorsOptions.AllowAll);
		app.MapSignalR();
	}
}
```

MyHub.cs
```
public class MyHub : Hub {
	public void Send(string name,string message){
		Clients.All.addMessage(name, message);
	}
}
```

