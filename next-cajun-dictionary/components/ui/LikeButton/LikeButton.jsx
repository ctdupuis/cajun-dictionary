import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';

export default function LikeButton({ likes, likeFn, unlikeFn, user }) {
  let likedByUser = null;

  let targetLike;

  if (likes && user) {
    targetLike = likes.find(like => like.user_id === user.user_id)
    targetLike ? likedByUser = true : null;
  }

  return (
    <div className="flex center-just">
        <div className={styles.num_likes}>{ likes ? likes.length : 0}</div>
        <div 
          className={styles.like_action}  
          onClick={likedByUser ? unlikeFn : likeFn}>      
          { likedByUser ? 
            <AiTwotoneLike /> 
            : 
            <AiOutlineLike />
          }
        </div>
    </div>
  )
}