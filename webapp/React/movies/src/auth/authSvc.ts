import apiConnector from "../api/apiConnector"
import { token } from "../models/token";
import { UserDto } from "../models/userDto";

const authSvc = {

    login: (user:UserDto) =>
    {
         apiConnector.loginUser(user)
             .then(token => localStorage.setItem("token", JSON.stringify(token)))
             .catch((e) => { console.log(e); throw e; });
    },

    logOut: () =>
    {
        localStorage.removeItem("token");
    },
    getToken: () => {
        const storedToken: token = JSON.parse(localStorage.getItem("token") as string);
        return storedToken;
    }
    
}

export default  authSvc;