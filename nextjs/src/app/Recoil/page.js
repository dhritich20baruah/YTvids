"use client" //Recoil can only be used in client side components
import { RecoilRoot } from "recoil"
import InputString from "./InputString"
import SelectorOutput from "./SelectorOutput"

export default function Recoil(){
    //You will have to wrap the component within recoilroot tags
    return(
        <RecoilRoot>
            <div>
                <h1 className="text-center m-10">Recoil State Management</h1>
                <InputString/>
                <SelectorOutput/>
            </div>
        </RecoilRoot>
    )
}