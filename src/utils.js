import { redirect } from "react-router-dom";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFcdb2YTY9jiMQSbHWcdggk8PflcHD1xk",
  authDomain: "vanbae-eb6b9.firebaseapp.com",
  projectId: "vanbae-eb6b9",
  storageBucket: "vanbae-eb6b9.firebasestorage.app",
  messagingSenderId: "919762971576",
  appId: "1:919762971576:web:1214acbc5aaddb0433fd4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function fetchVansData(id) {
  const fetchURL =  id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(fetchURL);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans!",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  console.log(data)
  return data;
}

export async function fetchHostData(id) {
    let url = id ? `/api/host/vans/${id}`: "/api/host/vans"
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: JSON.parse(localStorage.getItem("user")).userid,
      }),
    });
    const res = await data.json();
    // setHostVans(res.vans);
    return res.vans;
  }

export async function requireAuth(request) {
  let url = new URL(request.url).pathname;
  console.log("Checking if loader is called");
  let userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = userData ? true : false;

  const response = redirect(`/login?message=Login First&redirectTo=${url}`);

  if (!isLoggedIn) {
    console.log("Redirecting to /login");
    // does not work due to conflicting with miragejs
    // return redirect("/login");
    return Object.defineProperty(response, "body", { value: true });
  }
  return null;
}
