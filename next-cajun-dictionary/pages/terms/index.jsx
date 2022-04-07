import axios from 'axios';

export default function TermList(props) {
    const letters = props.terms.map(term => term.name.slice(0, 1).toUpperCase())

    const uniqLetters = letters.filter((letter, index, self) => self.indexOf(letter) == index)
    
    const titles = uniqLetters.map(letter => {
        let termsOfThisLetter = props.terms.filter(term => term.name.charAt(0).toUpperCase() === letter).map(term => {
            return(
                <div className="flex space-bet">
                    <a className="list">{term.name}</a>
                    <span>{term.username}</span>
                </div>
            )
        })
  
        return(
            <div className="word-wrapper">
                <div className="list-title flex space-bet">
                    <h3>{letter}</h3><h3>Submitted by</h3>
                </div>
                {termsOfThisLetter}
            </div>
        )
    })
    
    return (
        <div className="wrapper">
            <section className="container bg-red1">
                <div className='container bg-white'>
                    {titles}
                </div>
            </section>
        </div>
    )
}

export async function getStaticProps() {
    const res = await axios.get('http://localhost:3000/api/terms');
    const data = res.data.terms;

    return {
        props: { terms: data }
    }
}