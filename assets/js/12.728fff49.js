(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{397:function(e,t,a){"use strict";a.r(t);var n=a(0),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"dotnet-core"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dotnet-core","aria-hidden":"true"}},[e._v("#")]),e._v(" DotNet Core")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("在Asp.net Core 中引用dll，以往我們引用DLL 都是直接引用，\n在Core 裡這樣是不行的，必須基於NuGet 添加，或者基於project.json 添加")])]),e._v(" "),a("li",[a("p",[e._v("Core 裡使用Session 需要添加Session package")])])]),e._v(" "),a("blockquote",[a("p",[e._v("nuget Microsoft.AspNetCore.Session")])]),e._v(" "),a("p",[e._v("在Startup.cs 中增加以下程式碼")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public void ConfigureServices(IServiceCollection services)\n{\n\tservices.AddMvc();\n\tservices.AddSession(); \n}\n\npublic void Configure(IApplicationBuilder app){\n    app.UseSession();\n}\n")])])]),a("p",[e._v("在Controller 中")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('using Microsoft.AspNetCore.Http;\n\npublic IActionResult Index()\n{\n\tHttpContext.Session.SetString("key", "123456");\n\treturn View();  \n}\n')])])]),a("p",[e._v("如果不是在Controller 裡，你可以注入IHttpContextAccessor")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public class SomeOtherClass\n{\n   IHttpContextAccessor _httpContextAccessor;\n   ISession _session => _httpContextAccessor.HttpContext.Session;\n\n   public SomeOtherClass(IHttpContextAccessor httpContextAccessor){\n      _httpContextAccessor = httpContextAccessor;\n\t}\n\n   public void Set() {\n      _session.SetString("key", "123456");\n   }\n}\n')])])]),a("h3",{attrs:{id:"使用sql-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用sql-server","aria-hidden":"true"}},[e._v("#")]),e._v(" 使用SQL Server")]),e._v(" "),a("blockquote",[a("p",[e._v("nuget Microsoft.Extensions.Caching.SqlServer")])]),e._v(" "),a("p",[e._v("Startup.cs")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('services.AddSqlServerCache(o =>\n{\n    o.ConnectionString = " Server=.;Database=ASPNET5SessionState;Trusted_Connection=True; " ;\n    o.SchemaName = " dbo " ;\n    o.TableName = " Sessions " ;\n});\n')])])]),a("h3",{attrs:{id:"使用redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用redis","aria-hidden":"true"}},[e._v("#")]),e._v(" 使用Redis")]),e._v(" "),a("blockquote",[a("p",[e._v("nuget Microsoft.Extensions.Caching.Redis")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("services.AddSingleton<IDistributedCache, RedisCache>();\n")])])]),a("h2",{attrs:{id:"內建di"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#內建di","aria-hidden":"true"}},[e._v("#")]),e._v(" 內建DI")]),e._v(" "),a("p",[e._v("在ASP.NET Core中有內置的DI容器有三種選擇")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Singleton\n意味著只創建一個實例. 該實例在需要它的所有組件之間共享. 因此始終使用相同的實例.")])]),e._v(" "),a("li",[a("p",[e._v("Scoped\n作用域意味著每個作用域創建一次實例. 每個對應用程序的請求都創建一個作用域，因此，每個請求都會創建一次註冊為作用域的組件。")])]),e._v(" "),a("li",[a("p",[e._v("Transient\n每次請求時都會創建瞬態組件，並且永遠不會共享.")])])]),e._v(" "),a("p",[e._v("Startup.cs")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public void ConfigureServices(IServiceCollection services) {\n\tservices.AddSingleton(typeof(SomeOtherClass \n));\n")])])]),a("p",[e._v("以下是新增Transient 的寫法")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("services.Add(new ServiceDescriptor(typeof(IDataService), typeof(DataService), ServiceLifetime.Transient));\n}\n")])])]),a("p",[e._v("可以簡化成下面")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("services.AddTransient<IDataService, DataService>();\nservices.AddTransient<DataService>();\n")])])]),a("p",[e._v("或者你也可以使用")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("services.AddTransient<IDataService, DataService>((ctx) =>\n{\n    IOtherService svc = ctx.GetService<IOtherService>();\n    //IOtherService svc = ctx.GetRequiredService<IOtherService>();\n    return new DataService(svc);\n});\n")])])]),a("h3",{attrs:{id:"injection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#injection","aria-hidden":"true"}},[e._v("#")]),e._v(" Injection")]),e._v(" "),a("p",[e._v("最基本的寫法如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public class LoggingMiddleware\n{\n    private readonly RequestDelegate _next;\n\n    public LoggingMiddleware(RequestDelegate next)\n    {\n        _next = next;\n    }\n\n    public async Task Invoke(HttpContext ctx)\n    {\n        Debug.WriteLine("Request starting");\n        await _next(ctx);\n        Debug.WriteLine("Request complete");\n    }\n}\n')])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public class LoggingMiddleware\n{\n    readonly RequestDelegate _next;\n    readonly IDataService _svc;\n\n    public LoggingMiddleware(RequestDelegate next, IDataService svc)\n    {\n        _next = next;\n        _svc = svc;\n    }\n\n    public async Task Invoke(HttpContext ctx, IDataService svc2)\n    {\n        <b>IDataService svc3 = ctx.RequestServices.GetService<IDataService>();\n\t\t  </b>\n        Debug.WriteLine("Request starting");\n        await _next(ctx);\n        Debug.WriteLine("Request complete");\n    }\n}\n')])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public void Configure(IApplicationBuilder app) {\n\n\tIDataService dataSvc2 = app.ApplicationServices.GetService<IDataService>();\n\n\tapp.Use((ctx, next) =>\n\t{\n\t\tIDataService svc = ctx.RequestServices.GetService<IDataService>();\n\t\treturn next();\n\t});\n\n\tapp.Map("/test", subApp =>\n\t{\n\t\tIDataService svc1 = subApp.ApplicationServices.GetService<IDataService>();\n\t\tsubApp.Run((context =>\n\t\t{\n\t\t\tIDataService svc2 = context.RequestServices.GetService<IDataService>();\n\t\t\treturn context.Response.WriteAsync("Hello!");\n\t\t}));\n\t});\n\n\tapp.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/test2"), subApp =>\n\t{\n\t\tIDataService svc1 = subApp.ApplicationServices.GetService<IDataService>();\n\t\tsubApp.Run(ctx =>\n\t\t{\n\t\t\tIDataService svc2 = ctx.RequestServices.GetService<IDataService>();\n\t\t\treturn ctx.Response.WriteAsync("Hello!");\n\t\t});\n\t});\n}\n')])])]),a("h2",{attrs:{id:"injection-in-mvc-core"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#injection-in-mvc-core","aria-hidden":"true"}},[e._v("#")]),e._v(" Injection in MVC Core")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public class HomeController : Controller\n{\n    private readonly IDataService _dataService;\n\n    public HomeController(IDataService dataService)\n    {\n        _dataService = dataService;\n    }\n\n    [HttpGet]\n    public IActionResult Index([FromServices] IDataService dataService2)\n    {\n        IDataService dataService3 = HttpContext.RequestServices.GetService<IDataService>();\n        return View();\n    }\n}\n")])])]),a("h2",{attrs:{id:"razor-views"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#razor-views","aria-hidden":"true"}},[e._v("#")]),e._v(" Razor views")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("@using Microsoft.AspNetCore.Mvc.Localization\n@inject IViewLocalizer Localizer\n")])])]),a("h2",{attrs:{id:"tag-helpers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tag-helpers","aria-hidden":"true"}},[e._v("#")]),e._v(" Tag helpers")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('[HtmlTargetElement("test")]\npublic class TestTagHelper : TagHelper\n{\n    private readonly IDataService _dataService;\n\n    public TestTagHelper(IDataService dataService)\n    {\n        _dataService = dataService;\n    }\n}\n')])])]),a("h2",{attrs:{id:"view-components"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#view-components","aria-hidden":"true"}},[e._v("#")]),e._v(" View Components")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public class TestViewComponent : ViewComponent\n{\n    private readonly IDataService _dataService;\n\n    public TestViewComponent(IDataService dataService)\n    {\n        _dataService = dataService;\n    }\n\n    public async Task<IViewComponentResult> InvokeAsync()\n    {\n        return View();\n    }\n}\n")])])]),a("h2",{attrs:{id:"filters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filters","aria-hidden":"true"}},[e._v("#")]),e._v(" Filters")]),e._v(" "),a("p",[e._v("MVC filters also support constructor injection, as well as having access to RequestServices:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public class TestActionFilter : ActionFilterAttribute\n{\n    private readonly IDataService _dataService;\n\n    public TestActionFilter(IDataService dataService)\n    {\n        _dataService = dataService;\n    }\n\n    public override void OnActionExecuting(ActionExecutingContext context)\n    {\n        Debug.WriteLine("OnActionExecuting");\n    }\n\n    public override void OnActionExecuted(ActionExecutedContext context)\n    {\n        Debug.WriteLine("OnActionExecuted");\n    }\n}\n')])])]),a("p",[e._v("However, we can't add the attribute as usual on a controller since it has to get dependencies at runtime.")]),e._v(" "),a("p",[e._v("We have these two options for adding it on controller- or action level:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[TypeFilter(typeof(TestActionFilter))]\npublic class HomeController : Controller\n{\n}\n// or\n[ServiceFilter(typeof(TestActionFilter))]\npublic class HomeController : Controller\n{\n}\n")])])]),a("p",[e._v("The key difference is that TypeFilterAttribute will figure out what are the filters dependencies, fetches them through DI, and creates the filter. ServiceFilterAttribute on the other hand attempts to find the filter from the service collection!")]),e._v(" "),a("p",[e._v("To make [ServiceFilter(typeof(TestActionFilter))] work, we need a bit more configuration:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public void ConfigureServices(IServiceCollection services)\n{\n    services.AddTransient<TestActionFilter>();\n}\n")])])]),a("p",[e._v("Now ServiceFilterAttribute can find the filter.")]),e._v(" "),a("p",[e._v("If you wanted to add the filter globally:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public void ConfigureServices(IServiceCollection services)\n{\n    services.AddMvc(mvc =>\n    {\n        mvc.Filters.Add(typeof(TestActionFilter));\n    });\n}\n")])])]),a("p",[e._v("There is no need to add the filter to the service collection this time, it works as if you had added a TypeFilterAttribute on every controller.")])])}),[],!1,null,null,null);t.default=s.exports}}]);