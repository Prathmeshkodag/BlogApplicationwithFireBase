import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export const AuthContext=React.createContext();
export function useAuth(){
    return React.useContext(AuthContext);
}


export function AuthContextProvider({children}) {
    const [currentUser,setCurrentUser]=useState(null);
    const [userLoggedIn,setUserLoggedIn]=useState(false);
    const [loading,setLoading]=useState(true);
     
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,initializerUser);
        return unsubscribe;

    },[]);
    async function initializerUser(user){
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    };

    const value={
        currentUser,
        userLoggedIn,
        loading,    
    }
    console.log(userLoggedIn)
    return (
        <AuthContext.Provider value={{value}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}