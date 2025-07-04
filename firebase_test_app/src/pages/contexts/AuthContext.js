//The following code will set up a React Context to make the current Firebase authenticated user (user) available to any component in your application without having to pass it down manually through props
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//Create the Context Object. 
const AuthContext = createContext();
//createContext() is a React API that creates a Context object. A Context object provides a way to pass data through the component tree without having to pass props down manually at every level.

export function AuthProvider({children}){
  //This is a React component, often called a "Provider." Its job is to "provide" the context value to all of its descendants in the React component tree.
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    //This is the core Firebase part. onAuthStateChanged is a Firebase Authentication function that sets up a listener. Whenever the user's authentication state changes (e.g., they log in, log out, their token refreshes, or their session expires), the provided callback function (setUser in this case) is executed with the new user object (or null if logged out).
    return () => unsubscribe(); 
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider> //This line renders the AuthContext.Provider component. The value prop is where you pass the data that you want to make available to all consuming components. Here, we're passing an object { user }, which contains the current user's authentication state.
}

export const useAuth = () => useContext(AuthContext); //This is a custom React Hook. It's a convenient wrapper around the useContext hook. Instead of writing useContext(AuthContext) in every component that needs the user data, you can just import and call useAuth().
