import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext =  createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    // register a user
    const registerUser = async (email,password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user); // Update currentUser state
            return userCredential;
        } catch (error) {
            if (error.code === "auth/weak-password") {
                console.error("Password should be at least 6 characters.");
            } else if (error.code === "auth/email-already-in-use") {
                console.error("Email is already in use.");
            } else {
                console.error("Error during sign-up:", error.message);
            }
            throw error; // Re-throw error for further handling
        }
    }

    // login the user
    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);

            // Redirect admin to admin dashboard
            if (email === "admin123@gmail.com") {
                navigate("/admin-dashboard"); // Replace with your admin dashboard route
            } else {
                navigate("/default-page"); // Replace with your default page route
            }

            return userCredential;
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                console.error("Invalid email format.");
            } else if (error.code === "auth/user-not-found") {
                console.error("No user found with this email.");
            } else if (error.code === "auth/wrong-password") {
                console.error("Incorrect password.");
            } else {
                console.error("Error during login:", error.message);
            }
            throw error; // Re-throw error for further handling
        }
    }

    // sing up with google
    const signInWithGoogle = async () => {
     
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}