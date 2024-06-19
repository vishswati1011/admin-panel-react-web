import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { DRIVE_URL, WEB_URL } from '../content';
import { FORM_URL } from '../content';
test.describe("add click on drive ", () => {
    test("verify the logo is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.group).click();
        await page.locator(Selector.drive.drive_logo).click();
        const locator = page.locator(Selector.drive.drive_logo);
        await expect(locator).toBeEnabled();
    })

    test("verify the new button is clickable and the popup is open", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.click_plus_icon).click();
        const locator = page.locator(Selector.sidebar.click_plus_icon);
        await expect(locator).toBeEnabled();
    })

    test("verify the new idea workspace option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.click_plus_icon).click();
        await page.locator(Selector.sidebar.click_plus_icon_add_idea).click();
        const locator = page.locator(Selector.sidebar.click_plus_icon_add_idea);
        await expect(locator).toBeEnabled();
    })

    test("verify the new cxworkspace option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.click_plus_icon).click();
        await page.locator(Selector.sidebar.click_plus_icon_add_cx).click();
        const locator = page.locator(Selector.sidebar.click_plus_icon_add_cx);
        await expect(locator).toBeEnabled();
    })

    test("verify the new task workspace option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.click_plus_icon).click();
        await page.locator(Selector.sidebar.click_plus_icon_add_task).click();
        const locator = page.locator(Selector.sidebar.click_plus_icon_add_task);
        await expect(locator).toBeEnabled();
    })

    test("verify the new add form option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.click_plus_icon).click();
        await page.locator(Selector.sidebar.click_plus_icon_add_form).click();
        const locator = page.locator(Selector.sidebar.click_plus_icon_add_form);
        await expect(locator).toBeEnabled();
    })

    test("verify the my drive option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.my_drive).click();
        await expect(page).toHaveURL(`${DRIVE_URL}`)
    })

    test("verify the share with me option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.share_with_ne).click();
        await expect(page).toHaveURL(`${DRIVE_URL}share-with-me`);

    })

    test("verify the starred option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.stared).click();
        await expect(page).toHaveURL(`${DRIVE_URL}starred`);
    })


    test("verify the trash option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.trash).click();
        await expect(page).toHaveURL(`${DRIVE_URL}trash`);
    })

    test("verify the user option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await expect(page).toHaveURL(`${DRIVE_URL}users`);
    })

    test("verify the role option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.role).click();
        await expect(page).toHaveURL(`${DRIVE_URL}roles`);
    })


    test("verify the group option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.group).click();
        await expect(page).toHaveURL(`${DRIVE_URL}groups`);
    })
})
