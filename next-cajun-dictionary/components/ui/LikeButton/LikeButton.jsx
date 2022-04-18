import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext'
import axios from 'axios';
import { API_STRING } from '../../../helpers/constants';

export default function LikeButton({ termId }) {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);

  let likedByUser = null;

  useEffect(() => {
    axios.get(`${API_STRING}/likes/${termId}`)
    .then(res => setLikes(res.data))
  }, [])

  const like = () => {
    axios.post(`${API_STRING}/likes/new`, { term_id: termId, user_id: user.user_id }).then(res => console.log(res.data))
  }

  const unlike = () => {
    axios.delete(`${API_STRING}/likes/${termId}`, { user_id: user.user_id}).then(res => console.log(res.data))
  }

  let targetLike;

  if (likes && user) {
    targetLike = likes.find(like => like.user_id === user.user_id)
    targetLike ? likedByUser = true : null;
  }

  return (
    <div className="flex center-just">
        <div className={styles.num_likes}>{likes.length}</div>
        <div 
          className={styles.like_action}  
          onClick={likedByUser ? unlike : like}>      
          { likedByUser ? 
            <AiTwotoneLike /> 
            : 
            <AiOutlineLike />
          }
        </div>
    </div>
  )
}