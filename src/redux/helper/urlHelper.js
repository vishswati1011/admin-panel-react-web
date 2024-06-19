import Cookies from "js-cookie";

//prod
export const COOKIES_TOKEN = Cookies.get("account_token");
export const urlHelper = "https://api.appsdeployer.com/api";
export const HOST_URL = "https://api.appsdeployer.com";
// export const urlHelper = "http://localhost:8082/api";
export const SOCKET_URL = `${HOST_URL}`;

//dev
// export const urlHelper = "https://devapi.appsdeployer.com/api"
// export const COOKIES_TOKEN = Cookies.get("dev_account_token")
