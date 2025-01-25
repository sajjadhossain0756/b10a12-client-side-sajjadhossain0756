import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

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
  // update user to firebase
  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })
  }

  // sign out user from firebase
  const signOutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

  // google sign in with firebase
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  // find out current user with firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log('CurrentUser', currentUser)
      // set localStorage token
      if (currentUser) {
        const userInfo = { email: currentUser?.email }

        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
            }
          })
      } else {
        //  remove token
        localStorage.removeItem('access-token')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])


  const authInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    updateUserProfile,
    loading
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider