
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const  [user,setUser] = useState(true)
    const [loading,setLoading] = useState(null)
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn  = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
      const unSubscribe =  onAuthStateChanged(auth,currentUser=>{
            console.log('User in the state changed',currentUser)
            setUser(currentUser);
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    },[])
    const authInfo = {
        user,
        createUser,
        logOut,
        signIn,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;