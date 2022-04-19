import { useContext } from 'react';
import TermCard from '../components/ui/Terms/TermCard';
import AuthContext from '../context/AuthContext';
import { getMostLikedTerm, getTermById } from '../helpers/api-util';

export default function Home({ termOfTheDay, mostLiked }) {
  const { user, login, logout } = useContext(AuthContext);
  
  return (
    <div className="wrapper">
      <TermCard term={termOfTheDay} type={'term-of-day'} />
      <TermCard term={mostLiked} type={'most-liked'} />
    </div>
  )
}

export async function getStaticProps() {
  const termOfTheDay = await getTermById(1);
  const mostLiked = await getMostLikedTerm();

  return { props: { termOfTheDay, mostLiked }}
}
