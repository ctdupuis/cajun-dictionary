import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import { useState } from 'react';

export default function LikeButton(props) {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  }

  return (
    <div className="flex center-just">
        <div className={styles.num_likes}>6</div>
        <div 
          className={styles.like_action}  
          onClick={handleClick}>      
          { liked ? 
            <AiTwotoneLike /> 
            : 
            <AiOutlineLike />
          }
        </div>
    </div>
  )
}
