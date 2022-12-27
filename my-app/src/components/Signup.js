import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Signup = (props) => {
  const  [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let Navigate = useNavigate()
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
  }
  const onSubmit= async (e)=>{
    e.preventDefault()
     const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        mode: 'cors',


        headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYjgyZjE1N2I5NmYxNTU5N2IyMjc4In0sImlhdCI6MTY2MjgzNzA4NH0.vHV17PFo2cb15t_uFl5Qk-SGO3sd7mKP0lCYs7-CbGY"
        },


        body: JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password }) // body data type must match "Content-Type" header

    });
    const json = await response.json()
    
    console.log(json)
    if(json.success===true){
        localStorage.setItem('token',json.authtoken)
        Navigate("/");
        props.showAlert("Account created successfully", "success")
    }else{
        props.showAlert("Invalid Credentials", "danger")
    }
  }
    return (
        <div className="container">
            <h2>Sign up</h2>
            <form onSubmit={onSubmit}>
            <div class="mb-3">
                    
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} />
                   
                </div>
                <div class="mb-3">
                    
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="emailmail1" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" onChange={onChange} value={credentials.password} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword}/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup