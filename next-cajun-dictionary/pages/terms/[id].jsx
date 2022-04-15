import axios from "axios";
import { getAllTerms } from "../../helpers/api-util";
import styles from '../../components/ui/Terms/term-card.module.css';
import LikeButton from "../../components/ui/LikeButton/LikeButton";

export default function TermShowPage({ term }) {

  return (
    <div className='wrapper'>
      <section className='container bg-red1'>
        <div className={styles.show + ' container bg-white'}>

          <div className={styles.title + " flex space-bet"}>
            <div className='flex col'>
              <h3>{term.name}</h3>
              <span>pronounced {term.pronunciation}</span>
            </div>
            <span>Submitted by {term.username}</span>
          </div>

          <div className={styles.definition}>
            <p>
              <strong>Definition:</strong>
            </p>

            <p>
              {term.definition}
            </p>
          </div>

          <div className={styles.use_case} >
            <p>
              <strong>Use Case:</strong>
            </p>
            <p>
              {term.use_case}
            </p>
          </div>

          <LikeButton />
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps(context) {
  const term_id = context.params.id;

  const res = await axios.get(`http://localhost:3000/api/terms/${term_id}`)
  const data = res.data.term;

  return {
    props: { term: data },
    revalidate: 30
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