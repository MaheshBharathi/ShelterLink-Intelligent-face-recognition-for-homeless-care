import React, { useState } from 'react'
import { useContext } from 'react'
const Authcontext=React.createContext()

export function AuthProvider(props) {
    const [user,setUser]=useState(null)
    const login=(username)=>
    {
         setUser(username)
    }
    const logout=()=>
    {
        setUser(null)
    }
  return (
    <div>
        <Authcontext.Provider value={{user,login,logout}}>
            {props.children}
        </Authcontext.Provider>


        </div>
  )
}

export const useAuth=()=>
{
    return useContext(Authcontext)
}