
```
namespace YourNamespace
{
    public class AccessControlAllowOriginHandler : IHttpModule
    {
        public bool IsReusable
        {
            get { return false; }
        }

        public void Dispose()
        {

        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(OnBeginRequest);
        }

        public void OnBeginRequest(object sender, EventArgs e)
        {
            var app = sender as HttpApplication;
            app.Context.Response.Headers.Add("Access-Control-Allow-Origin", "http://www.google.com"}");
        } 
    }
}
```

```
<system.webServer>
    <modules>
        <add name="app" type="Hippo_rc.Models.AccessControlAllowOriginHandler, Hippo-ht" />
    </modules>
</system.webServer>
```

http://nwpie.blogspot.tw/2017/05/10-aspnet-mvc-http-handler-module.html