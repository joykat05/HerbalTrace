export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function getRole() {
  return getCurrentUser()?.role || null;
}

export function isAdmin() {
  return getRole() === "admin";
}