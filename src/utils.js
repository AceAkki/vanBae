import { redirect } from "react-router-dom";

export async function requireAuth(url) {
  console.log("Checking if loader is called");
  let userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = userData ? true : false; 
  
  const response = redirect(`/login?message=Login First&redirectTo=${url}`);
  
  if (!isLoggedIn) {
    console.log("Redirecting to /login");
    // does not work due to conflicting with miragejs
    // return redirect("/login");
    return Object.defineProperty(response, 'body', {value:true})
  }
  return null
}
