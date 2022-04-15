import classes from './header.module.css';
import Link from 'next/link';
import {RiAccountBoxLine} from 'react-icons/ri';
import {useRouter} from 'next/router';
import { useContext } from 'react';
import ModalContext from '../../../context/ModalContext';
import AuthForm from '../../forms/AuthForm'

export default function Header() {
  const { setComponent } = useContext(ModalContext);

  return (
    <header className="bg-gradient">
        <div className={classes.main_head}>
          <div className={classes.logo_container}>
            <h2 className={classes.logo}>
              <Link href='/'>
                Cajun Dictionary
              </Link>
            </h2>

            <div className={classes.nav_item}>
                <Link href="/terms">All Terms</Link>
            </div>
            <div className={classes.nav_item}>
                <a href="/about">About</a>
            </div>
            <div className={classes.nav_item}>
                <a href="/terms/new">Submit Term</a>
            </div>
          </div>

          <div className={classes.session_nav}>
            <button 
              className={classes.btn} 
              onClick={() => setComponent(<AuthForm />)}
            >
              <RiAccountBoxLine />
              Login
            </button>
          </div>
        </div>
    </header>
  )
}
