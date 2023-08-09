//Create a file for the authOptions Object in the app directory
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
//These lines import the authentication providers for Google and GitHub from the next-auth/providers package. These providers will be used to configure the authentication options for the NextAuth.js setup.

export const authOptions = { //The authoption object contains an array called providers which is used to configure the authentication providers for Google, GitHub or any other providers. Each provider is initialized with a configuration object containing the necessary credentials like clientID and client secret for that specific provider.
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET  
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET
    //The secret property within authOptions is used to set the secret that NextAuth.js will use for cryptographic operations and to secure cookies. It is also recommended to store this secret in an environment variable for added security.
}

//In summary, the provided code sets up the authentication options for NextAuth.js by configuring the Google and GitHub authentication providers using their respective API credentials (stored in environment variables) and setting the secret for cryptographic operations. This authOptions object will be used during the NextAuth.js setup to enable authentication and handle authentication-related tasks in the Next.js application.