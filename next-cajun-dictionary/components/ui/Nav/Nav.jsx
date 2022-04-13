import { useEffect, useState } from 'react';
import classes from './nav.module.css';
import { useRouter } from 'next/router'

export default function Nav() {
    const [activeTab, setActiveTab] = useState();

    const router = useRouter();

    useEffect(() => { 
       setActiveTab(router.asPath)
    }, [])


    return (
        <nav className={classes.nav + " bg-red2"}>
            <div className={activeTab === "/" ? classes.active : classes.nav_item}>
                <a href="/">Home</a>
            </div>
            <div className={activeTab === "/terms" ? classes.active : classes.nav_item}>
                <a href="/terms">List of Terms</a>
            </div>
            <div className={activeTab === "/about" ? classes.active : classes.nav_item}>
                <a href="/about">About</a>
            </div>
            <div className={activeTab === "/add" ? classes.active : classes.nav_item}>
                <a href="/add">Add Term</a>
            </div>
        </nav>
    )
}
