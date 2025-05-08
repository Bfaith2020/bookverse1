import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state
  const navigate = useNavigate();

  // register a user
  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user); // Update currentUser state
      return userCredential; // Ensure userCredential is returned
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw new Error(error.message || "Failed to register. Please try again.");
    }
  };

  // login the user (unchanged)
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);

      // Check if the logged-in user is an admin
      const isAdmin = email === import.meta.env.VITE_ADMIN_EMAIL;
      setIsAdmin(isAdmin); // Update isAdmin state in context

      // Redirect based on admin status
      if (isAdmin) {
        navigate("/"); // Admin dashboard route
      } else {
        navigate("/userfrontend"); // Default user route
      }

      return userCredential;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  // sign up with Google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // logout the user
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Reset currentUser state
      setIsAdmin(false); // Reset isAdmin state
      navigate("/userfrontend"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error.message);
      throw new Error("Failed to log out. Please try again.");
    }
  };

  // manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Check if the current user is an admin
        const isAdmin = user.email === import.meta.env.VITE_ADMIN_EMAIL;
        setIsAdmin(isAdmin);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    isAdmin, // Expose isAdmin in context
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};