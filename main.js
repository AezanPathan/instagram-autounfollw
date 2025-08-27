// Instagram Unfollow Automation Script

const { PuppeteerCrawler, log } = require("crawlee");
const fs = require("fs");
const path = require("path");

const LOGIN_URL = "https://www.instagram.com/accounts/login/";
const FOLLOWING_URL = "https://www.instagram.com/true.zoneanime/following/";
const COOKIE_PATH = path.resolve(__dirname, "cookies.json");

// Helper function to load cookies
const loadCookies = async (page) => {
  if (fs.existsSync(COOKIE_PATH)) {
    const cookies = JSON.parse(fs.readFileSync(COOKIE_PATH, "utf-8"));
    await page.setCookie(...cookies);
    log.info("Cookies loaded successfully!");
  }
};

// Helper function to save cookies
const saveCookies = async (page) => {
  const cookies = await page.cookies();
    fs.writeFileSync(COOKIE_PATH, JSON.stringify(cookies, null, 2));
    log.info("Cookies saved successfully!");
};

(async () => {
  const crawler = new PuppeteerCrawler({
    maxConcurrency: 1,
    launchContext: {
      launchOptions: {
        headless: false,
        args: ["--start-maximized"],
      },
    },
    requestHandler: async ({ page, request }) => {
      log.info(`Processing URL: ${request.url}`);

      if (request.userData.label === "LOGIN") {
        await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });

        if (!fs.existsSync(COOKIE_PATH)) {
          log.info("Logging in...");
          // Ensure username input is available
          await page.waitForSelector('input[name="username"]', { visible: true });
          await page.type('input[name="username"]', "true.zoneanime", { delay: 100 });

          // Ensure password input is available
          await page.waitForSelector('input[name="password"]', { visible: true });
          await page.type('input[name="password"]', "120402SALIM", { delay: 100 });

          // Ensure submit button is available
          await page.waitForSelector('button[type="submit"]', { visible: true });
          await page.click('button[type="submit"]');

          // Wait for navigation after login
          await page.waitForNavigation({ waitUntil: "networkidle2" });
          await saveCookies(page);
        } else {
          // Load cookies and  
          await loadCookies(page);
          await page.goto(FOLLOWING_URL, { waitUntil: "networkidle2" });
        }
        log.info("Login complete. Navigating to following list...");
      }

      if (request.userData.label === "UNFOLLOW") {
        log.info("Unfollowing users...");
        await page.waitForSelector('a[href*="/following"]', { visible: true });
        await page.click('a[href*="/following"]');

        await page.waitForSelector('div[role="dialog"]', { visible: true });

        let unfollowedCount = 0;

        while (unfollowedCount < 100) {
          try {
            log.info("Looking for unfollow buttons...");
            await page.waitForSelector('[class="_ap3a _aaco _aacw _aad6 _aade"]', { timeout: 20000 });
            const buttons = await page.$$('[class="_ap3a _aaco _aacw _aad6 _aade"]');

            if (!buttons.length) {
              log.info("No more users to unfollow.");
              break;
            }

            for (const button of buttons) {
              if (unfollowedCount >= 20) break;

              log.info(`Unfollowing user #${unfollowedCount + 1}`);
              await button.click();

              await page.waitForSelector('button[class*="_a9--"]', { visible: true });
              await page.click('button[class*="_a9--"]');

              unfollowedCount++;
              log.info(`Unfollowed ${unfollowedCount} users.`);

              // Replace page.waitForTimeout with setTimeout alternative
              await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay
            }

            log.info("Scrolling to load more users...");
            await page.evaluate(() => {
              const dialog = document.querySelector('div[role="dialog"] .isgrP');
              if (dialog) dialog.scrollBy(0, 300);
            });
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Scroll delay
          } catch (error) {
            log.error(`Error during unfollow: ${error.message}`);
            break;
          }
        }

        log.info(`Unfollowed ${unfollowedCount} users successfully.`);
      }
    },
    failedRequestHandler: async ({ request, error }) => {
      log.error(`Request ${request.url} failed: ${error.message}`);
    },
  });

  await crawler.addRequests([
    { url: LOGIN_URL, userData: { label: "LOGIN" } },
    { url: FOLLOWING_URL, userData: { label: "UNFOLLOW" } },
  ]);

  await crawler.run();
})();
