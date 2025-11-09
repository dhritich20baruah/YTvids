import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null
};

function authReducer(state, action){
    switch (action.type){
        case "LOGIN":
            return {...state, isAuthenticated: true, user: action.payload};
        case "LOGOUT":
            return {...state, isAuthenticated: false, user: null};
        default:
            return state;
    }
}

export function AuthProvider({children}){
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => dispatch({ type: "LOGIN", payload: userData });
    const logout = () => dispatch({ type: "LOGOUT" });

    return(
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

