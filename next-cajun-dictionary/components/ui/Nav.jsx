import classes from './header.module.css';

export default function Nav() {
  return (
    <nav className={classes.nav + " bg-red2"}>
        <div className={classes.nav_item}>
            <a href="/">Home</a>
        </div>
        <div className={classes.nav_item}>
            <a href="/terms">List of Terms</a>
        </div>
        <div className={classes.nav_item}>
            <a href="/about">About</a>
        </div>
        <div id="add-tab" className={classes.nav_item}>
            <a href="/add">Add Term</a>
        </div>
    </nav>
  )
}
