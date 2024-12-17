import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./BasePage";
import { pageFixture } from "../../hooks/pageFixture";
import { WaitUtils } from "../../utils/WaitUtils";
import exp from "constants";

export class DashBoardPage extends BasePage
{
    readonly page : Page
    public readonly dashBoardLinkTab : Locator
    public readonly organizationDropdown :Locator
    public readonly addOrganizationLink :Locator
    constructor(page:Page)
    {
      super(page)
      this.page = page
      this.dashBoardLinkTab = page.locator('div.xnav-header--main > nav > ol > li:nth-child(1) > a')
      this.organizationDropdown = page.locator(".xnav-appbutton--body")
      this.addOrganizationLink = page.locator("a[data-name='organisation-menu/add-organisation']")
    }

    async checkDashBoardLinkTab()
    {
       WaitUtils.wait(2000); // Blocking wait for 2 seconds 
       await expect(this.dashBoardLinkTab).toBeVisible()
       await this.highlightAndVerify(this.dashBoardLinkTab)
    }

    async selectOrganizationDropdown()
    {
      await this.highlightAndClick(this.organizationDropdown)
    }

    async verifyAddOrganizationLink()
    {
      await WaitUtils.asyncWait(this.page, 5000);
      await expect(this.addOrganizationLink).toBeVisible();
      await expect(this.addOrganizationLink).toBeEnabled();
      await this.highlightAndVerify(this.addOrganizationLink)
    }

    async clickOnAddorganizationLink()
    {
      await this.highlightAndClick(this.addOrganizationLink)
      await this.page.waitForFunction(() => document.title.includes('Add your business'), { timeout: 10000 });
    }
  
    async verifyAddBusinessPage()
    {
      await WaitUtils.asyncWait(this.page, 5000);
      const title = await this.page.title()
      expect(title).toContain('Add your business')
      await this.highlightAndVerify(this.page.locator('form > h1'))
    }

}