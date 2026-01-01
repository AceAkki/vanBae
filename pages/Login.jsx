import {useState} from 'react'
import {useSearchParams, useLoaderData, useNavigate } from "react-router-dom"

export function loader({request}){
    return new URL(request.url).searchParams.get("message");
}

 async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null)
    //const [searchParams, setSearchParams] = useSearchParams();
    //let redirectMsg = searchParams.get('message')
    let redirectMsg = useLoaderData();
    const navigate = useNavigate();
    

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting");
        setError(null);
        loginUser(loginFormData)
            .then(data => navigate("/host", {replace:true}))
            .catch(err => setError(err))
            .finally(()=> setStatus("idle"))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    

    return (
        <section className="login-container">
            {redirectMsg && <h2 style={{color:"red"}}>{redirectMsg}</h2>}
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === "submitting"}>{status !== "idle" ? "logging in ..." :  "Log in"}</button>
            </form>
            {error && <h3 style={{color:"red"}}>{error.message}</h3>}
        </section>
    )

}