/* eslint-disable */
import axios from "axios";
import Cookies from "js-cookie";
import {COOKIES_TOKEN} from '../helper/urlHelper'
// Import your dependencies here

// Create a new Axios instance
const axiosInstance = axios.create();

// Define an interceptor function to handle unauthorized access
const handleUnauthorizedAccess = () => {
  const domain = window.location.hostname;
  const path = "/"; // Adjust the path based on your cookie configuration
  console.log("mmm");
  // Clear the cookie for the current domain
  Cookies.remove('account_token', { domain, path });
  // Cookies.remove('dev_account_token', { domain, path });


  // Helper function to get subdomains of a domain
  const getSubdomains = (domain) => {
    const domainParts = domain.split(".");
    const subdomains = [];

    for (let i = domainParts.length - 2; i >= 0; i--) {
      subdomains.push(domainParts.slice(i).join("."));
    }
    return subdomains;
  };

  // Clear the cookie for each subdomain
  const subdomains = getSubdomains(domain);
  subdomains.forEach((subdomain) => {
    // Cookies.remove("dev_account_token", { domain: subdomain, path });

    Cookies.remove("account_token", { domain: subdomain, path });
  });
  // Show a confirmation alert using react-alert
  alert("You have been logged out due to unauthorized access.");

  // Redirect to the login page
  window.location.href = "https://accounts.appsdeployer.com";
};

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = COOKIES_TOKEN; // Replace 'token' with the key you use to store the token
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedAccess(); // Call the unauthorized access handler function
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
