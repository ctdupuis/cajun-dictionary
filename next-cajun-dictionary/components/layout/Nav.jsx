import classes from './nav.module.css';

export default function Nav() {
  return (
    <nav className="bg-red2">
        <div className="nav-item">
            <a href="/">Home</a>
        </div>
        <div className="nav-item">
            <a href="/list">List of Terms</a>
        </div>
        <div className="nav-item">
            <a href="/about">About</a>
        </div>
        <div id="add-tab" className="nav-item">
            <a href="/add">Add Term</a>
        </div>
    </nav>
  )
}
