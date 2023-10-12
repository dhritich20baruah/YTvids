import { atom } from "recoil";

export const todoListAtom = atom({
    key: "todoListState",
    default: []
})