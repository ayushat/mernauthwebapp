import React,{Fragment} from 'react'
import {Link,withRouter} from "react-router-dom"
import {signout,isAuthenticated} from "../auth/helper"

// to highlight the tab on which user is working.
const currentTab = (history,path) => {
    if(history.location.pathname === path) {
        return {color: '#2ecc72'}
    }else{
        return {color: '#FFFFFF'}
    }
}

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs nav-dark">
            {/* <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li> */}
            {!isAuthenticated() && (
                <Fragment>
            <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">SignIn</Link>
            </li>
            </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">DashBoard</Link>
                </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Ad-Dashbard</Link>
                </li>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning signout"
                     onClick={() => {
                        signout(() => {
                            history.push("/signin")
                        })
                    }}>
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
)
export default withRouter(Menu);