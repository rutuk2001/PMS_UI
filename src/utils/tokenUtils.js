export function handleTokenExpiration() {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}
