const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const runtimeConfig = window.__APP_CONFIG__ || {};

export const appConfig = {
  apiUrl: trimTrailingSlash(
    runtimeConfig.VITE_API_URL || import.meta.env.VITE_API_URL || "/api",
  ),
  razorpayKeyId:
    runtimeConfig.VITE_RAZORPAY_KEY_ID ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    "",
};
