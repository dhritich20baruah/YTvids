"use client"
import isAuth from "@/app/components/isAuth";

function Profile(){
  
    return(
        <div className="text-xl font-bold text-center m-20">THIS IS PROFILE</div>
    )
}

export default isAuth(Profile)