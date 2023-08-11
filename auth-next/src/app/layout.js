import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
//Inside the RootLayout component, it returns a layout structure. The layout includes an HTML document structure with a body containing the NextAuthProvider component, which wraps the children prop.Render nested components:The children prop is rendered inside the NextAuthProvider component. These nested components represent the actual content of the application that will be rendered within the layout.In summary, the RootLayout component is a higher-order component (HOC) that acts as a wrapper for the application's content. By using the NextAuthProvider within the RootLayout, it's likely enabling authentication and providing session data to all the nested components (children) within the layout. This way, the entire application gets access to the authentication state and information, allowing you to manage authentication-related tasks throughout your app.