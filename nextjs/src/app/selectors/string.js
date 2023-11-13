//Selectors are derived state. They are basically functions to work on atoms

import { selector } from "recoil";
import { stringState } from "../atoms/string"; //Import the atom you want to work with

export const lengthState = selector({
    key: "lengthState",
    get: ({get}) => {
        const string = get(stringState);
        const lengthOfString = string.length;
        return lengthOfString
    }
})

//Lets add another selector
export const upperState = selector({
    key: "upperState",
    get: ({get}) => {
        const string = get(stringState)
        const upperOfString = string.toUpperCase();
        return upperOfString
    }
})