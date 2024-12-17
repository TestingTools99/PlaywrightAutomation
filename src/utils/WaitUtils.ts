import { Page, Locator } from "@playwright/test";

export class WaitUtils {
  /**
   * Synchronous blocking wait
   * @param ms - The number of milliseconds to wait
   */
  static wait(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Intentionally empty
    }
  }

  /**
   * Asynchronous wait for a specific time (non-blocking)
   * @param page - Playwright Page object
   * @param ms - The number of milliseconds to wait
   */
  static async asyncWait(page: Page, ms: number) {
    await page.waitForTimeout(ms);
  }

  /**
   * Wait until a locator is visible
   * @param locator - Playwright Locator object
   */
  static async waitForLocatorToBeVisible(locator: Locator) {
    await locator.waitFor({ state: "visible" });
  }
}
