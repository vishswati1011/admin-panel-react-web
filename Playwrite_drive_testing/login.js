import { config } from './config';
import { Selector } from './Selector';
export async function login(page) {
  await page.goto(config.starting_url);
  await page.locator(Selector.login.login_email).click();
  await page.locator(Selector.login.login_email).fill(config.email);
  await page.locator(Selector.login.login_password).click();
  await page.locator(Selector.login.login_password).fill(config.password);
  await page.locator(Selector.login.login_button).click();
  
}