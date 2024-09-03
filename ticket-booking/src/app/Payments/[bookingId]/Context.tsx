import { createContext } from "react";

type paymentContextType = {
    paymentSuccess: boolean;
    setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentContext = createContext<paymentContextType | undefined>(undefined)