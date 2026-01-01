import {useState} from 'react'
import {useSearchParams, useLoaderData } from "react-router-dom"

export function loader({request}){
    return new URL(request.url).searchParams.get("message");
}

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    //const [searchParams, setSearchParams] = useSearchParams();
    //let redirectMsg = searchParams.get('message')
    let redirectMsg = useLoaderData();

    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginFormData)
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
                <button>Log in</button>
            </form>
        </section>
    )

}