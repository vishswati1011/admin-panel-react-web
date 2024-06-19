import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';
test.describe("add click on drive ", () => {
   test("verify the role option is clickable", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      const locator = page.locator(Selector.sidebar.role);
      await expect(locator).toBeEnabled()
   })

   test("verify the click on add role ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })


   test("verify the click on add role text filed  ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await page.locator(Selector.sidebar.role_field).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })

   test("verify the click on add role text filed fill  ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await page.locator(Selector.sidebar.role_field).click();
      await page.locator(Selector.sidebar.role_field).fill("dev");
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })


   test("verify the click on add role button then fill the text field and click on save ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await page.locator(Selector.sidebar.role_field).click();
      await page.locator(Selector.sidebar.role_field).fill("dev");
      await page.locator(Selector.sidebar.save_button1).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })
   test("verify the click on save button without enter role name see alert(Please enter the role title)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await page.locator(Selector.sidebar.save_button1).click();
      const locator = page.locator(Selector.sidebar.save_button1);
      await expect(locator).toBeEnabled()
   })
   test("verify the cancel button is clickable, popup is closed", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.sidebar.addRole_button).click();
      await page.locator(Selector.sidebar.cancel_button1).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })
   test("Verify the click on three dot icon , edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      const locator = page.locator(Selector.role.role_three_dot);
      await expect(locator).toBeEnabled()
   })

   test("Verify the click on three dot icon 2 nd role, edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot_second).click();
      const locator = page.locator(Selector.role.role_three_dot_second);
      await expect(locator).toBeEnabled()
   })

   test("Verify the click on three dot icon 3rd  role, edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot_third).click();
      const locator = page.locator(Selector.role.role_three_dot_third);
      await expect(locator).toBeEnabled()
   })


   test("Verify the click on three dot icon 4th  role, edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot_fourth).click();
      const locator = page.locator(Selector.role.role_three_dot_fourth);
      await expect(locator).toBeEnabled()
   })

   test("Verify the click on three dot icon 5th  role, edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot_five).click();
      const locator = page.locator(Selector.role.role_three_dot_five);
      await expect(locator).toBeEnabled()
   })

   test("Verify the click on edit icon , edit role popup is open", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_edit_click).click();
      const locator = page.locator(Selector.role.role_edit_click);
      await expect(locator).toBeEnabled()
   })
   test("Verify the click on save button without enter any field see the alert message (failed to update role name)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_edit_click).click();
      await page.locator(Selector.role.role_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })

   test("Verify the change role name click on text field", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_edit_click).click();
      await page.locator(Selector.role.role_input_field).click();
      const locator = page.locator(Selector.role.role_input_field);
      await expect(locator).toBeEditable()
   })


   test("Verify the change role name click on text field fill", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_edit_click).click();
      await page.locator(Selector.role.role_input_field).click();
      await page.locator(Selector.role.role_input_field).fill("developers");
      const locator = page.locator(Selector.role.role_input_field);
      await expect(locator).toBeEditable()
   })


   test("Verify the change role name then click on save button see alert message (role updated successfully)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_edit_click).click();
      await page.locator(Selector.role.role_input_field).click();
      await page.locator(Selector.role.role_input_field).fill("developer");
      await page.locator(Selector.role.role_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })
   test("Verify the click on delete icon , delete role popup is open)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_delete_click).click();
      const locator = page.locator(Selector.role.role_delete_click);
      await expect(locator).toBeEnabled()

   })
   test("Verify the click on delete buttion role delete in role screen( role) delete clsuccessfully))", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_delete_click).click();
      await page.locator(Selector.role.role_delete).click();
      const locator = page.locator(Selector.role.role_delete);
      await expect(locator).toBeEnabled()

   })
   test("Verify the click on cancel button, delete role popup is closed)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.role).click();
      await page.locator(Selector.role.role_three_dot).click();
      await page.locator(Selector.role.role_delete_click).click();
      await page.locator(Selector.role.role_cancel).click();
      await expect(page).toHaveURL(`${DRIVE_URL}roles`);
   })

})
