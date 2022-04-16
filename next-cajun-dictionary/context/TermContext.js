import { createContext, useEffect, useState } from "react";
import { API_STRING } from "../helpers/constants";
import axios from 'axios';

const TermContext = createContext();

export const TermProvider = ({ children }) => {
    const [terms, setTerms] = useState([]);
    
    useEffect(() => {
        async function getAllTerms() {
            const response = await axios.get(`${API_STRING}/terms`)
            return response.data;
        }
        getAllTerms()
        .then(res => setTerms(res));
    }, [terms])


    return(
        <TermContext.Provider value={{ terms }}>
            {children}
        </TermContext.Provider>
    )
}

export async function getStaticProps(context) {
    const terms = await getAllTerms();


}

export default TermContext;