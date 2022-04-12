import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [activeAlert, setActiveAlert] = useState();

    const AppContextObject = {
        user: {
            currentUser, setCurrentUser
        },
        alert: {
            activeAlert, setActiveAlert
        }
    }

    return (
        <AppContext.Provider value={AppContextObject} >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}