import LikeButton from '../LikeButton/LikeButton';
import moment from 'moment';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';
import TermContext from '../../../context/TermContext';
import { useContext, useState } from 'react';
import { API_STRING } from '../../../helpers/constants';
import {termFormat} from '../../../helpers/formatting';
import styles from './term-card.module.css';
import {AiTwotoneLike, AiOutlineCalendar} from 'react-icons/ai';

export default function TermCard({ term, type }) {
  const { user } = useContext(AuthContext);
  const { terms, setTerms } = useContext(TermContext);

  let targetLike = user ? term.likes.find(like => like.user_id === user.user_id) : null

  const [liked, setLiked] = useState(targetLike ? true : false);
  const [likeCount, setLikeCount] = useState(term.likes.length);

  let title;
  let date = moment().format("MM[/]DD[/]YYYY");

  const like = () => {
    axios.post(`${API_STRING}/likes/new`, { term_id: term.term_id, user_id: user.user_id }).then(res => updateLikes(res.data.likes, terms, setTerms, 'like'))
  }

  const unlike = () => {
    let token = null;
    if (user) { token = localStorage.getItem('token') }
    axios.delete(`${API_STRING}/likes/${term.term_id}`, { headers: { Authorization: 'Bearer ' + token } }).then(res => updateLikes(res.data.likes, terms, setTerms, 'unlike'))
  }

  const updateLikes = (likeObj, terms, setTerms, status) => {
    const term_id = likeObj[0].term_id
    let keepers = terms.filter(term => term.term_id !== term_id)
    let target = terms.find(term => term.term_id === term_id)
    let idx = terms.indexOf(target)
    target.likes = [likeObj]
    keepers.splice(idx, 0, target)
    setTerms(keepers)
    if (status === 'like') {
      setLiked(true)
      setLikeCount(likeCount + 1)
    } else {
      setLiked(false)
      setLikeCount(likeCount - 1)
    }
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
        <h3>{termFormat(term.name)}</h3>
        <span className="pronounce">pronounced <i>{term.pronunciation}</i></span>

        <div className={styles.definition}>
          <p>
            <strong>Definition:</strong>
          </p>
          <p>
            {termFormat(term.definition)}
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

        <LikeButton likeCount={likeCount} likeFn={like} unlikeFn={unlike} user={user} disabled={!user ? true : false} liked={liked} />
      </div>

    </section>
  )
}
