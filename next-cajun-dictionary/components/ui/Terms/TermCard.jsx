import LikeButton from '../LikeButton/LikeButton';
import styles from './term-card.module.css';
import {AiTwotoneLike, AiOutlineCalendar} from 'react-icons/ai';
import moment from 'moment';
import {termFormat} from '../../../helpers/formatting';


export default function TermCard({ term, type }) {

  let title;
  let date = moment().format("MM[/]DD[/]YYYY");
  
  if (type === 'term-of-day') {
    title = (
      <div className={styles.title} >
        <h3>Term of the Day</h3>
        <div className={styles.calendar_cont}>
          <AiOutlineCalendar />
          <span style={{ marginRight: "0.5%"}}>{date}</span>
        </div>
      </div>
    )
  } else if (type === 'most-liked') {
    title = (
      <div className={styles.title}>
        <h3>Most Liked Term</h3>
        <AiTwotoneLike />
      </div>
    )
  } else {
    title = null;
  }

  return (
    <section className="container bg-red1">
      {title}
      <div className="container bg-white">
        <h3>{term.name}</h3>
        <span className="pronounce">pronounced <i>{term.pronunciation}</i></span>

        <div className={styles.definition}>
          <p>
            <strong>Definition:</strong>
          </p>
          <p>
            {term.definition}
          </p>
        </div>

        <div className={styles.use_case}>
          <p>
            <strong>Use Case:</strong>
          </p>
          <p>
            {termFormat(term.use_case)}
          </p>
        </div>

        <LikeButton termId={term.term_id} />
      </div>

    </section>
  )
}
