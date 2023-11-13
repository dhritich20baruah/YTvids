//atoms are global states. Each atom represents one state in recoil 
import { atom } from "recoil"
export const stringState = atom({
    key: "stringState", //each atom should have an unique key
    default: "", //The default value is a string hence the quotes. If it had been an array than instead of "", []
})