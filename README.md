Hacker News Sort Validator

This project uses [Microsoft Playwright](https://playwright.dev/) and JavaScript to automate the validation of Hacker News articles.

Objective

Check if the top 100 articles on the [Hacker News Newest](https://news.ycombinator.com/newest) page are sorted from **newest to oldest** based on their posting time.

Features

- Browser automation using Playwright
- Dynamically loads pages until 100 articles are collected
- Extracts and converts timestamp data
- Validates chronological order of posts

How to Run

Terminal
npm install
npx playwright install
node index.js
