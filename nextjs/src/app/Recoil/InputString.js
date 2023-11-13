"use client"
import { useRecoilState } from "recoil"
import { stringState } from "../atoms/string"

export default function InputString(){
    const [string, setString] = useRecoilState(stringState) //Almost similiar to useState hook

    let handleChangeInput = (e) => {
        setString(e.target.value)
    }

    return(
        <>
        <div className="flex justify-center">
            <input type="text" placeholder="Enter the string" onChange={handleChangeInput} value={string} className="border-2 border-black p-2 w-[50%]"/>
        </div>
        </>
    )
}