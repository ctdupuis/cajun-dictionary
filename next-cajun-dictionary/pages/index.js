import { useContext, useState } from 'react';
import TermCard from '../components/ui/Terms/TermCard';
import AuthContext from '../context/AuthContext';
import { getAllTerms } from '../helpers/api-util';

export default function Home({ terms }) {
  const { user, login, logout } = useContext(AuthContext);
  const [termIdx, setTermIdx] = useState(0);

  const termOfTheDay = terms[termIdx];

  let max = terms.length || 30

  return (
    <div className="wrapper">
      <TermCard term={termOfTheDay} type={'term-of-day'} />
      <TermCard term={termOfTheDay} type={'most-liked'} />
    </div>
  )
}

export async function getStaticProps() {
  const terms = await getAllTerms();

  return { props: { terms }}
}
