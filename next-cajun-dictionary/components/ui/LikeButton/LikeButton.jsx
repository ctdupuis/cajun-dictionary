import styles from './like-btn.module.css';
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { API_STRING } from '../../../helpers/constants';
import axios from 'axios';

export default function LikeButton({ termId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const getCount = async(id) => {
    const res = await axios.get(`${API_STRING}/terms/${id}`)
  }

  const handleClick = () => {
    setLiked(!liked);
  }

  return (
    <div className="flex center-just">
        <div className={styles.num_likes}>{count}</div>
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

// export async function getStaticProps(context) {
//   const count = await getTermLikes(context.params.id)
// }
