"use client"
import { createContext, useState } from "react"

export const PaymentContext = createContext();

export function PaymentContextProvider({children}){
    const[paymentData, setPaymentData] = useState()

    return(
        <PaymentContext.Provider value={{paymentData, setPaymentData}}>
            {children}
        </PaymentContext.Provider>
    )
}