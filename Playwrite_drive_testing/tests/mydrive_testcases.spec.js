import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';
test.describe("add click on drive ", () => {
    test("verfiy the click on drive logo ", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.drive.drive_logo).click();
        const locator = page.locator(Selector.drive.drive_logo);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await expect(page).toHaveURL(`${DRIVE_URL}`);
    })


    test("verify the my drive then click on created workspace", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on three dots", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_threedots).click();

    })
    test("verify the my drive then click on delete", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_threedots).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_delete).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_delete);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on star", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_star).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_star);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on all", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_all).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_all);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on task", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_task).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_task);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on cx", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_cx).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_cx);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive then click on idea", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await page.locator(Selector.sidebar.my_drive_select_workspace_idea).click();
        const locator = page.locator(Selector.sidebar.my_drive_select_workspace_idea);
        await expect(locator).toBeEnabled();
    })
})