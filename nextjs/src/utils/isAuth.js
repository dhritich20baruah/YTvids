"use client"
export default function isAuth(){
    let token = ""
    if(typeof window !== 'undefined'){
        token = localStorage.getItem('token')
    }
    if(token !== null)
    return true
}
