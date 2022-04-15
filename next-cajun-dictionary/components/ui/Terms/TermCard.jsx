import LikeButton from '../LikeButton/LikeButton';
import styles from './term-card.module.css';
import {AiTwotoneLike, AiOutlineCalendar} from 'react-icons/ai';
import moment from 'moment';


export default function TermCard(props) {

  let title;
  let date = moment().format("MM[/]DD[/]YYYY");
  
  if (props.type === 'term-of-day') {
    title = (
      <div className={styles.title} >
        <h3>Term of the Day</h3>
        <div className={styles.calendar_cont}>
          <AiOutlineCalendar />
          <span style={{ marginRight: "0.5%"}}>{date}</span>
        </div>
      </div>
    )
  } else if (props.type === 'most-liked') {
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
        <h3>TERM NAME</h3>
        <span className="pronounce">TERM PRONUNCIATION</span>

        <div className={styles.definition}>
          <p>
            <strong>Definition:</strong>
          </p>
          <p>
            TERM DEFINITION
          </p>
        </div>

        <div className={styles.use_case}>
          <p>
            <strong>Use Case:</strong>
          </p>
          <p>
            USE CASE
          </p>
        </div>

        <LikeButton />
      </div>

    </section>
  )
}
