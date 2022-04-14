import { useContext } from 'react';
import TermCard from '../components/ui/Terms/TermCard';
import AuthContext from '../context/AuthContext';


export default function Home() {
  const { user, login, logout } = useContext(AuthContext);

  // const login = () => {
  //   user ? setUser(undefined) : setUser({ name: 'Cody' })
  // }

  return (
    <div className="wrapper">

      { user ? <h1>{user.name}</h1> : <h1>No user in context</h1>}
      { user ? 
        <button onClick={() => logout()}>Logout</button>
        :
        <button onClick={() => login({ name: "Cody"})}>Login</button>
      }
      <div className="flex space-even">
        <TermCard type={'term-of-day'} />
        <TermCard type={'most-liked'} />
      </div>
    </div>
  )
}
