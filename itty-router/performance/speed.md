### Performance-Tuning
# <u>Performance-Tuning ></u> Speed <u>- itty-router</u>

By their nature, virtually *all* modern routers are extremely performant, and itty-router is no different.  When you see benchmarks measuring routers in ops/sec, keep in mind that all of these effectively translate to ~0ms per request - for example, a router that handles 100,000 ops/sec roughly adds only 0.01ms per request.

## The size of your code matters in serverless applications

Simply put, by decreasing your bundled code size, you speed up requests, allowing lower latency and higher throughput.  This is why libraries like itty-router exist.  Even our most feature-rich router, [`AutoRouter`](/itty-router/routers/autorouter) at 1kB, is a small fraction of the smallest mainstream serverless router today (hono), and MANY times smaller than conventional routers like express.js.  If you need the bells and whistles of a more feature-rich router, we encourage you to explore those - hono, for instance, has done amazing things to support the community with many feature additions.  This generosity does come at a price, however - to the bundlesize.

## Optimization Basics

Here are the basic rules to performance tuning in itty:

1. **Register performance-critical paths first** - Simply registering performance-critical paths ahead of others gives them a chance to match and exit the router faster than other downstream routers.

1. **Nest your API** - The very nature of nesting an API prevents entire branches from being compared.  By dividing your router into chunks (as many levels as you like), *you* control the balance between readability/maintainability and performance.

1. **Exit as early as possible** - The more route-matching takes place, the more overhead that request, and any concurrent requests suffer.  When nesting, while it's convenient to only include a 404 on the root router, by doing so, any miss in a nested router exits the child router and continues to miss routes in the parent until it finally catches the trailing 404.  Simply adding a 404 to the child means the match can enter the child, then terminate with a 404 before trying other routes in the parent.

## Ultra-Tuning

Need to squeeze every ounce of performance out of your API?  We got you - but this isn't for the faint of heart.

1. **Don't use [`withParams`](/itty-router/middleware/withparams)** - It's a nice convenience, but the added `Proxy` layer over the `Request` technically slows things down a tiny bit.

1. **Don't use [`AutoRouter`](/itty-router/routers/autorouter)** - Because it includes [`withParams`](/itty-router/middleware/withparams), but also...

1. **Don't use [`Router`](/itty-router/routers/router) either** - If you're going for max performance, the additions of the `before`, `catch`, and `finally` stages are slower than... none of that.

1. **Use the original [`IttyRouter`](/itty-router/routers/ittyrouter) instead** - The smallest router happens to be the fastest, by simply not including extra processing steps.
