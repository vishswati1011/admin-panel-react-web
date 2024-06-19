import { test, expect } from '@playwright/test';
import { Selector } from '../Selector';
import { config } from '../config';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';

test.describe("forgot password testcases", () => {
    test('Verify the forgot word is clickable', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await expect(page).toHaveURL(`${WEB_URL}forgot-password`)
    });
    test('verify the email field clickable', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).type('email');
        const locator = page.locator(Selector.Forgot.forgot_email);
        await expect(locator).toBeEditable();
    });

    test('verify the enter invalid email id then click on submit button,see alert message on the field', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer");
        await page.locator(Selector.Forgot.submit_button).click();
        const locator = page.locator(Selector.Forgot.submit_button);
        await expect(locator).toBeEnabled();
    });
    test('verify the  without enter email id then click on sumbit button see alert message(Please enter email id)', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.submit_button).click();
        expect("PLEASE ENTER EMAIL!").toBeTruthy();
    });
    test('verify the enter valid email id then click on submit button see alert message(A verification code has been sent to you mail))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await expect(page).toHaveURL(`${WEB_URL}reset-password`)
    });

    test('verify the enter valid email id but without create account and click on submit button see alert message(user not found))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        expect("USER NOT FOUND").toBeTruthy();
    });

    test('verify the prefil email, confirm password ,otp in field and click on submit button, without enter password user can see alert (Please enter password))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_confirm_password).click();
        await page.locator(Selector.Forgot.forgot_confirm_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_otp).click();
        await page.locator(Selector.Forgot.forgot_otp).fill("");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("PLEASE ENTER PASSWORD!").toBeTruthy();
    });

    test('verify the prefil email, password ,otp in field and click on submit button, without enter confirm password user can see alert (PASSWORDS DO NOT MATCH!))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_password).click();
        await page.locator(Selector.Forgot.forgot_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_otp).click();
        await page.locator(Selector.Forgot.forgot_otp).fill("");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("PASSWORDS DO NOT MATCH!").toBeTruthy()
    });

    test('verify the enter email, password ,confirm password in field and click on submit button, without enter otp user can see alert (Please enter otp))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_password).click();
        await page.locator(Selector.Forgot.forgot_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_confirm_password).click();
        await page.locator(Selector.Forgot.forgot_confirm_password).fill("12345678");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("PLEASE ENTER OTP!").toBeTruthy()
    });

    test('verify the enter less then 4 character otp see alert message(INVALID OTP! ))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_password).click();
        await page.locator(Selector.Forgot.forgot_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_confirm_password).click();
        await page.locator(Selector.Forgot.forgot_confirm_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_otp).click();
        await page.locator(Selector.Forgot.forgot_otp).fill("123");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("INVALID OTP!").toBeTruthy()
    });

    test('verify the enter less wrong otp see alert message(expect("INVALID OTP!").toBeTruthy() ))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_password).click();
        await page.locator(Selector.Forgot.forgot_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_confirm_password).click();
        await page.locator(Selector.Forgot.forgot_confirm_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_otp).click();
        await page.locator(Selector.Forgot.forgot_otp).fill("1234");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("INVALID OTP!").toBeTruthy()
    });
    test('verify the prefil email id , new password, confrim password, otp field then click on submit button see alert message (password update))', async ({ page }) => {
        await page.goto(config.starting_url);
        await page.locator(Selector.Forgot.forgot_link).click();
        await page.locator(Selector.Forgot.forgot_email).click();
        await page.locator(Selector.Forgot.forgot_email).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.submit_button).click();
        await page.locator(Selector.Forgot.forgot_email1).click();
        await page.locator(Selector.Forgot.forgot_email1).fill("shikha@appsdeployer.com");
        await page.locator(Selector.Forgot.forgot_password).click();
        await page.locator(Selector.Forgot.forgot_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_confirm_password).click();
        await page.locator(Selector.Forgot.forgot_confirm_password).fill("12345678");
        await page.locator(Selector.Forgot.forgot_otp).click();
        await page.locator(Selector.Forgot.forgot_otp).fill("");
        await page.locator(Selector.Forgot.submit_button1).click();
        const locator = page.locator(Selector.Forgot.submit_button1);
        await expect(locator).toBeEnabled();
        expect("PASSWORD UPDATE").toBeTruthy()
    });
})