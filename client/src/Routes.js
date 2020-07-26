import React from 'react'
import {Route,Switch,BrowserRouter as Router} from "react-router-dom"
import Signup from './core/Home'
import Signin from './user/Signin'
import  AdminRoute  from "./auth/helper/AdminRoutes";
import  PrivateRoute  from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

export default function Routes() {
    return (
        <div>
            <Router>
                <Switch>

                    <Route exact path="/" component={Signup} />
                    <Route exact path="/signin" component={Signin}/>
                    <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
                    <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
                   

                </Switch>
            </Router>
        </div>
    )
}
