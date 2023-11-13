"use client"
import { useRecoilValue } from "recoil"
import { lengthState } from "../selectors/string"
import { upperState } from "../selectors/string"

export default function SelectorOutput(){
    const length = useRecoilValue(lengthState)
    const upper = useRecoilValue(upperState)

    return(
        <>
            <h3 className="m-10 text-center text-lg">{length}</h3>
            <h3 className="m-10 text-center text-lg">{upper}</h3>

        </>
    )
}