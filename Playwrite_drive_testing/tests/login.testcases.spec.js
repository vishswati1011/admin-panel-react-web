import { test, expect } from '@playwright/test';
import { Selector } from '../Selector';
import { config } from '../config';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';

test.describe("Login testcases", () => {
    test('Verify the login functionailty with an valid emailid and password', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_email).click();
        await page.locator(Selector.login.login_email).fill('lakshyaappsdeployer@gmail.com');
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('123457678');
        await page.locator(Selector.login.login_button).click();
        await expect(page).toHaveURL(`${WEB_URL}`);
    });
    test('Verify the login functionality with an invalid emailid and valid password.', async ({ page, }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_email).click();
        await page.locator(Selector.login.login_email).fill('shikha@appsdeployer');
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('12345678');
        await page.locator(Selector.login.login_button).click();
        await expect(page).toHaveURL(`${WEB_URL}`);
    });
    test('Verify the login functionality with an valid emailid and valid password.', async ({ page, }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_email).click();
        await page.locator(Selector.login.login_email).fill('shikha@appsdeployer.com');
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('12345678');
        await page.locator(Selector.login.login_button).click();
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL(`${DRIVE_URL}`);
    });

    test('Verify the login functionality with a blank email id and password.', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_button).click();
        await page.locator(Selector.login.login_button);
        expect("PLEASE ENTER EMAIL!").toBeTruthy();
    });

    test('Verify the login functionality with a blank emailid and valid password', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('12345678');
        await page.locator(Selector.login.login_button).click();
        expect("PLEASE ENTER EMAIL!").toBeTruthy();
    });

    test('Verify the login functionality with eye icon', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('12345678');
        await page.locator(Selector.login.eye_icon).click();
        const locator = page.locator(Selector.login.eye_icon);
        await expect(locator).toBeEnabled();
    });
    test('Verify the login functionality with a emailid and blank password', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_email).click();
        await page.locator(Selector.login.login_email).fill('shikha@appsdeployer.com');
        await page.locator(Selector.login.login_button).click();
        expect("PLEASE ENTER PASSWORD!").toBeTruthy();
    });
    test('Verify the login functionality with an invalid email id and invalid password.', async ({ page, }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.login.login_email).click();
        await page.locator(Selector.login.login_email).fill('shikha@appsdeployer.com');
        await page.locator(Selector.login.login_password).click();
        await page.locator(Selector.login.login_password).fill('Shikha@1234');
        await page.locator(Selector.login.login_button).click();
        expect("INVALID CREDENTIALS!").toBeTruthy();
    });

})