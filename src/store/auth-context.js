import React, {useEffect, useState} from 'react'


const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout: ()=>{},
    onLogin : (email,password)=>{},
})

// It is an alternative way of using context
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn]= useState(false)

    useEffect(()=>{
        const storedLoggedInfo = localStorage.getItem('isLoggedIn');
        if (storedLoggedInfo === '1'){
            setIsLoggedIn(true);
        }
    } , [])

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', '1')
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn')
    };
    return (
        <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogout : logoutHandler,
            onLogin : loginHandler,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext