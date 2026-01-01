import { redirect } from "react-router-dom";

export function requireAuth() {
  console.log("Checking if loader is called");
  const isLoggedIn = false; // Simulated login status
  const response = redirect("/login")
  if (!isLoggedIn) {
    console.log("Redirecting to /login");
    // does not work due to conflicting with miragejs
    // return redirect("/login");
    return Object.defineProperty(response, 'body', {value:true})
  }
  return null
}
