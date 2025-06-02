const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://news.ycombinator.com/newest");

  
  let articles = [];
  while (articles.length < 100) {
    await page.waitForSelector('.itemlist');
    const newArticles = await page.$$eval('.itemlist tr.athing', rows =>
      rows.map(row => ({
        id: row.getAttribute('id'),
      }))
    );

    const timestamps = await page.$$eval('.itemlist span.age a', elements =>
      elements.map(el => el.getAttribute('href'))
    );

    articles.push(...timestamps);
    if (articles.length < 100) {
      await Promise.all([
        page.waitForNavigation(),
        page.click('a.morelink')
      ]);
    }
  }

 
  const articleIds = articles.slice(0, 100);
  
  const times = await Promise.all(articleIds.map(async (href) => {
    const url = `https://news.ycombinator.com/${href}`;
    const timePage = await context.newPage();
    await timePage.goto(url);
    const unixTime = await timePage.$eval('td[align=right] > span.age', el => el.getAttribute('title'));
    await timePage.close();
    return new Date(unixTime).getTime();
  }));

  const isSorted = times.every((val, i, arr) => i === 0 || arr[i - 1] >= val);

  if (isSorted) {
    console.log("The first 100 articles are sorted from newest to oldest.");
  } else {
    console.error("The articles are NOT sorted from newest to oldest.");
  }

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
