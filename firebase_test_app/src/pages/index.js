import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [visible, setVisible] = useState(true)

  const toggleVisible = () => {
    setVisible(visible => !visible);
  }
  return (
    <div>
      {visible ?
        <div>
          <SignIn />
          <p className="text-center">Do not have an account? <button onClick={toggleVisible} className="underline cursor-pointer text-blue-500">Sign Up</button> here.</p>
        </div>
        :
        <div>
          <SignUp />
          <p className="text-center">Already have an account? <button onClick={toggleVisible} className="underline cursor-pointer text-blue-500">Sign In</button> here.</p>
        </div>
      }
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          Powered by Next.js and Firebase
        </p>

      </footer>
    </div>
  )
}
