# OWASP TOP 10

由七家專業應用安全公司提供, 資料涵蓋上百家組織, 上千個應用. 分析超過50 萬個漏洞.

OWASP TOP 10 

* 是一份認知文件, 不是一份標準(Standard).
* 它是關於風險不是漏洞, 前十名最關鍵Web 應用程式安全風險

通過找出企業組織面臨的最嚴重風險來提高開發人員對應用程式安全性的關注度.


# 2013-A1 SQL 資料隱碼攻擊(SQL Injection)

### 舉例而言

若我們透過字串語法去組成 SQL Query statement 以供訪問者作產品查詢，範例語法如下

```
sql_query = "SELECT ProductName, ProductDescription FROM Products WHERE ProductNumber = " & Request.QueryString("ProductID")
```

假設擷取產品編號為 123 的產品，則上面的 Query 將會列出產品編號為 123 之產品名稱及描述。

但若是將網址改為
```
http://www.mydomain.com/products/products.asp?productid=123 or 1=1
```

由於條件式 1=1 恆真，則會讓 Products Table 中所有的產品名稱及描述通通都列出來



### Authorization Bypass (略過權限檢查)

```
$"SELECT * FROM customers WHERE name = '{name}' AND password = '{password}'"
```

statment 中有兩個 input 值 name 與 password，會有兩個可供使用者輸入值的方塊，但是有心的攻擊者當然不會乖乖的輸入帳號及密碼囉！！透過在 '{name}' 所對應的方塊內輸入

```
'OR 1=1 --
```

會使得 Query statement 變為

```
"SELECT * FROM customers WHERE name =''OR 1=1
```

使得攻擊者可以在不被驗證帳號密碼前提下登入系統。


### Injecting SQL Sub-Statements into SQL Queries

攻擊者可以在注入惡意的 SQL 的語法去改變資料庫，如在本文一開始的範例中，加入一段 malicious commands

```
http://www.mydomain.com/products/products.asp?productid=123; DROP TABLE Products
```

或是進一步去探索其他 table 中的資料，如下方的 SQL Query：

```
http://www.mydomain.com/products/products.asp?productid=123 UNION SELECT Username, Password FROM USERS
```

### Exploiting Stored Procedures

Stored Procedures（預存程序）是將又臭又長又常用的 SQL 語法寫成一組程序並儲存起來，以供後續呼叫相同程序時不必再將完整個 SQL 語法重打一次，攻擊者亦可透過呼叫這些 Stored Procedures 進而對 DataBase 進行攻擊，如下：

```
SomeAsp.asp?city=pune';EXEC master.dbo.xp_cmdshell' cmd.exe dir c:
```

### 如何防範

* 使用 Regular expression 驗證過濾輸入值與參數中惡意代碼，將輸入值中的單引號置換為雙引號。
* 限制輸入字元格式並檢查輸入長度。
* 資料庫設定使用者帳號權限，限制某些管道使用者無法作資料庫存取。
* 使用 SqlCommand 取代組字串



# 2013-A5 Security Misconfiguration (安全配置錯誤)

Web 應用程式依賴於一個安全的基礎架構下運作. (作業系統, Web伺服器, App伺服器, 資料庫, 框架), 組態的影響通常是全面性

### 攻擊案例

### 案例1

應用程序服務器管理員控制台自動安裝後沒有
被刪除。而默認帳戶也沒有被改變。攻擊者在你的服務器
上發現了標準的管理員頁面，通過默認密碼登錄，從而接
管了你的服務器。

### 案例2
目錄列表在你的服務器上未被禁用。攻擊者發
現在只需列出目錄，她就可以找到你服務器上的任意文件。攻擊者找到並下載所有已編譯的Java類，她通過反編譯獲取
得了所有你的自定義代碼。然後，她在你的應用程序中找
到一個訪問控制的嚴重漏洞。

### 案例3
應用服務器配置允許堆棧跟踪返回給用戶，這
樣就暴露了潛在的漏洞。攻擊者熱衷於收集錯誤消息裡ᨀ
供的額外信息。

### 案例4
應用服務器自帶的示例應用程序沒有從您的生
產服務器中刪除。該示例應用有已知安全漏洞，攻擊者可
以利用這些漏洞破壞您的服務器

### 我如何防止？

主要的建議在以下幾個方面：

* 一個可以快速且易於部署在鎖定環境的可重
復的加固過程。開發和生產環境都應該配
置相同（每個環境中使用不同的密碼）。這個過程應
該是自動化的，以盡量減少安裝一個新安全環境的耗
費。

* 是否安裝或啟用不必要的功能? 
* 預設帳號或預設密碼是否依然可用?
* 錯誤訊息是否含有大量的DEBUG資訊?
* 你的開發框架（例如: Struts, Spring, ASP.NET）和
文件中的安全設置是否理解正確並配置恰當。

* 一個能及時了解並部署每個環境的所有最新
系統更新。

* 實施漏洞掃描和經常進行審計以幫助檢測將來可能
的錯誤配置或沒有安裝的補丁。


# 2013-A9 使用含有已知漏洞的組件

幾乎每個應用程式都有這些問題, 大多數開發團隊並不側重於確保他們的元件或函式庫都是最新的. 也不介意它們的版本

* 由專人定期檢查, 看看函式庫是否過時?
* 如有任何過時元件, 但不想升級, 請檢察是否有已知安全問題漏洞資料
