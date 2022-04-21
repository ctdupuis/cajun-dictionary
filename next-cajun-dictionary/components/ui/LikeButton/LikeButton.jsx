import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import ModalContext from '../../../context/ModalContext';
import { useContext } from 'react';
import AuthForm from '../../forms/Auth/AuthForm';

export default function LikeButton({ likes, likeFn, unlikeFn, user, disabled }) {
  const { setComponent } = useContext(ModalContext);

  let likedByUser = null;

  let targetLike;

  if (likes && user) {
    targetLike = likes.find(like => like.user_id === user.user_id)
    targetLike ? likedByUser = true : null;
  }

  return (
    <>
      <div className="flex center-just">
          <div className={styles.num_likes}>{ likes ? likes.length : 0}</div>
          <div 
            className={disabled ? styles.disabled : styles.like_action}  
            onClick={disabled ? null : (likedByUser ? unlikeFn : likeFn)}>      
            { likedByUser ? 
              <AiTwotoneLike /> 
              : 
              <AiOutlineLike />
            }
          </div>
      </div>
      { disabled ? 
        <div className={styles.disabled_message}>
          <p>Please <a className={styles.link} href="#" onClick={() => setComponent(<AuthForm />)}>Log In</a> to vote</p>
        </div> 
        : 
        null}
    </>
  )
}