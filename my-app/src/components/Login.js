import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let Navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYjgyZjE1N2I5NmYxNTU5N2IyMjc4In0sImlhdCI6MTY2MjgzNzA4NH0.vHV17PFo2cb15t_uFl5Qk-SGO3sd7mKP0lCYs7-CbGY"
            },


            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem('token', json.authToken)
            Navigate("/");
            props.showAlert("Logged in successfully", "success")
            
        } else {
            props.showAlert("Please try to login with correct credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" value={credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            






        </div>
    )
}

export default Login

