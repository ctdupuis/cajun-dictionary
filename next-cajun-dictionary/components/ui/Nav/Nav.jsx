import { useState } from 'react';
import classes from './nav.module.css';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

export default function Nav() {
    const [query, setQuery] = useState('');

    const router = useRouter();

    return (
        <nav className={classes.nav + " bg-red2"}>  
            <FaSearch className={classes.search_icon} />
            <input type='search' className={classes.search} placeholder="Search for a term..." onChange={(e) => setQuery(e.target.value)} />
        </nav>
    )
}
