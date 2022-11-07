import http from '../utils/http'
import jwt_decode from "jwt-decode";

const login = (data) => {
    return http.post("/login", data);
}

const register = (data) => {
    return http.post("/register", data);
}

const forgot = (data) => {
    return http.post('/forgotPassword', data);
}

const reset = (data) => {
    return http.put('/resetPassword:token', data);
}

const isAuthentificated = () => {
    const token = localStorage.getItem('accessToken')
    if (token != null) {
        var decoded = jwt_decode(token);
        var datenow = new Date();
        const milliseconds = decoded.exp * 1000
        const expdate = new Date(milliseconds)
       
        if (datenow < expdate)
        {
            return true;
        }
        else { 
            localStorage.removeItem('accessToken')
            return false;
         }
    }
    else {
        return false;
    }
}


const getAuthUserId = ()=>{
    const token = localStorage.getItem('accessToken')
    if (token != null) {
        var decoded = jwt_decode(token);
        return decoded.companyId
    }else{
        return '';
    }
}
const auth = {
    login,
    register,
    forgot,
    reset,
    isAuthentificated,
    getAuthUserId
}

export default auth