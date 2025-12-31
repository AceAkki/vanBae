import { redirect } from "react-router-dom";

export function requireAuth() {
  const loggedIn = false;
  if (!loggedIn) {
    throw redirect("/login")
  }
  return null
}