import { test, expect, } from '@playwright/test';
import { Selector } from '../Selector';
import { login } from '../login';
import { Assertion } from '../Assertions';
import { WEB_URL } from '../content';
import { DRIVE_URL } from '../content';
test.describe("add click on drive ", () => {
   test("verify the group option is clickable", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      const locator = page.locator(Selector.sidebar.group);
      await expect(locator).toBeEnabled()
   })
   test("verify the click on add group button then add group popup is open", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.sidebar.addGroup_button).click();
      await expect(page).toHaveURL(`${DRIVE_URL}add-group`);
   })
   test("verify the enter group name and select users then click on add group button see alert (Group added successfully)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.sidebar.addGroup_button).click();
      await page.locator(Selector.sidebar.Group_input).click();
      await page.locator(Selector.sidebar.Group_input).fill("developer");
      await page.locator(Selector.group.group_veiw_checkbox1).click();
      await page.locator(Selector.sidebar.addGroup_button1).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })

   test("verify the enter group name and select users 3 then click on add group button see alert (Group added successfully)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.sidebar.addGroup_button).click();
      await page.locator(Selector.sidebar.Group_input).click();
      await page.locator(Selector.sidebar.Group_input).fill("kartik");
      await page.locator(Selector.group.group_veiw_checkbox2).click();
      await page.locator(Selector.group.group_veiw_checkbox3).click();
      await page.locator(Selector.sidebar.addGroup_button1).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })

   test("Verify the click add group button without enter group name see alert  (Please fill out this field)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.sidebar.addGroup_button).click();
      await page.locator(Selector.sidebar.addGroup_button1).click();
      const locator = page.locator(Selector.sidebar.addGroup_button1);
      await expect(locator).toBeEnabled()

   })

   test("Verify the enter group name then click on add group button see alert (Please Select Atleast One User", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.sidebar.addGroup_button).click();
      await page.locator(Selector.sidebar.Group_input).click();
      await page.locator(Selector.sidebar.Group_input).fill("automation");
      await page.locator(Selector.sidebar.addGroup_button1).click();
      const locator = page.locator(Assertion.workspace_page);
      await expect(locator).toBeVisible()
   })
   test("Verify the click on dot icon , edit or delete icon is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      const locator = page.locator(Selector.group.group_three_dot);
      await expect(locator).toBeEnabled()
   })
   test("Verify the click on edit icon , edit user popup is open", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await expect(page).toHaveURL(`${DRIVE_URL}edit-group`);
   })

   test("Verify the click on edit icon , edit user popup is open then click on back ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_edit_back_click).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the click on save button without enter any field see the no alert message is showing", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the click change group name then click on save button see alert message (group updated successfully)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_input_field).click();
      await page.locator(Selector.group.group_input_field).fill("llll");
      await page.locator(Selector.group.group_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the remove group name and select remaining users then click on save button see alert message (Please fill out this field)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_input_field).click();
      await page.locator(Selector.group.group_input_field).fill("");
      await page.locator(Selector.group.group_edit_checkbox1).click();
      await page.locator(Selector.group.group_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the group name and without selecting remaining users then click on save button see alert (Update user successfully)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_input_field).click();
      await page.locator(Selector.group.group_input_field).fill("group1");
      await page.locator(Selector.group.group_edit_checkbox1).click();
      await page.locator(Selector.group.group_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the update group name field and click on checkbox for remaining users add then click on save button see alert (Update  user added successfully in group )", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_edit_click).click();
      await page.locator(Selector.group.group_input_field).click();
      await page.locator(Selector.group.group_input_field).fill("group1");
      await page.locator(Selector.group.group_edit_checkbox1).click();
      await page.locator(Selector.group.group_save).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the click on veiw option, view group popup is open", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_view_click).click();
      await expect(page).toHaveURL(`${DRIVE_URL}view-group`);
   })

   test("Verify the click on veiw option, view group popup is open click on back ", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_view_click).click();
      await page.locator(Selector.group.group_view_back_click).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })
   test("Verify the click on checkbox option for user remove in group user list then click on save button see (user is remove successfully in group)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_view_click).click();
      await page.locator(Selector.group.group_remove_checkbox2).click();
      await page.locator(Selector.group.group_view_remove).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })

   test("Verify the without click on checkbox option for user remove in group user list then click on save button see ( group updated successfully )", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_view_click).click();
      await page.locator(Selector.group.group_view_remove).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })

   test("Verify the click on delete icon , delete group popup is open)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_delete_click).click();
      const locator = page.locator(Selector.group.group_delete_click);
      await expect(locator).toBeEnabled()
   })
   test("Verify the click on delete button , group delete in group screen see alert ( group delete successfully))", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_delete_click).click();
      await page.locator(Selector.group.group_delete).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);

   })
   test("Verify the click on cancel button, delete group popup is closed)", async ({ page }) => {
      await login(page);
      await page.waitForTimeout(5000);
      await page.locator(Selector.sidebar.group).click();
      await page.locator(Selector.group.group_three_dot).click();
      await page.locator(Selector.group.group_delete_click).click();
      await page.locator(Selector.group.group_cancel).click();
      await expect(page).toHaveURL(`${DRIVE_URL}groups`);
   })


})