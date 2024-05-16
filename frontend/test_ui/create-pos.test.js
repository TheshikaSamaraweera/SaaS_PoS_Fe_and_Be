const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

(async function simpleUITest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3001/cashier/pos");

    await driver.findElement(By.id("snacks")).click();

    await driver.findElement(By.id("ITMSC001")).click();

    let totalAmountElement = await driver.findElement(By.id("total-amount"));
    let totalAmount = await totalAmountElement.getText();
    assert.strictEqual(
      totalAmount,
      "Rs. 290.00",
      "Total amount does not match expected value"
    );
  } finally {
    await driver.quit();
  }
})();
