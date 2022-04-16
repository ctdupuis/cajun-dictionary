import classes from './dropdown.module.css';
import Link from 'next/link';

export default function ProfileDropdown() {
  return (
    <div className={classes.menu}>
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
