import LikeButton from '../LikeButton/LikeButton';
import moment from 'moment';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';
import { API_STRING } from '../../../helpers/constants';
import {termFormat} from '../../../helpers/formatting';
import styles from './term-card.module.css';
import {AiTwotoneLike, AiOutlineCalendar} from 'react-icons/ai';

export default function TermCard({ term, type }) {
  const { user } = useContext(AuthContext);
  let title;
  let date = moment().format("MM[/]DD[/]YYYY");

  const like = () => {
    axios.post(`${API_STRING}/likes/new`, { term_id: term.term_id, user_id: user.user_id }).then(res => console.log(res.data))
  }

  const unlike = () => {
    let token = null;
    if (user) { token = localStorage.getItem('token') }
    axios.delete(`${API_STRING}/likes/${term.term_id}`, { headers: { Authorization: 'Bearer ' + token } }).then(res => console.log(res.data))
  }

  const updateLikes = likeObj => {

  }
  
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

        <LikeButton likes={term.likes} likeFn={like} unlikeFn={unlike} user={user} />
      </div>

    </section>
  )
}
