import React from 'react'
import { RecoilRoot, atom, useRecoilState, selector, useRecoilValue } from 'recoil'

const Home = () => {
  return (
    <div>
        <RecoilRoot>
            <h1>Char Counter</h1>
            <CharCount/>
            <GetCharValue/>
            <GetCharLength/>
        </RecoilRoot>
    </div>
  )
}

export default Home

//Atom
const charAtom = atom({
    key: 'charState',
    default: 0
})

function CharCount(){
    const [text, setText] = useRecoilState(charAtom)

    return(
        <div>
            <input type="text" onChange={(e)=>setText(e.target.value)}/>
        </div>
    )
}

function GetCharValue(){
    const [text, setText] = useRecoilState(charAtom)
    return(
        <div>
            <h3>{text}</h3>
        </div>
    )
}

function GetCharLength(){
    return(
        <div>
            <h3>{useRecoilValue(charValueSelector)}</h3>
        </div>
    )
}

//Selector
const charValueSelector = selector({
    key: 'charValueSelector',
    get: ({get})=>{
        const text = get(charAtom)
        return text.length
    }
})