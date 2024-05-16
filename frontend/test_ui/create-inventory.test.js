const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

(async function createInventoryTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3001/branch-manager/add-inventory");

    await driver.findElement(By.name("itemID")).sendKeys("ITM001");
    await driver.findElement(By.name("itemName")).sendKeys("Test Item");
    await driver.findElement(By.name("quantity")).sendKeys("100");
    await driver.findElement(By.name("supply")).sendKeys("Test Supply");
    await driver.findElement(By.name("date")).sendKeys("2022-01-01");
    await driver.findElement(By.name("unitPrice")).sendKeys("100.00");
    await driver.findElement(By.name("sellPrice")).sendKeys("150.00");
    await driver
      .findElement(By.name("description"))
      .sendKeys("Test Description");
    await driver.findElement(By.name("category")).sendKeys("Test Category");
    
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await driver.wait(until.elementIsEnabled(submitButton));

    await submitButton.click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    assert(
      alertText.includes("added to inventory successfully"),
      "Alert text does not include expected message"
    );
    await alert.accept();

  } finally {
    await driver.quit();
  }
})();
