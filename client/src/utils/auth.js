import * as Api from "../services/api.js"


export const setToken = (token) => {
    if(token){
        localStorage.setItem('token', token)
    }
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    return localStorage.removeItem('token')
}

export const isAuthenticated = () => {
    if(getToken())
        return true
    else
        return false
}