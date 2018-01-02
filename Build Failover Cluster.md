### Building a Two-Node Failover Cluster

設定 Cluster 步驟超複雜的, 特此紀錄.
準備Windows 2012 R2 Server

![](Build%20Failover%20Cluster\Cluster-Network.png)

## Build SQL-DC 

網路卡設定如下
![](Build%20Failover%20Cluster\SQL-DC-Network.png)

### 

我們必須建立4 個 iSCSI virtual disk
* 仲裁磁碟 (Quorum Disk) 1G (沒有見證磁碟似乎也可以)
* MSDTC (分散式交易) 500M (建議使用1G)
* SQL Server專用磁碟 8G
* SQL Server專用磁碟 5G

### 新增 Active Directory Domain Services
![](Build%20Failover%20Cluster\Build-AD-01.png)

![Ad Active Directory Domain Services](Build%20Failover%20Cluster\Build-AD-02.png)

![Confirm installation Ad Active Directory Domain Services](Build%20Failover%20Cluster\Build-AD-03.png)

![跑完之後點取更新,點取驚嘆號](Build%20Failover%20Cluster\Build-AD-04.png)

![新增樹系](Build%20Failover%20Cluster\Build-AD-05.png)

![輸入 DSRM 密碼](Build%20Failover%20Cluster\Build-AD-06.png)

![](Build%20Failover%20Cluster\Build-AD-07.png)

![](Build%20Failover%20Cluster\Build-AD-08.png)

採用預設值就可以了
![採用預設值就可以了](Build%20Failover%20Cluster\Build-AD-09.png)

點取安裝
![](Build%20Failover%20Cluster\Build-AD-10.png)

Waiting
![](Build%20Failover%20Cluster\Build-AD-11.png)

它會自動 Reboot, 之後

測試一下
> ping demo.com

![](Build%20Failover%20Cluster\Build-AD-12.png)


AD安裝完之後, 加入Reverse Lookup Zone
![](Build%20Failover%20Cluster\Build-AD-13.png)

New Zone
![](Build%20Failover%20Cluster\Build-AD-14.png)

![](Build%20Failover%20Cluster\Build-AD-15.png)

![](Build%20Failover%20Cluster\Build-AD-16.png)

![](Build%20Failover%20Cluster\Build-AD-17.png)

輸入Network ID: 192.168.75
![](Build%20Failover%20Cluster\Build-AD-18.png)

![](Build%20Failover%20Cluster\Build-AD-19.png)

![](Build%20Failover%20Cluster\Build-AD-20.png)

![](Build%20Failover%20Cluster\Build-AD-21.png)

建立好之後, 在 command window 輸入下面指令

```
ipconfig /flushdns
ipconfig /registerdns
```

資料就會寫到Reverse Lookup Zone之中了，如下
![](Build%20Failover%20Cluster\Build-AD-22.png)



## Set SQL-A Node

修改電腦名稱為SQL-A，並重新開機，

> netdom renamecomputer %computername% /newname:SQL-A

重開機登入後，再來將SQL-A加入demo.com 網域

> netdom join SQL-A /domain:demo.com

再重開機然後以 administrator@demo.com 登入!

![](Build%20Failover%20Cluster\Join-AD.png)

設定 HeartBeat 網路卡 IP

![](Build%20Failover%20Cluster\HeartBeat.png)

注意: 順便設定 DNS 不要勾選 Register this connection's addresses in DNS

![](Build%20Failover%20Cluster\HeartBeat-2.png)

WINS 設定注意

![](Build%20Failover%20Cluster\SQL-A-HeartBeat-Wins.PNG)


另外一張網卡

![](Build%20Failover%20Cluster\SQL-A-iSCSI-Network.png)




![iSCSI Initiator Target](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-01.png)

![Volumes and Devices](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-02.png)

![Disk](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-03.png)

![Simple Volume](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-04.png)

![Assign Drive Letter](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-05.png)

![Format Partition](Build%20Failover%20Cluster\SQL-A-Set-iSCSI-Initiator-06.png)

SQL-A, SQL-B共享磁碟設定完成後，就可以再設定"容錯轉移叢集"

新增「應用程式伺服器」角色，並勾選以下Features及Role Services，
![Start Failover](Build%20Failover%20Cluster\Start-Failover-01.png)

因為安裝SQL Server 2012需要.NET 3.5，所以就一併的新增安裝進來!
![](Build%20Failover%20Cluster\Start-Failover-02.png)

![](Build%20Failover%20Cluster\Start-Failover-02-1.png)

![]
(Build%20Failover%20Cluster\Start-Failover-03.png)

![Confirm installation selections](Build%20Failover%20Cluster\Start-Failover-04.png)

D:\Sources\sxs\
![Specify Alternate Source Path](Build%20Failover%20Cluster\Start-Failover-04-1.png)

![Installation progress](Build%20Failover%20Cluster\Start-Failover-05.png)

![](Build%20Failover%20Cluster\Start-Failover-07.png)

Add Failover Clustering 
![](Build%20Failover%20Cluster\Start-Failover-08.png)

![](Build%20Failover%20Cluster\Start-Failover-09.png)

開始 Failover Manager

![](Build%20Failover%20Cluster\Start-Failover-10.png)

注意請一定要加入 domain 否則會出現此警告

![](Build%20Failover%20Cluster\Start-Failover-11.png)


![](Build%20Failover%20Cluster\Start-Failover-12.png)

輸入 SQL-A.demo.com , 然後點取 Add
注意: 如果每一個SQL-n 節點電腦沒有完成網路和iSCSI設定, 就會出現 The node cannot be contacted 錯誤

![](Build%20Failover%20Cluster\Start-Failover-13.png)

全部加入

![](Build%20Failover%20Cluster\Start-Failover-14.png)

![](Build%20Failover%20Cluster\Start-Failover-15.png)

![](Build%20Failover%20Cluster\Start-Failover-16.png)

![](Build%20Failover%20Cluster\Start-Failover-17.png)

![](Build%20Failover%20Cluster\Start-Failover-18.png)

![](Build%20Failover%20Cluster\Start-Failover-19.png)

![](Build%20Failover%20Cluster\Start-Failover-20.png)

![](Build%20Failover%20Cluster\Start-Failover-21.png)

![](Build%20Failover%20Cluster\Start-Failover-22.png)

建立完成之後, 在 Failover Cluster Manager 中可以看到
WIN-CS.demo.com 資訊如下

![](Build%20Failover%20Cluster\Start-Failover-23.png)

![](Build%20Failover%20Cluster\Start-Failover-24.png)

在這個地方可以改成比較容易識別的名稱
![](Build%20Failover%20Cluster\Start-Failover-25.png)

連到SQL-B，開啟Failover Cluster Manager也可以看到相同的設定。

建立好基本的Windows Cluster之後，我們需要再建立DTC，如下，

![](Build%20Failover%20Cluster\Start-Failover-26.png)

![](Build%20Failover%20Cluster\Start-Failover-27.png)

給 DTC 的名稱 
Name:WIN-DTC 
IP:192.168.75.50

![](Build%20Failover%20Cluster\Start-Failover-28.png)

選取 1G 大小的 iSCSI virtual disk
![](Build%20Failover%20Cluster\Start-Failover-29.png)

![](Build%20Failover%20Cluster\Start-Failover-30.png)

![](Build%20Failover%20Cluster\Start-Failover-31.png)

![](Build%20Failover%20Cluster\Start-Failover-32.png)


接下來，就是設定SQL Server 2012 Cluster。
因為目前的Owner Server是SQL-B，所以就在SQL-B中安裝，

![](Build%20Failover%20Cluster\Install-SQL2012-00.png)

選取

![](Build%20Failover%20Cluster\Install-SQL2012-01.png)

![](Build%20Failover%20Cluster\Install-SQL2012-02.png)

假如你有這種警告
![](Build%20Failover%20Cluster\Install-SQL2012-03.png)

進入網路控制台
![](Build%20Failover%20Cluster\Install-SQL2012-04.png)

讓Panel 顯示 Menu 選單 (File Edit View Tools Advanced Help)

![](Build%20Failover%20Cluster\Install-SQL2012-05.png)

選取 Advanced Settings...

![](Build%20Failover%20Cluster\Install-SQL2012-06.png)

把iSCSI 網路卡往上移動到第一個

![](Build%20Failover%20Cluster\Install-SQL2012-07.png)

檢查沒問題之後, 點取下一步

![](Build%20Failover%20Cluster\Install-SQL2012-08.png)

![](Build%20Failover%20Cluster\Install-SQL2012-09.png)

![](Build%20Failover%20Cluster\Install-SQL2012-10.png)

![](Build%20Failover%20Cluster\Install-SQL2012-11.png)

![](Build%20Failover%20Cluster\Install-SQL2012-12.png)

![](Build%20Failover%20Cluster\Install-SQL2012-13.png)

![](Build%20Failover%20Cluster\Install-SQL2012-14.png)

![](Build%20Failover%20Cluster\Install-SQL2012-15.png)

剛剛設定到了50, 所以這裡IP設定為192.168.75.60

![](Build%20Failover%20Cluster\Install-SQL2012-16.png)

因為測試, 所以直接給domain 的administrator 帳號

![](Build%20Failover%20Cluster\Install-SQL2012-17.png)

目前iSCSI Virtual Disk 有 G: H:

![](Build%20Failover%20Cluster\Install-SQL2012-18.png)

確認一下資料庫資料是存放在iSCSI Virtual Disk G:

![](Build%20Failover%20Cluster\Install-SQL2012-19.png)

![](Build%20Failover%20Cluster\Install-SQL2012-20.png)

![](Build%20Failover%20Cluster\Install-SQL2012-21.png)

![](Build%20Failover%20Cluster\Install-SQL2012-22.png)

![](Build%20Failover%20Cluster\Install-SQL2012-23.png)

確認安裝完成了!

![](Build%20Failover%20Cluster\Install-SQL2012-24.png)

![](Build%20Failover%20Cluster\Install-SQL2012-25.png)

SQL-B中的SQL Server 2012 Cluster裝好了之後，要到SQL-A加進去Cluster之中。

![](Build%20Failover%20Cluster\Install-SQL2012-26.png)

![](Build%20Failover%20Cluster\Install-SQL2012-27.png)

![](Build%20Failover%20Cluster\Install-SQL2012-28.png)

確認為this node:SQL-A

![](Build%20Failover%20Cluster\Install-SQL2012-29.png)

它會自動找到 failover cluster IP

![](Build%20Failover%20Cluster\Install-SQL2012-30.png)

![](Build%20Failover%20Cluster\Install-SQL2012-31.png)

![](Build%20Failover%20Cluster\Install-SQL2012-32.png)

安裝完成後，可將SQL Server(原本在SQL-B) 移到SQL-A，看看是否會OK!

![](Build%20Failover%20Cluster\Install-SQL2012-33.png)

![](Build%20Failover%20Cluster\Install-SQL2012-35.png)

可以發現原本SQL-A 的 SQL 服務沒有啟動, 這個時候就會啟動了

![](Build%20Failover%20Cluster\Install-SQL2012-34.png)

到SQL-DC 打開 DNS Manager, 可以確認所有

![](Build%20Failover%20Cluster\Install-SQL2012-36.png)

Open VMWare -> Edit -> Virtual Network Editor

新增

![](Build%20Failover%20Cluster\Install-SQL2012-37.png)

