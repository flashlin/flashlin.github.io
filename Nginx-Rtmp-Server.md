

 從 [nginx](https://nginx.org/en/download.html) 下載 nginx-1.13.6.zip

解壓縮至 D:\Demo\nginx-1.13.6

下載服務狀態檢查程序 stat.xsl  [nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module/)

將 nginx-rtmp-module-master.zip 解壓縮後複製到
D:\Demo\nginx-1.13.6\nginx-rtmp-module\stat.xsl

建立 D:\Demo\nginx-1.13.6\rtmp 空目錄

建立 conf\nginx-win-rtmp.conf 內容如下

```
worker_processes 2;
#error_log logs/error.log info;
events{
	worker_connections 8192;
}
rtmp {
	server {
		listen 1935;
		chunk_size 4000;
		application live {
			live on;
		}
	}
}
http {
	include mime.types;
	default_type application/octet-stream;
	sendfile off;
	server_names_hash_bucket_size 128;
	client_body_timeout 10;
	client_header_timerout 10;
	keepalive_timeout 30;
	send_timeout 30;
	keeplive_requests 10;
	server {
		listen 8080;
		server_name localhost;
		location /stat {
			trmp_stat all;
			rtmp_stat_stylesheet stat.xsl;
		}
		location /stat.xsl {
			root nginx-rtmp-module/;
		}
		location /control {
			rtmp_control all;
		}
		localtion / {
			root html;
			index index.html index.htm;
		}
		error_page 500 502 503 504 /50x.html;
		location = /50x.html {
			root html;
		}
	}
}
```

啟動服務
> nginx.exe -c conf/nginx-win-rtmp.conf

