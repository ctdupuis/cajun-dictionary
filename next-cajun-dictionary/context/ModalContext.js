import { createContext, useState, useEffect } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return(
        <ModalContext.Provider value={{ open, setOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext;