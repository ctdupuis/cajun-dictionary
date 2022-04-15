import { useContext } from 'react';
import TermCard from '../components/ui/Terms/TermCard';
import AuthContext from '../context/AuthContext';


export default function Home() {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <TermCard type={'term-of-day'} />
      <TermCard type={'most-liked'} />
    </div>
  )
}
