
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

let browser;
let page;

before(async () => {
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
});

async function openGame() {
  page = await browser.newPage();

  const gameUrl = pathToFileURL(
    path.resolve(__dirname, '../index.html')
  ).href;

  await page.goto(gameUrl);
}

async function triggerGameOver() {
  await page.evaluate(() => {
    index = 5;
    state = { budget: 0, energy: 50, happiness: 60 };
    secondChanceUsed = false;
    render();
    showGameOver();
  });
}

test('1. Game Over opens when budget is insufficient', async () => {
  await openGame();
  await triggerGameOver();

  assert.equal(await page.locator('#gameOver').evaluate(el => el.open), true);
  assert.match(
    await page.locator('#gameOverReason').innerText(),
    /Бюджет ешбір әрекетке жетпейді/
  );

  await page.close();
});

test('2. Second Chance puzzle opens', async () => {
  await openGame();
  await triggerGameOver();

  await page.locator('#secondChanceBtn').click();

  assert.equal(
    await page.locator('#secondChancePuzzle').evaluate(
      el => el.classList.contains('hidden')
    ),
    false
  );

  await page.close();
});

test('3. Correct answer restores budget and closes Game Over', async () => {
  await openGame();
  await triggerGameOver();

  await page.locator('#secondChanceBtn').click();
  await page.locator('[data-rescue="correct"]').click();

  const result = await page.evaluate(() => ({
    budget: state.budget,
    dialogOpen: document.getElementById('gameOver').open,
    mission: index
  }));

  assert.equal(result.budget, 10);
  assert.equal(result.dialogOpen, false);
  assert.equal(result.mission, 5);

  await page.close();
});

test('4. Wrong answer disables Second Chance', async () => {
  await openGame();
  await triggerGameOver();

  await page.locator('#secondChanceBtn').click();
  await page.locator('[data-rescue]:not([data-rescue="correct"])').first().click();

  assert.match(
    await page.locator('#gameOverReason').innerText(),
    /Жауап қате/
  );

  assert.equal(
    await page.locator('#secondChanceBtn').evaluate(
      el => el.classList.contains('hidden')
    ),
    true
  );

  await page.close();
});

test('5. Restart resets mission, budget and Second Chance', async () => {
  await openGame();
  await triggerGameOver();

  await page.locator('#secondChanceBtn').click();

  await page.evaluate(() => {
    restart({ budget: 100, energy: 50, happiness: 60 });
  });

  const result = await page.evaluate(() => ({
    mission: index,
    budget: state.budget,
    secondChanceUsed
  }));

  assert.equal(result.mission, 0);
  assert.equal(result.budget, 100);
  assert.equal(result.secondChanceUsed, false);

  await page.close();
});
