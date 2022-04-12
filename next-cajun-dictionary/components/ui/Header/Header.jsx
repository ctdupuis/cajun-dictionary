import classes from './header.module.css';

export default function Header() {
  return (
    <header className="bg-gradient">
        <div className="container flex space-bet center-align">
            <h1 className={classes.logo}>Cajun Dictionary</h1>

            <div className={classes.session_nav}>
                <a href="/auth">Login</a>
            </div>
        </div>
    </header>
  )
}
