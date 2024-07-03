using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
namespace MyMiddleware;

public class MyLogMiddleware
{
    private readonly RequestDelegate next;

    private string? filePath;

    public MyLogMiddleware(RequestDelegate next)
    {
        this.next = next;

    }

    public async Task Invoke(HttpContext c, IWebHostEnvironment webHost)
    {
        var sw = new Stopwatch();
        sw.Start();
        await next.Invoke(c);
        this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "Logim.txt");
        File.AppendAllText(filePath, JsonSerializer.Serialize($"{c.Request.Path}.{c.Request.Method} took {sw.ElapsedMilliseconds}ms."
        + $" User: {c.User?.FindFirst("Name")?.Value ?? "unknown"}" + "\n"));
    }
}

public static partial class MiddlewareExtensions
{
    public static IApplicationBuilder UseMyLogMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<MyLogMiddleware>();
    }
}

