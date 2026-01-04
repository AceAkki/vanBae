import { useEffect, useState } from "react";
import {
  useSearchParams,
  useLoaderData,
  useActionData,
  useNavigate,
  useNavigation,
  Form,
  useRouteError,
  redirect,
} from "react-router-dom";

// -------------------------------------------
// imperative method

// export default function Login() {
//     const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
//     const [status, setStatus] = useState("idle");
//     const [error, setError] = useState(null)
//     //const [searchParams, setSearchParams] = useSearchParams();
//     //let redirectMsg = searchParams.get('message')
//     let redirectMsg = useLoaderData();
//     const navigate = useNavigate();

//     function handleSubmit(e) {
//         e.preventDefault()
//         setStatus("submitting");
//         setError(null);
//         loginUser(loginFormData)
//             .then(data => navigate("/host", {replace:true}))
//             .catch(err => setError(err))
//             .finally(()=> setStatus("idle"))
//     }

//     function handleChange(e) {
//         const { name, value } = e.target
//         setLoginFormData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     return (
//         <section className="login-container">
//             {redirectMsg && <h2 style={{color:"red"}}>{redirectMsg}</h2>}
//             <h1>Sign in to your account</h1>
//             <form onSubmit={handleSubmit} className="login-form">
//                 <input
//                     name="email"
//                     onChange={handleChange}
//                     type="email"
//                     placeholder="Email address"
//                     value={loginFormData.email}
//                 />
//                 <input
//                     name="password"
//                     onChange={handleChange}
//                     type="password"
//                     placeholder="Password"
//                     value={loginFormData.password}
//                 />
//                 <button disabled={status === "submitting"}>{status !== "idle" ? "logging in ..." :  "Log in"}</button>
//             </form>
//             {error && <h3 style={{color:"red"}}>{error.message}</h3>}
//         </section>
//     )

// }

//---------------------------------------------

export function loader({ request }) {
  // console.log(request)
  return new URL(request.url).searchParams.get("message");
}

async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

export async function action({ request }) {
  let redirectParam = new URL(request.url).searchParams.get("redirectTo")
  let redirectPath = redirectParam ? redirectParam : "/host";
  try {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData.entries());
    const data = await loginUser({ email, password });
    localStorage.setItem("user", JSON.stringify({ userid: data.user.id, email: data.user.email, name:data.user.name }));
    let response = redirect(redirectPath);
    return Object.defineProperty(response, 'body', {value:true});
  } catch (error) {
    return error
  }
}

export default function Login() {
  let [userData, setUserData] = useState(null);
  let redirectMsg = useLoaderData();
  // using the Error Element method and using the same page for Error element then using useRouteError
  // let err = useRouteError();
  let err = useActionData();
  let navigationState = useNavigation();
  // console.log(navigationState)

  if (localStorage.getItem("user") && userData === null) {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }

//   useEffect(()=> {
//   }, [])

  function logout() {
    setUserData(null);
    localStorage.removeItem("user");
  }
 

  return (
    <section>
      {userData === null ? (
        <section className="login-container">
          {redirectMsg && <h2 style={{ color: "red" }}>{redirectMsg}</h2>}
          <h1>Sign in to your account</h1>
          <Form 
              className="login-form" 
              method="post"
              replace
              >
            <input name="email" type="email" placeholder="Email address" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={navigationState.state === "submitting"}>{navigationState.state === "submitting" ? "Logging In.." : "Log in"}</button>
          </Form>
          <h3 style={{ color: "red" }}>{err && err.message}</h3>
        </section>
      ) : (
        <section>
            <h1>
                <strong>Name : </strong>
                    {userData.name}
            </h1>
            <h2>
                <strong>Email : </strong>
                {userData.email}
            </h2>
            <h2>
                <strong>Id : </strong>
                {userData.userid}
            </h2>

            <button onClick={logout}>
                Log Out
            </button>
        </section>
      )}
    </section>
  );
}
