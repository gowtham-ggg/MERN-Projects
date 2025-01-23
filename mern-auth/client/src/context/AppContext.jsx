import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const getUserData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data',{ withCredentials: true })
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value ={
        backendUrl,isLoggedin,userData,
        setUserData,setIsLoggedin,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}