import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { Assertion } from '../Assertions';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';
test.describe("add click on drive ", () => {
    test("verify the user option is clickable", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        const locator = page.locator(Selector.sidebar.user);
        await expect(locator).toBeEnabled()
    })
    test("verify the add user button is clickable and popup is open", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        const locator = page.locator(Selector.sidebar.addUser_button);
        await expect(locator).toBeEnabled()
    })
    test("verify the click on save button without enter any field see the alert message (All field are mandatory)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.save_button).click(); //wrong message is showing
        expect("Please Enter Employee Name").toBeTruthy();
    })

    test("verify the cancel button is clickable, popup is closed", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.cancel_button).click();
        await expect(page).toHaveURL(`${DRIVE_URL}users`);
    })

    test("verify the enter email id ,select role and password field then click on save button, without enter name user can see alert (Please enter employee name)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer.com");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345678");
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please Enter Employee Name").toBeTruthy();
    })
    test("verify the enter name, email id , select role and password field then click on save button see alert message (user added successfully)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer.com");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345678");
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please Enter Employee Name").toBeTruthy();
    })
    test("verify the enter name ,select role and password field then click on save button, without enter email user can see alert (Please enter employee email))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345678");
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please Enter Employee Name").toBeTruthy();
    })

    test("verify the  enter invalid email see alert message(Please enter vaild email id))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345678");
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please enter vaild email id").toBeTruthy();
    })
    test("verify the  enter name ,email and password field then click on save button, without enter email user can see alert (Please select employee role))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer.com");
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345678");
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please select employee role").toBeTruthy();
    })
    test("verify the enter name ,email and select role field then click on save button, without enter password user can see alert (Please enter employee password))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer.com");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.save_button).click();
        expect("Please enter employee password").toBeTruthy();
    })
    test("verify the less then 8 character password see alert message(password should be atleast 8 characters ))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.sidebar.addUser_button).click();
        await page.locator(Selector.sidebar.name_field_input).click();
        await page.locator(Selector.sidebar.name_field_input).fill("Lakshya");
        await page.locator(Selector.sidebar.email_field_input).click();
        await page.locator(Selector.sidebar.email_field_input).fill("lakshya@appsdeployer.com");
        await page.locator(Selector.sidebar.select_role).click();
        await page.locator(Selector.sidebar.select_role).selectOption({ index: 1 });
        await page.locator(Selector.sidebar.password_input).click();
        await page.locator(Selector.sidebar.password_input).fill("12345");
        await page.locator(Selector.sidebar.save_button).click();
        expect("YOUR PASSWORD MUST BE AT LEAST 8 CHARACTERS LONG!").toBeTruthy();
    })

    test("Verify the click on three dot icon , edit or delete icon is showing", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        const locator = page.locator(Selector.user.user_three_dot);
        await expect(locator).toBeEnabled()
    })

    test("Verify the click on three dot 2nd  icon , edit or delete icon is showing", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot_second).click();
        const locator = page.locator(Selector.user.user_three_dot_second);
        await expect(locator).toBeEnabled()
    })

    test("Verify the click on three dot 3rd  icon , edit or delete icon is showing", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot_third).click();
        const locator = page.locator(Selector.user.user_three_dot_third);
        await expect(locator).toBeEnabled()
    })

    test("Verify the click on three dot 4th  icon , edit or delete icon is showing", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot_fourth).click();
        const locator = page.locator(Selector.user.user_three_dot_fourth);
        await expect(locator).toBeEnabled()
    })

    test("Verify the click on three dot 5th  icon , edit or delete icon is showing", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot_five).click();
        const locator = page.locator(Selector.user.user_three_dot_five);
        await expect(locator).toBeEnabled()
    })


    test("Verify the click on edit icon , edit user popup is open", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_edit_click).click();
        const locator = page.locator(Selector.user.user_edit_click);
        await expect(locator).toBeEnabled()
    })
    test("Verify the click on save button without enter any field see the alert message (failed to update user)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_edit_click).click();
        await page.locator(Selector.user.user_save).click();
        const locator = page.locator(Assertion.workspace_page);
        await expect(locator).toBeVisible()
    })
    test("Verify the click change name and change role field then click on save button see alert message (employee updated successfully)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_edit_click).click();
        await page.locator(Selector.user.user_input_feild).click();
        await page.locator(Selector.user.user_input_feild).fill("lakshyaa");
        await page.locator(Selector.user.user_dropdown_feild).click();
        await page.locator(Selector.user.user_save).click();
        const locator = page.locator(Assertion.workspace_page);
        await expect(locator).toBeVisible()
    })
    test("Verify the click on delete icon , delete user popup is open)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_delete_click).click();
        const locator = page.locator(Assertion.workspace_page);
        await expect(locator).toBeVisible()
    })
    test("Verify the click on delete buttion user delete in user list (user delete successfully))", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_delete_click).click();
        await page.locator(Selector.user.user_delete_button).click();
    })
    test("Verify the click on cancel button, delete user popup is closed)", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(5000);
        await page.locator(Selector.sidebar.user).click();
        await page.locator(Selector.user.user_three_dot).click();
        await page.locator(Selector.user.user_delete_click).click();
        await page.locator(Selector.user.user_cancel_button).click();
    })

})
