const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

(async function createCashierTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3001/branch-manager/add-cashier");

    await driver.findElement(By.name("cashierId")).sendKeys("CAS008");
    await driver.findElement(By.name("cashierFirstName")).sendKeys("Saman");
    await driver.findElement(By.name("cashierLastName")).sendKeys("Perera");
    await driver
      .findElement(By.name("cashierEmail"))
      .sendKeys("saman.perera@example.com");
    await driver
      .findElement(By.name("cashierAddress"))
      .sendKeys("123 Main St Galle");
    await driver.findElement(By.name("cashierPhone")).sendKeys("070244857");
    await driver.findElement(By.name("cashierDoB")).sendKeys("1994-07-15");
    await driver.findElement(By.name("cashierGender")).sendKeys("Male");
    await driver.findElement(By.name("cashierBranch")).sendKeys("Sub Branch");

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    assert(
      alertText.includes("added as cashier"),
      "Alert text does not include expected message"
    );
    await alert.accept();

  } finally {
    await driver.quit();
  }
})();
