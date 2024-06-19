import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';
test.describe("add click on drive ", () => {
    test("verify the create new is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.drive.click_add).click();
        const locator = page.locator(Selector.drive.click_add);
        await expect(locator).toBeEnabled();
    })



test("verfiy the click on drive logo ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.drive_logo).click();


})
test("verify the search is clickable", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.search).click();
    const locator = page.locator(Selector.drive.search);
    await expect(locator).toBeEmpty();
})




test("verify the search word in field ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.search).click();
    await page.locator(Selector.drive.search).fill('automation');
    const locator = page.locator(Selector.drive.search);
    await expect(locator).toBeEditable();
})

test("verify the grid icon is clickable", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    const locator = page.locator(Selector.drive.click_grid_icon);
    await expect(locator).toBeEnabled();
})


test("verify the grid icon is clickable and redirect to task deployer", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_takdeployer).click();
    const locator = page.locator(Selector.drive.click_grid_icon_takdeployer);
    await expect(locator).toBeEnabled();
})

test("verify the grid icon is clickable and redirect to cxdeployer", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_cxdeployer).click();
    const locator = page.locator(Selector.drive.click_grid_icon_cxdeployer);
    await expect(locator).toBeEnabled();
})

test("verify the grid icon is clickable and redirect to idea deployer", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_ideadeployer).click();
    const locator = page.locator(Selector.drive.click_grid_icon_ideadeployer);
    await expect(locator).toBeEnabled();
})

test("verify the grid icon is clickable and redirect to risk deployer", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_riskdeployer).click();
    const locator = page.locator(Selector.drive.click_grid_icon_riskdeployer);
    await expect(locator).toBeEnabled();
})


test("verify the grid icon is clickable and redirect to forms", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_forms).click();
    const locator = page.locator(Selector.drive.click_grid_icon_forms);
    await expect(locator).toBeEnabled();
})

test("verify the grid icon is clickable and redirect to whiteboard", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.click_grid_icon).click();
    await page.locator(Selector.drive.click_grid_icon_whiteboard).click();
    const locator = page.locator(Selector.drive.click_grid_icon_whiteboard);
    await expect(locator).toBeEnabled();
})


test("verify the profile icon is clickable and popup is open", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    const locator = page.locator(Selector.drive.profile_icon);
    await expect(locator).toBeEnabled();
})

test("verify the my profile is clickable", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    const locator = page.locator(Selector.drive.my_profile);
    await expect(locator).toBeEnabled();
})

test("verfiy the click on  close  icon in my profile ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    await page.locator(Selector.drive.profile_edit_close_button).click();
    const locator = page.locator(Selector.drive.profile_edit_close_button);
    await expect(locator).toBeEnabled();
})



test("verfiy the click on  profile edit in my profile ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    const locator = page.locator(Selector.drive.profile_edit_icon);
    await expect(locator).toBeEnabled();
})


test("verfiy the click on  profile edit name  in my profile ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    await page.locator(Selector.drive.profile_edit_text).click();
    const locator = page.locator(Selector.drive.profile_edit_text);
    await expect(locator).toBeEditable();
})


test("verfiy the click on  profile edit name is blank and click on save  ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    await page.locator(Selector.drive.profile_edit_text).click();
    await page.locator(Selector.drive.profile_name_save).click();
    const locator = page.locator(Selector.drive.profile_name_save);
    await expect(locator).toBeEnabled();
})


test("verfiy the click on  profile edit name fill  in my profile ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    await page.locator(Selector.drive.profile_edit_text).click();
    await page.locator(Selector.drive.profile_edit_text).fill('lakshyaapps');
    const locator = page.locator(Selector.drive.profile_edit_text);
    await expect(locator).toBeEnabled();
})

test("verfiy the click on  profile edit name save  in my profile ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.my_profile).click();
    await page.locator(Selector.drive.profile_edit_icon).click();
    await page.locator(Selector.drive.profile_edit_text).click();
    await page.locator(Selector.drive.profile_edit_text).fill('lakshyaapps');
    await page.locator(Selector.drive.profile_name_save).click();
    await expect(page).toHaveURL(`${DRIVE_URL}profile`);
})


test("verfiy the click on   reset password ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    const locator = page.locator(Selector.drive.reset_password);
    await expect(locator).toBeEnabled()
})


test("verfiy the click on  reset password then click on old password field ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    const locator = page.locator(Selector.drive.reset_old_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on old password field and fill the pasword ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('12345678');
    const locator = page.locator(Selector.drive.reset_old_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on old password field and fill the pasword click on eye icon", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('12345678');
    await page.locator(Selector.drive.reset_old_password_eye).click();
    const locator = page.locator(Selector.drive.reset_old_password_eye);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on old password field blank and click on save ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.confirm_password_button).click();
    const locator = page.locator(Selector.drive.confirm_password_button);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on new password filed ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_new_password).click();
    const locator = page.locator(Selector.drive.reset_new_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on new password field and fill the pasword ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('123456789');
    const locator = page.locator(Selector.drive.reset_new_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on new password field and fill the pasword click on eye icon ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('123456789');
    await page.locator(Selector.drive.reset_new_password_eye).click();
    const locator = page.locator(Selector.drive.reset_new_password_eye);
    await expect(locator).toBeEditable()
})
test("verfiy the click on  reset password then click on new password field is blank click on save", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.confirm_password_button).click()
    const locator = page.locator(Selector.drive.confirm_password_button);
    await expect(locator).toBeEnabled()
})

test("verfiy the click on  reset password then click on confirm password filed ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_confirm_password).click();
    const locator = page.locator(Selector.drive.reset_confirm_password);
    await expect(locator).toBeEditable()
})
test("verfiy the click on  reset password then click on confirm password field and fill the pasword ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('New');
    const locator = page.locator(Selector.drive.reset_confirm_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on confirm password field and fill the pasword and click on eye icon ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('New');
    await page.locator(Selector.drive.reset_confirm_password_eye).click();
    const locator = page.locator(Selector.drive.reset_confirm_password_eye);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password then click on confirm password filed is blank and click on save ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_confirm_password).click();
    const locator = page.locator(Selector.drive.reset_confirm_password);
    await expect(locator).toBeEditable()
})

test("verfiy the click on  reset password  then click on confirm password button ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.confirm_password_button).click();
    const locator = page.locator(Selector.drive.reset_confirm_password);
    await expect(locator).toBeEnabled()
})

test("verfiy the click on  reset password and change password succesfully  ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('12345678');
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('123456789');
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('123456789');
    await page.locator(Selector.drive.confirm_password_button).click()
    expect("PASSWORD CHANGE SUCCESFULLY").toBeTruthy();
})


test("verfiy the click on  reset password and put old password wrong pasword not change  ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('abcdefg');
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('12345678');
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('12345678');
    await page.locator(Selector.drive.confirm_password_button).click()
    expect("OLD PASSWORD INCORRECT.").toBeTruthy();
})

test("verfiy the click on  reset password and put new password wrong pasword not change  ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('123456789');
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('abcdefggfg');
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('12345678');
    await page.locator(Selector.drive.confirm_password_button).click()
    expect("Passwords do not match").toBeTruthy();
})

test("verfiy the click on  reset password and put conform  password wrong pasword not change  ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.reset_old_password).click();
    await page.locator(Selector.drive.reset_old_password).fill('123456789');
    await page.locator(Selector.drive.reset_new_password).click();
    await page.locator(Selector.drive.reset_new_password).fill('12345678');
    await page.locator(Selector.drive.reset_confirm_password).click();
    await page.locator(Selector.drive.reset_confirm_password).fill('abcxcdefg');
    await page.locator(Selector.drive.confirm_password_button).click()
    expect("YOUR CONFIRMPASSWORD MUST BE AT LEAST 8 CHARACTERS LONG!").toBeTruthy();
})


test("verfiy the click on  close icon  reset  password ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.reset_password).click();
    await page.locator(Selector.drive.close_icon_reset).click();
    await expect(page).toHaveURL(`${DRIVE_URL}`)
})

test("verfiy the click on  profile icon logout ", async ({ page }) => {
    await login(page);
    await page.waitForTimeout(5000);
    await page.locator(Selector.drive.profile_icon).click();
    await page.locator(Selector.drive.logout).click();
    await expect(page).toHaveURL(`${WEB_URL}`);
})
})
