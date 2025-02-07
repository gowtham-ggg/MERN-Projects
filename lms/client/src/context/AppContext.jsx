import { createContext, useEffect, useState } from "react"
import { dummyCourses } from "../assets/assets"
import { useNavigate } from "react-router-dom"


export const AppContext = createContext()   

export const AppContextProvider = (props)=>{

    const [allCourses, setAllCourses] = useState([])
      //Fetch all courses
      const fetchAllCourses = async () =>{
        setAllCourses(dummyCourses)
    }
    const navigate = useNavigate()

    useEffect(()=>{
        fetchAllCourses()
    },[])

    const value= {allCourses,navigate}

  

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}