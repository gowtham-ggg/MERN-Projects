import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"



export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const [user, setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate()


    const loadCreditsData = async ()=>{
        try{
            const {data} = await axios.get(backendUrl +'/api/user/credits', {headers : {token}})

            if(data.sucess){
                setCredit(data.credits)
                setUser(data.user)
            }
        }
        catch(error){
           console.log(error) 
           toast.error(error.message)
        }
    }


    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }


    const generateImage = async (prompt)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})
            
            if(data.sucess){
                loadCreditsData()
                return data.resultImage 

            }
            else{
                toast.error(data.message);
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }

        }
        catch(error){
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl,token,setCredit,setToken,credit,loadCreditsData,logout,generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider