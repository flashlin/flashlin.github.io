# TimescaleDB

時序數據有幾個特點
* 基本上都是插入，沒有更新的需求。
* 數據基本上都有時間屬性，隨著時間的推移不斷產生新的數據，舊的數據不需要保存太久。
* 時序數據，插入是一個強需求。對於插入性能要求較高。



* 下載 Photon 2.0 ova 檔案, 並且拖拉檔案進入 VMWare 安裝
default 
Username: root
Password: changeme

修改預設密碼之後, 啟動 Docker
> systemctl start docker 

> systemctl enable docker

查看狀態
> systemctl status docker

查看
> ps aux |grep docker

建立
> docker run -d --name timescaledb -p 5432:5432 timescale/timescaledb

執行
> docker exec -it timescaledb psql -U postgres