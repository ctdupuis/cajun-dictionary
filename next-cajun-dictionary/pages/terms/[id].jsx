import axios from "axios";
import { getAllTerms, getTermById } from "../../helpers/api-util";
import TermCard from '../../components/ui/Terms/TermCard';
import { API_STRING } from "../../helpers/constants";

export default function TermShowPage({ term }) {

  return (<div className="wrapper">
    <TermCard term={term} />
  </div>)
    
}

export async function getStaticProps(context) {
  const term_id = +context.params.id;

  const term = await getTermById(term_id)

  return {
    props: { term: term },
    revalidate: 100
  }
}

export async function getStaticPaths() {
  const terms = await getAllTerms();

  const paths = terms.map(term => ({ params: { id: term.term_id + "" } }) )

  return {
    paths: paths,
    fallback: 'blocking'
  }
}