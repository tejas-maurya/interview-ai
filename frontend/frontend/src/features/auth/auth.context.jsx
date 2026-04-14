import { Children, createContext ,useState} from "react";
export const Authcontext=createContext()

export const AuthProvider=({Children})=>{
    const {user,setUser}=useState(null)
    const [loading,setLoadig]=useState(false);
       return (
        <Authcontext.Provider value ={{user,setUser ,loading ,setLoading}}>
                {Children}
        </Authcontext.Provider>
    )
}