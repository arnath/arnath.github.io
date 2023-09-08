---
title: Standalone HTTP client factory for .NET Core and .NET Standard
description:
  Standalone HTTP client factory for .NET Core and .NET Standard with no ASP.NET
  Core dependencies.
date: 2020-02-10
published: false
---

**TL;DR:** Install the [Arnath.StandaloneHttpClientFactory][nuget] NuGet package
and follow the usage instructions [here][github].

I was reading some stuff about .NET Core recently and stumbled across a
reference to the `IHttpClientFactory` interface that was introduced as part of
.NET Core 2.1. I got really excited when I found it because the default .NET
`HttpClient` class has a bunch of non-obvious issues that can cause some serious
problems when used in an application that makes a lot of requests (like a web
service). However, I was quickly disappointed to find that it, like many of
Microsoft's recent web-related .NET Core developments, was totally tied into
ASP.NET Core and its dependency injection framework. After doing some digging
about whether there was a standalone implementation and failing to find one, I
decided to write my own.

### Issues with HttpClient

I didn't find out that the .NET `HttpClient` had some weird behavior until a
couple months ago when a coworker pointed it out to me and linked me to this
blog post:
[You're using HttpClient wrong and it is destabilizing your software](https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/).
Basically, when you dispose an `HttpClient` instance, the underlying socket is
not immediately released. If you make a lot of HTTP requests and wrap every call
you make in `using (HttpClient client = new HttpClient())` (which is a totally
reasonable way to think you could use it), this will eventually cause you to run
out of sockets in your OS. To combat this, Microsoft has recommended that (in
.NET Standard and Framework at least), use a single `HttpClient` instance for
the lifetime of your app and don't dispose it until your app exits.

However, if you do this, you can run into a second problem as described in this
[Github issue](https://github.com/dotnet/runtime/issues/18348). The singleton
instance doesn't respect DNS changes meaning that if there's a DNS change prior
to your app exiting, your HTTP requests will eventally just stop working. The
recommended fix for this is to set the `ServicePoint.ConnectionLeaseTimeout`
setting for each URI you try to access which causes active connections to be
closed after a certain amount of time. This will force a DNS refresh and fix
this problem.

### Fixes from Microsoft

The above issues caused the ASP.NET team to make the Microsoft.Extensions.Http
package which contains the `IHttpClientFactory` interface and implementation. At
the same time, the .NET team introduced a class called `SocketsHttpHandler` in
.NET Core 2.1. This handler was built using the Socket APIs and does two major
things that fixes these issues:

- It shares connections across `HttpClient` instances. This prevents the socket
  exhaustion problem.
- It cycles connections according to the `PooledConnectionLifetime` setting.
  This allows it to avoid stale DNS settings.

Therefore, the recommendation from Microsoft was to do the following (see
[here](https://github.com/dotnet/extensions/issues/1345#issuecomment-480548175)):

- If you're using ASP.NET Core, use `IHttpClientFactory`.
- If you're using .NET Core but not ASP.NET, create a single instance of
  `SocketsHttpHandler` when the app starts, configure a
  `PooledConnectionLifetime`, and then create `HttpClient` instances using
  `new HttpClient(handler, disposeHandler: false)` as needed.
- If you're using .NET Standard or Framework, create a single instance of
  `HttpClient` and set `ServicePoint.ConnectionLeaseTimeout` for each endpoint.

This resulted in a situation where your options were either take on all the
dependencies and magic of ASP.NET Core or manually implement some weird,
per-framework logic that was different than every other `IDisposable`.

### StandaloneHttpClientFactory

To make this easier, I wrote a little library called
[Arnath.StandaloneHttpClientFactory][nuget]. The library creates its own version
of `IHttpClientFactory` and an implementation called
`StandaloneHttpClientFactory` that implements the behavior above. If you use the
library in .NET Core, it creates a single lazy instance of `SocketsHttpHandler`
and uses it to create new `HttpClient` instances every time you call
`IHttpClientFactory.CreateClient()`. If you use it in .NET Standard, it creates
a single instance of `HttpClient` and a custom handler that sets
`ServicePoint.ConnectionLeaseTimeout` for every request (if it has not already
been set). It also creates a wrapper that handles the `Dispose` behavior
correctly so you can happily do this for every single HTTP request:

```csharp
IHttpClientFactory httpClientFactory = new StandaloneHttpClientFactory();
using (HttpClient client = httpClientFactory.CreateClient())
{
    // Use the client.
}
```

You should create the factory when your app starts and call `Dispose` on it when
your app exits. You can use the library by downloading the [NuGet
package][nuget] or checking out the source code on [Github][github]. There's
also some more detailed usage instructions on the GitHub page.

### Conclusion

Hopefully this makes it easier for you to use `HttpClient` in .NET. I found a
cool blog post
[here](https://www.stevejgordon.co.uk/httpclient-connection-pooling-in-dotnet-core)
that goes into more detail on all this stuff. Let me know in the comments if you
have any issues or find any bugs (or open issues on GitHub).

[nuget]: https://www.nuget.org/packages/Arnath.StandaloneHttpClientFactory
[github]: https://github.com/arnath/standalone-httpclientfactory
