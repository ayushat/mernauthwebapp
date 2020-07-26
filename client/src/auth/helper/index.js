import { API } from "../../backend"
// API means : http://localhost:8000/api/ 

// signup
export const signup = (user) => {
    return  fetch(`${API}/signup`,{
            method: "POST",
            headers:{
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
             return console.log(err);
        })
};

// signin
export const signin = (user) => {
    return  fetch(`${API}/signin`,{
            method: "POST",
            headers:{
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return console.log(err)
        })
};

// to SET our token into USER-BROWSER.
export const authenticate =  (data,next) =>{
    if(typeof window!== "undefined") {
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if(typeof window!== "undefined") {
        localStorage.removeItem("jwt")
        next();
    }
    return fetch(`${API}/signout`,{
        method:"GET",

    })
    .then(response => console.log("Successfully Signed Out.Do Visit Again"))
    .catch(err => console.log(err))

};

// to check whether user signed in or not.
// this method will return a boolean value

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}