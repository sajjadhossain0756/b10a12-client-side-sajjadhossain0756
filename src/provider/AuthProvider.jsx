import React, { useState } from 'react'
import { createContext } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  // create user with firebase
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // sign in user with firebase
  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // google sign in with firebase
  const provider = new GoogleAuthProvider();
  
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  const authInfo = {
    user,
    createUser,
    signInUser,
    signInWithGoogle
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider