import { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [component, setComponent] = useState();

    return(
        <ModalContext.Provider value={{component, setComponent}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext;