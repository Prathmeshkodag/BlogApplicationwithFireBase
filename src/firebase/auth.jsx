import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";


export const docreateUserWithEmailAndPassword=async(email ,password)=>{
    return await createUserWithEmailAndPassword(auth,email,password);
};


export const loginWithEmailAndPassword=async(email ,password)=>{
    return await signInWithEmailAndPassword(auth,email,password);
};

export const loginWithGoogle=async()=>{
    const provider=new GoogleAuthProvider();
    const result=await signInWithPopup(auth,provider);
    
    return result;
} 

export const logOut=async()=>{
    return auth.signOut();
}
