import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ( {children} ) => {
    const[userName , setuserName]= useState({name : ""});
    return <UserContext.Provider value={{userName , setuserName}}>{children}</UserContext.Provider>
}