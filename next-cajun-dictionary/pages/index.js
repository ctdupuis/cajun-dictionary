import TermCard from '../components/ui/Terms/TermCard';
import { useAppContext } from '../store/app';

export default function Home() {
  const { user: { currentUser, setCurrentUser } } = useAppContext();

  const login = () => {
    currentUser ? setCurrentUser(undefined) : setCurrentUser({ name: 'Cody' })
  }

  return (
    <div className="wrapper">

      { currentUser ? <h1>{currentUser.name}</h1> : <h1>No user in context</h1>}
      <button onClick={login}>Login</button>
      <div className="flex space-even">
        <TermCard type={'term-of-day'} />
        <TermCard type={'most-liked'} />
      </div>
    </div>
  )
}
