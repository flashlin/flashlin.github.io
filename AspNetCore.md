# ASP DOT Core

* 在Asp.net Core 中引用dll，以往我們引用DLL 都是直接引用，
在Core 裡這樣是不行的，必須基於NuGet 添加，或者基於project.json 添加

* Core 裡使用Session 需要添加Session package
> nuget Microsoft.AspNetCore.Session

在Startup.cs 中增加以下程式碼
<pre>
public void ConfigureServices(IServiceCollection services)
{
	services.AddMvc();
	<b>services.AddSession();</b>
}

public void Configure(IApplicationBuilder app){
	<b>app.UseSession();</b>
}
</pre>

在Controller 中
<pre>
using Microsoft.AspNetCore.Http;

public IActionResult Index()
{
	HttpContext.Session.SetString("key", "123456");
	return View();  
}
</pre>

如果不是在Controller 裡，你可以注入IHttpContextAccessor

<pre>
public class SomeOtherClass
{
   IHttpContextAccessor _httpContextAccessor;
   ISession _session => _httpContextAccessor.HttpContext.Session;

   public SomeOtherClass(IHttpContextAccessor httpContextAccessor){
      _httpContextAccessor = httpContextAccessor;
	}

   public void Set() {
      _session.SetString("key", "123456");
   }
}
</pre>

### 使用SQL Server 
> nuget Microsoft.Extensions.Caching.SqlServer

Startup.cs
```
services.AddSqlServerCache(o =>
{
    o.ConnectionString = " Server=.;Database=ASPNET5SessionState;Trusted_Connection=True; " ;
    o.SchemaName = " dbo " ;
    o.TableName = " Sessions " ;
});
```

### 使用Redis

> nuget Microsoft.Extensions.Caching.Redis

```
services.AddSingleton<IDistributedCache, RedisCache>();
```

## 內建DI
在ASP.NET Core中有內置的DI容器有三種選擇
* Singleton 
意味著只創建一個實例. 該實例在需要它的所有組件之間共享. 因此始終使用相同的實例.

* Scoped 
作用域意味著每個作用域創建一次實例. 每個對應用程序的請求都創建一個作用域，因此，每個請求都會創建一次註冊為作用域的組件。

* Transient
每次請求時都會創建瞬態組件，並且永遠不會共享.


Startup.cs
<pre>
public void ConfigureServices(IServiceCollection services) {
	services.AddSingleton(typeof(SomeOtherClass 
));
</pre>

以下是新增Transient 的寫法
```
services.Add(new ServiceDescriptor(typeof(IDataService), typeof(DataService), ServiceLifetime.Transient));
}
```

可以簡化成下面
```
services.AddTransient<IDataService, DataService>();
services.AddTransient<DataService>();
```

或者你也可以使用
```
services.AddTransient<IDataService, DataService>((ctx) =>
{
    IOtherService svc = ctx.GetService<IOtherService>();
    //IOtherService svc = ctx.GetRequiredService<IOtherService>();
    return new DataService(svc);
});
```

### Injection

最基本的寫法如下
```
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext ctx)
    {
        Debug.WriteLine("Request starting");
        await _next(ctx);
        Debug.WriteLine("Request complete");
    }
}
```


<pre>
public class LoggingMiddleware
{
    readonly RequestDelegate _next;
    readonly IDataService _svc;

    public LoggingMiddleware(RequestDelegate next, IDataService svc)
    {
        _next = next;
        _svc = svc;
    }

    public async Task Invoke(HttpContext ctx, IDataService svc2)
    {
        <b>IDataService svc3 = ctx.RequestServices.GetService<IDataService>();
		  </b>
        Debug.WriteLine("Request starting");
        await _next(ctx);
        Debug.WriteLine("Request complete");
    }
}
</pre>

<pre>
public void Configure(IApplicationBuilder app) {

	IDataService dataSvc2 = app.ApplicationServices.GetService<IDataService>();

	app.Use((ctx, next) =>
	{
		IDataService svc = ctx.RequestServices.GetService<IDataService>();
		return next();
	});

	app.Map("/test", subApp =>
	{
		IDataService svc1 = subApp.ApplicationServices.GetService<IDataService>();
		subApp.Run((context =>
		{
			IDataService svc2 = context.RequestServices.GetService<IDataService>();
			return context.Response.WriteAsync("Hello!");
		}));
	});

	app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/test2"), subApp =>
	{
		IDataService svc1 = subApp.ApplicationServices.GetService<IDataService>();
		subApp.Run(ctx =>
		{
			IDataService svc2 = ctx.RequestServices.GetService<IDataService>();
			return ctx.Response.WriteAsync("Hello!");
		});
	});
}
</pre>

## Injection in MVC Core
<pre>
public class HomeController : Controller
{
    private readonly IDataService _dataService;

    public HomeController(IDataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public IActionResult Index([FromServices] IDataService dataService2)
    {
        IDataService dataService3 = HttpContext.RequestServices.GetService<IDataService>();
        return View();
    }
}
</pre>

## Razor views
```
@using Microsoft.AspNetCore.Mvc.Localization
@inject IViewLocalizer Localizer
```

## Tag helpers
```
[HtmlTargetElement("test")]
public class TestTagHelper : TagHelper
{
    private readonly IDataService _dataService;

    public TestTagHelper(IDataService dataService)
    {
        _dataService = dataService;
    }
}
```

## View Components
```
public class TestViewComponent : ViewComponent
{
    private readonly IDataService _dataService;

    public TestViewComponent(IDataService dataService)
    {
        _dataService = dataService;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        return View();
    }
}
```


## Filters
MVC filters also support constructor injection, as well as having access to RequestServices:

```
public class TestActionFilter : ActionFilterAttribute
{
    private readonly IDataService _dataService;

    public TestActionFilter(IDataService dataService)
    {
        _dataService = dataService;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        Debug.WriteLine("OnActionExecuting");
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        Debug.WriteLine("OnActionExecuted");
    }
}
```

However, we can't add the attribute as usual on a controller since it has to get dependencies at runtime.

We have these two options for adding it on controller- or action level:

```
[TypeFilter(typeof(TestActionFilter))]
public class HomeController : Controller
{
}
// or
[ServiceFilter(typeof(TestActionFilter))]
public class HomeController : Controller
{
}
```

The key difference is that TypeFilterAttribute will figure out what are the filters dependencies, fetches them through DI, and creates the filter. ServiceFilterAttribute on the other hand attempts to find the filter from the service collection!

To make [ServiceFilter(typeof(TestActionFilter))] work, we need a bit more configuration:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddTransient<TestActionFilter>();
}
```
Now ServiceFilterAttribute can find the filter.

If you wanted to add the filter globally:
```
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(mvc =>
    {
        mvc.Filters.Add(typeof(TestActionFilter));
    });
}
```
There is no need to add the filter to the service collection this time, it works as if you had added a TypeFilterAttribute on every controller.