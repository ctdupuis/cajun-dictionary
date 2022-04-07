import styles from './term-card.module.css'

export default function TermCard(props) {

  let title;
  let date = new Date().toDateString();
  
  if (props.type === 'term-of-day') {
    title = (
      <div className={styles.title + " flex space-bet"} style={{ alignItems: "center"}}>
        <h3>Term of the Day</h3>
        <span id="date">{date}</span>
      </div>
    )
  } else if (props.type === 'most-liked') {
    title = (
      <div className={styles.title}>
        <h3>Most Liked Term</h3>
      </div>
    )
  } else {
    title = null;
  }

  return (
    <section className="container bg-red1" style={{width: "45%"}}>
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

        <div className="likes_container">
          <div className="num_likes">6</div>
          <div className="like_action">Like</div>
        </div>
      </div>

    </section>
  )
}
