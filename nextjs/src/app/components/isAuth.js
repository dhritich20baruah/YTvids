"use client"
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component){
    return function isAuth(props){
        
        useEffect(()=>{
            const auth = localStorage.getItem("token")
            if(!auth){
                return redirect('/Login')
            }
        }, [])

        // if(!auth){
        //     return null
        // }

        return <Component {...props}/>
    }
}