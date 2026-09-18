import puppeteer from "puppeteer-core";
const [url, out, size = "900", scale = "2"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"],
});
const page = await browser.newPage();
page.on("console", (m) => console.log("[console]", m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
await page.setViewport({ width: +size, height: +size, deviceScaleFactor: +scale });
await page.goto(url, { waitUntil: "load" });
try {
  await page.waitForFunction(() => document.title === "DONE", { timeout: 60000 });
} catch { console.log("timed out waiting for DONE"); }
const log = await page.evaluate(() => document.getElementById("log")?.textContent ?? "");
if (log) console.log(log);
await page.screenshot({ path: out });
await browser.close();
