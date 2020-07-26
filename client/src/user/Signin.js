import React, { useState,Fragment } from 'react'
import Base from "../core/Base"
import {Redirect} from "react-router-dom"
import { signin,authenticate,isAuthenticated } from "../auth/helper";



const Signin = () => {

    const [values,setValues] = useState({
        email:"",
        password: "", 
        error: "" ,
        loading: false,
        didRedirect:false,
    })
    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
    };

    
    const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:false,loading:true,})
    signin({email,password})
    .then(data => {
        if(data.error){
            setValues({...values,error: data.error,loading:false,})
        }else{
            authenticate(data,() => {
                setValues({
                    ...values,
                    didRedirect:true,
                })
            })
        }
    })
    .catch( () => {console.log("Sign-In request Failed.")});
};

const performRedirect = () => {
    if(didRedirect){
        if(user && user.role ===1){
            return <Redirect to="/admin/dashboard"/>
        }else{
            return <Redirect to="/user/dashboard"/>
        }
    }
    if(isAuthenticated()){
        return <Redirect to="/"></Redirect>
    }
}
const loadingMessage = () =>{
    return (
        loading && (
        <div className="row">
              <div className="col-md-6 offset-sm-3 text-center">
                <div className="alert alert-success">
                    <i className="fa fa-spinner"></i>
                )
                </div>
              </div>
            </div>
      
        )
    )
}
  
const errorMessage = () => (
    <Fragment>
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                  <div
                      className="alert alert-danger"
                      style={{ display: error ? "" : "none" }}
                  >
                      {error}
                  </div>
               </div>
          </div>
        </Fragment>
      
);

const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                             <label className="text-light">Email </label>
                             <input onChange={handleChange("email")} className="form-control" type="email" value={email} autoFocus></input>
                        </div>
                        <div className="form-group">
                             <label className="text-light">Password</label>
                             <input onChange={handleChange("password")} className="form-control" type="password" value={password}></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block rounded mt-4">Submit</button>
                    </form>

                </div>
            </div>
        );
    };

    return (
        <Base title="Sign-In " description="We hope you remember your Credentials.">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}
export default Signin;