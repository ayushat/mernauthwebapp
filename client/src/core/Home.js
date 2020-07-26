import React, { useState,Fragment } from "react";
import Base from "../core/Base";
import "../styles.css"
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    role:""
  });

  const { name, email, password, error, success,role } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
                required
              />
            </div>
            {/* <div className="form-group">
              <label className="text-light">Role</label>
              <input
                onChange={handleChange("role")}
                className="form-control"
                type="number"
                value={role}
                placeholder="0 for Customer and 1 for Admin"
              />
            </div> */}
            <div className="form-group">
              <label className="text-light">Role</label>
              <select
                onChange={handleChange("role")}
                className="form-control"
                value={role}
                placeholder="0 for Customer and 1 for Admin"
                required
              >
              <option disabled>0 for Customer and 1 for Admin</option>
              <option>0</option>
              <option>1</option>
              </select>
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block rounded mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, email, password,role })
        .then(data => {
          if (data?.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              success: true,
              role:""
            });
          }
        })
    .catch((err) => console.log("Error in signup",err));
  };
  const successMessage = () => (
      <Fragment>
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                         >
                        New account was created successfully. Please{" "}
                        <Link to="/signin">Login Here</Link>
                        </div>
                 </div>
                </div>
      </Fragment>
   
    );

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

  return (
      <Fragment>
            <Base title="Sign up page">
                {successMessage()}
                {errorMessage()}
                {signUpForm()}
            </Base>
      </Fragment>
  );
};

export default Signup;
