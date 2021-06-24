import firebase from "firebase";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { auth } from "../services/firebase";
import { useHistory} from 'react-router-dom'

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
user:User | undefined;
signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children:ReactNode;
}


export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps){
  
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(user => {
      if(user){

        const { displayName, photoURL, uid} = user
      
      if(!displayName || !photoURL){
        throw new Error ('Missing informations from Google Account.');  
      }

      setUser({
        id: uid,
        name:displayName,
        avatar:photoURL
      })
      }
    })

   

    
    return () => {
      unsubscriber();
    }
  }, [])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await  auth.signInWithPopup(provider);

      if(result.user) {
      const { displayName, photoURL, uid} = result.user
      
      if(!displayName || !photoURL){
        throw new Error ('Missing informations from Google Account.');  
      }

      setUser({
        id: uid,
        name:displayName,
        avatar:photoURL
      })
    }   
  }
  
  async function singOut(){
    
    await auth.signOut()    
    
    setUser(undefined);
    if (!user){ //usuário continua existindo mesmo após chamar o signOut()  PQ?
      history.push('/');
    }         
  } 

return (
  <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
  </AuthContext.Provider>

);



}