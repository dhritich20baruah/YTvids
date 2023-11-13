"use client"
import { RecoilRoot } from "recoil"
import SelectorOutput from "../Recoil/SelectorOutput"
export default function NewPage(){
    return(
        <>
        <RecoilRoot>
            <SelectorOutput/>
        </RecoilRoot>
        </>
    )
}