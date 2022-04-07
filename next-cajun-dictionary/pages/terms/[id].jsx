import axios from "axios";
import { getAllTerms } from "../../helpers/api-util";

export default function TermShowPage(props) {
  return (
    <div>TermShowPage</div>
  )
}

export async function getStaticProps(context) {
  const term_id = context.params.id;

  const res = await axios.get(`http://localhost:3000/api/terms/${term_id}`)
  const data = res.data.term;

  return {
    props: { term: data }
  }
}

export async function getStaticPaths() {
  // const events = await getFeaturedEvents();

  // const paths = events.map(event => ({ params: { id: event.id } }) )

  // return {
  //   paths: paths,
  //   fallback: true
  // };

  const terms = await getAllTerms();

  const paths = terms.map(term => ({ params: { id: term.term_id } }) )

  return {
    paths: paths,
    fallback: true
  }
}