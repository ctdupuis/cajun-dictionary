import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import ModalContext from '../../../context/ModalContext';
import { useContext } from 'react';
import AuthForm from '../../forms/Auth/AuthForm';

export default function LikeButton({ likeCount, likeFn, unlikeFn, disabled, liked }) {
  const { setComponent } = useContext(ModalContext);

  return (
    <>
      <div className="flex center-just">
          <div className={styles.num_likes}>{ likeCount }</div>
          <div 
            className={disabled ? styles.disabled : styles.like_action}  
            onClick={disabled ? null : (liked ? unlikeFn : likeFn)}>      
            { liked ? 
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