import classes from './dropdown.module.css';
import Link from 'next/link';
import AuthContext from '../../../../context/AuthContext';
import { useContext } from 'react';

export default function ProfileDropdown() {
    const { user } = useContext(AuthContext);

    return (
        <div className={classes.menu}>
            <li className={classes.item}>  
                <span className={classes.username} href="#">             
                    <i>{user.username}</i>
                </span>
            </li>
            <li className={classes.item}>
                <Link href="/account/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className={classes.item}>
                <Link href="/account/settings">
                    Settings
                </Link>
            </li>
        </div>
    )
}
