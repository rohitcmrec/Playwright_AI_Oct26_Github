# Why Playwright Feels Faster Than Selenium: Explained Simply

A plain-language walkthrough of the article "Why does Playwright feel faster than Selenium? A byte-level comparison" by Naveen Khunteta (July 2026).

## 1. The TL;DR

Both tools do the same job, but Playwright feels faster because it sends much less traffic to control the browser. For the same login test, Selenium makes about 21 HTTP requests and Playwright sends 5 WebSocket messages. The article says most of a test's time goes into back-and-forth messaging, not the browser itself.

## 2. Two protocols, two philosophies

A **protocol** is the set of rules your test code uses to talk to the browser.

- **Selenium** uses the W3C WebDriver protocol. Every command ("find this", "click that") is a separate HTTP request to a small helper program (chromedriver or geckodriver), which passes it to the browser and sends an answer back.
- **Playwright** opens one connection (a WebSocket) at the start and keeps it open. After that, each command is just one small message.

Both end up controlling the same kinds of browsers. The difference is how your test talks to the helper.

## 3. What Selenium sends for one click

To click a button, Selenium needs two requests:

1. "Find the element `#submit`", which returns a reference ID.
2. "Click the element with that ID."

Each request comes with extra text (headers like Host, User-Agent and Content-Type), so about 800 bytes travel across two round trips for one click.

## 4. What Playwright sends for the same click

Playwright sends one message: "click `#submit`." The driver finds the element, waits until it can be clicked, and clicks it. One reply comes back. That is about 142 bytes and one round trip, with almost no extra headers.

Two things to notice:

- Playwright's click is **atomic**: find, wait and click happen as one command.
- WebSocket messages have a tiny header (2 to 14 bytes), while HTTP carries hundreds of bytes of overhead.

## 5. The login test comparison

The article runs the same flow in both tools: open the login page, type an email, type a password, click submit, wait for the dashboard.

- **Selenium:** 21 requests. Nine of them are find, click and type steps. The rest are about 12 polling requests that keep asking "is the dashboard there yet?"
- **Playwright:** 5 messages, one per step.

The article's math is that each message costs one network round trip. At 5 ms per trip (local), that is 105 ms vs 25 ms. On a remote grid at 50 ms per trip, it is 1,050 ms vs 250 ms. So the gap grows when the browser is far away.

## 6. The comparison table

It repeats the numbers: about 4x fewer round trips, about 10x fewer bytes, and the same 4x gap in network time. It also notes that Selenium's waiting happens in your test code, while Playwright's happens inside the driver. And Selenium pays HTTP overhead on every command, even with keep-alive, while Playwright pays once at the start.

## 7. Seven reasons it feels faster

1. **Fewer round trips per command.** Playwright merges find, wait and act into one step, and every merged step is a trip not made.
2. **No HTTP overhead.** Selenium has to build and parse headers on every command. WebSocket skips that after the first handshake.
3. **Auto-wait in the driver vs polling in your test.** In Selenium, your test asks "is it ready?" every 500 ms, and each question is a round trip. In Playwright you send one command and the waiting happens on the driver side, not in your test code, so your test sends no repeated "is it ready?" requests. Playwright's docs say it auto-waits until the element checks pass (attached, visible, stable, receives events, enabled) and only then performs the action, failing with a TimeoutError if the timeout runs out. The article calls this the biggest factor and claims 30 to 60% of a Selenium test's time can go to waiting and polling.
4. **One persistent connection.** HTTP connections can close and reopen, and each new one needs a TCP setup. WebSocket sets up once and stays open.
5. **Two-way events.** Playwright's driver can push news to your test, such as "page loaded", "dialog opened" or "download started". Selenium can only answer when asked, so your test has to keep checking.
6. **Cheap browser contexts.** A context is an isolated browser profile with its own cookies and storage, like an incognito window. Playwright creates one in tens of milliseconds, while Selenium often has to launch a whole new browser session, which takes seconds. Cheap isolation makes every test independent.
7. **Built-in parallelism.** Playwright's test runner starts several workers by default, each with its own context. Selenium can run in parallel too, but you have to set it up, and sharing sessions or grids adds coordination work.

## 8. Where Selenium is equal or better

- **Real-browser testing.** Selenium drives the actual browsers through their official drivers. Playwright uses patched builds of Firefox and WebKit, which are very close but not identical to what users run. For strict cross-browser certification, Selenium is more literal.
- **Remote grids and cloud services.** BrowserStack, Sauce Labs, LambdaTest and Selenium Grid have spent years optimizing for HTTP-based WebDriver. Playwright can run remotely too, but support is less standardized.
- **Ecosystem and languages.** Selenium supports Java, Python, JavaScript, C#, Ruby, Kotlin and PHP. Playwright supports JavaScript/TypeScript, Python, Java and .NET. If you use Ruby, for example, Selenium is your choice.
- **Easy debugging.** Selenium's traffic is plain HTTP, so tools like Fiddler, Charles or mitmproxy can show exactly what was sent. WebSocket traffic is harder to inspect.
- **Legacy apps.** If your app must run on IE11, only Selenium can do it. Playwright doesn't support old browsers.

## 9. The migration checklist

| Your situation | Advice |
|---|---|
| Brand-new project | Start with Playwright |
| 500+ working Selenium tests in Java or Python | Don't migrate; the cost outweighs the speed gain |
| Pipeline is painfully slow | Migrate gradually, starting with the slowest 20% of tests |
| Cross-browser certification matters (banking, regulated industries) | Stay with Selenium and real drivers |
| Modern single-page app in TypeScript | Playwright |
| Team already writes JavaScript or TypeScript | Playwright |
| Non-JS team with a mature Selenium framework | Stay on Selenium 4; the W3C protocol has closed most of the gap |

## 10. The takeaway

Playwright's speed comes from its design: a persistent WebSocket, atomic commands and driver-side waiting. Together these mean fewer bytes, fewer round trips and less polling, and the gains grow on remote grids and CI machines where each round trip is slower.

This doesn't make Selenium "slow." It is simple and standardized, and that standardization is why so many vendors can build grids around it. Playwright gets its speed by controlling both ends of the connection itself, which is a trade-off, not a pure upgrade.

## 11. The closing note

The article ends by saying that "Why does Playwright feel faster than Selenium?" is a common senior SDET interview question in 2026, and it points to its own site for practice.

## A caution about the numbers

The article's numbers are illustrative. They are inconsistent in places (8,280 vs ~10.5 KB, and 7x vs 10x), and network time alone (about 105 ms vs 25 ms locally) can't explain a login test dropping from 4 s to 1.2 s. The bigger real-world effects are probably the auto-waiting and the cheap contexts and parallelism. The overall direction is right, but don't quote the exact figures as hard benchmarks.

## Interview-ready summary

*"Playwright uses a persistent WebSocket with atomic, auto-waiting commands, so it makes fewer round trips and avoids client-side polling. Selenium uses one HTTP request per command, which is simple and standardized but chattier."*

## Source

- Playwright auto-waiting (actionability) docs: https://playwright.dev/docs/actionability
