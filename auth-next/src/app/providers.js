"use client"
import {SessionProvider} from "next-auth/react"
//This line imports the SessionProvider component from the next-auth/react package. The SessionProvider is a special component provided by NextAuth.js to manage authentication state and provide session data to the rest of the application.

export const NextAuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}
//In this code, a custom functional component called NextAuthProvider is defined. It takes a single prop called children. This children prop is a special prop that allows you to wrap other components inside NextAuthProvider.
//Inside the NextAuthProvider component, it simply returns the SessionProvider component with the children prop passed as its children. This is how the children components get wrapped by the SessionProvider and receive access to the session data and authentication status provided by NextAuth.js.