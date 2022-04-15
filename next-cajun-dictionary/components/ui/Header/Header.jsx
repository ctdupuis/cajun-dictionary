import classes from './header.module.css';
import Link from 'next/link'

export default function Header() {
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
                <a href="/terms">All Terms</a>
            </div>
            <div className={classes.nav_item}>
                <a href="/about">About</a>
            </div>
            <div className={classes.nav_item}>
                <a href="/terms/new">New</a>
            </div>
          </div>

          <div className={classes.session_nav}>
              <a href="/auth">Login</a>
          </div>
        </div>
    </header>
  )
}
