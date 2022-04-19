import { useContext, useState } from 'react';
import TermCard from '../components/ui/Terms/TermCard';
import AuthContext from '../context/AuthContext';
import { getAllTerms, getMostLikedTerm } from '../helpers/api-util';
import moment from 'moment';

export default function Home({ terms, mostLiked }) {
  const { user, login, logout } = useContext(AuthContext);
  const [termIdx, setTermIdx] = useState(0);

  const termOfTheDay = terms[termIdx];

  let max = terms.length || 30

  return (
    <div className="wrapper">
      <TermCard term={termOfTheDay} type={'term-of-day'} />
      <TermCard term={mostLiked} type={'most-liked'} />
    </div>
  )
}

export async function getStaticProps() {
  const terms = await getAllTerms();
  const mostLiked = await getMostLikedTerm();

  return { props: { terms, mostLiked }}
}
