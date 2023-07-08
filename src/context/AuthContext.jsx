import {React,createContext, useState, useEffect} from 'react'
import { apiRegister, apiLogin } from './Api'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState(false)
    const [query, setQuery] = useState("")
    
    useEffect(() => {
        let token = localStorage.getItem( 'token' )
        if (token !== null && token !== undefined) {
            setAuth( true )
        }
    },[])

    const handleRegister = (userData) => {
        fetch(apiRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(async (res) => {
            if(res.status === 201){
                let json = await res.json()
                localStorage.setItem('token', json.token)
                setAuth(true)
            } else {
                console.log('Error')
            }
        }).finally()
    }
    const handleLogin = async (userData) => {
        fetch(apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then( async (resp) => {
            if(resp.status === 200){
                let json = await resp.json()
                localStorage.setItem('token', json.token)
                setAuth(true)
            } else {
                setAuth(false)
                console.log('Error')
            }
        }).finally()
    }

    const data = {handleLogin,handleRegister,auth,query,setQuery}

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export {AuthProvider}
export default AuthContext