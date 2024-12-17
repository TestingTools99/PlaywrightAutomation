import { Locator, Page,expect } from "@playwright/test";

export default class BasePage
{
    readonly page : Page

    constructor(page:Page)
    {
        this.page = page;
    }

    async navigateTo(url:string)
    {
        await this.page.goto(url)
    }
    async clickElement(element:Locator)
    {
        await element.click()
    }

    /**
   * Highlights an element by applying styles and clicks on it.
   * @param locator - The Playwright locator for the element to be highlighted and clicked
   * @param styles - The styles to be applied to the element for highlighting (e.g., border, background color)
   */
  async highlightAndClick(locator: Locator, styles: string = 'border: 2px solid blue; background-color: red;') {
    // Apply styles to highlight the element
    await locator.evaluate((element: HTMLElement, styles: string) => {
      element.style.cssText = styles;
    }, styles);

    // Optionally wait for the element to be visible or stable before clicking
    await locator.waitFor({ state: 'visible' });

    // Click on the element
    await locator.click({ force: true });
  }

   /**
   * Highlights an element by applying styles and verifies its visibility.
   * @param locator - The Playwright locator for the element to be highlighted and verified
   * @param styles - The styles to be applied to the element for highlighting (default: border and background)
   * @param assertionFn - The assertion function to be used for verification (default: checking visibility)
   */
  async highlightAndVerify(locator: Locator, styles: string = 'border: 3px solid blue; background-color:green;', assertionFn?: (locator: Locator) => void) {
    // Apply styles to highlight the element
    await locator.evaluate((element: HTMLElement, styles: string) => {
      element.style.cssText = styles;
    }, styles);

    // Optionally wait for the element to be visible before verifying
    await locator.waitFor({ state: 'visible' });

    // If no custom assertion function is provided, default to checking visibility
    if (assertionFn) {
      await assertionFn(locator);
    } else {
      await expect(locator).toBeVisible(); // Default behavior
    }
  }

}