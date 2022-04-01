import { Fragment } from "react";

export default function TermCard(props) {

  let title = <div>Title Div</div>;

  // switch (props.type) {
  //   case "term-of-day":
  //     title = (
  //       <div className="title flex space-bet">
  //         <h3>Term of the Day</h3>
  //         <span className="date">Date goes here</span>
  //       </div>
  //     )
  //   case "most-liked":
  //     title = (
  //       <div className="title flex space-bet">
  //         <h3>Most Liked Term</h3>
  //       </div>
  //     )
  //   default: <div>Loading...</div>
  // }

  return (
    <section className="container bg-red1" style={{width: "45%"}}>
      {title}
      <div className="container bg-white">
        <h3>TERM NAME</h3>
        <span className="pronounce">TERM PRONUNCIATION</span>

        <div className="definition">
          <p>
            <strong>Definition:</strong>

            <blockquote>
              TERM DEFINITION
            </blockquote>
          </p>
        </div>

        <div className="use-case">
          <p>
            <strong>Use Case:</strong>

            <blockquote>
              USE CASE
            </blockquote>
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
