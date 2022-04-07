import styles from './like-btn.module.css'

export default function LikeButton(props) {
  return (
    <div className="flex center-just">
        <div className={styles.num_likes}>6</div>
        <div className={styles.like_action}>Like</div>
    </div>
  )
}
