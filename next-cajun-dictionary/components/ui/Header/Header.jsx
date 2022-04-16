import classes from './header.module.css';
import Link from 'next/link';
import { useContext } from 'react';
import ModalContext from '../../../context/ModalContext';
import AuthContext from '../../../context/AuthContext'
import AuthForm from '../../forms/Auth/AuthForm';
import NewTermForm from '../../forms/Terms/NewTerm';
import {RiAccountBoxLine} from 'react-icons/ri';
import {MdLogout, MdOutlinePersonOutline} from 'react-icons/md';
import { BsPerson} from 'react-icons/bs'
import ProfileControl from '../ProfileControl/control/ProfileControl';

export default function Header() {
  const { setComponent } = useContext(ModalContext);
  const { user, logout } = useContext(AuthContext);

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

            { user ? 
              <div className={classes.nav_item}>
                  <a onClick={() => setComponent(<NewTermForm />)} > Submit Term </a>
              </div>
              :
              null
            }
          </div>

          <div className={classes.session_nav}>
            { user ? 
            <div className={classes.profile_ctrl}>
              <button
                className={classes.btn}
                onClick={() => logout()}
              >
                <MdLogout className={classes.icon} />
                Logout
              </button>
              <ProfileControl />
            </div>
            :
            <button 
              className={classes.btn} 
              onClick={() => setComponent(<AuthForm />)}
            >
              <RiAccountBoxLine />
              Login
            </button>
            }
          </div>
        </div>
    </header>
  )
}
