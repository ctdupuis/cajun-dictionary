export default function TermCard(props) {

  let title;
  let date = new Date().toDateString();

  if (props.type === 'term-of-day') {
    title = (
      <div class="title flex space-bet" style={{ alignItems: "center"}}>
        <h3>Term of the Day</h3>
        <span id="date">{date}</span>
      </div>
    )
  } else if (props.type === 'most-liked') {
    title = (
      <div class="title">
        <h3>Most Liked Term</h3>
      </div>
    )
  } else {
    title = (<div>Title Here</div>)
  }

  return (
    <section className="container bg-red1" style={{width: "45%"}}>
      {title}
      <div className="container bg-white">
        <h3>TERM NAME</h3>
        <span className="pronounce">TERM PRONUNCIATION</span>

        <div className="definition">
          <p>
            <strong>Definition:</strong>
          </p>
          <p>
            TERM DEFINITION
          </p>
        </div>

        <div className="use-case">
          <p>
            <strong>Use Case:</strong>
          </p>
          <p>
            USE CASE
          </p>
        </div>

        <div className="likes-container">
          <div className="num_likes">6</div>
          <div className="like_action">Like</div>
        </div>
      </div>

    </section>
  )
}
