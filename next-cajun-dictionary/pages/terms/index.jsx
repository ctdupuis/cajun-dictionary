import styles from '../../styles/term-list.module.css';
import { termFormat } from '../../helpers/formatting';
import Link from 'next/link';
import { useContext } from 'react';
import TermContext from '../../context/TermContext';

export default function TermList(props) {
    const { terms } = useContext(TermContext);

    const letters = terms.map(term => term.name.slice(0, 1).toUpperCase());

    const uniqLetters = letters.filter((letter, index, self) => self.indexOf(letter) == index);
    
    const titles = uniqLetters.map(letter => {
        let termsOfThisLetter = terms.filter(term => term.name.charAt(0).toUpperCase() === letter).map(term => {
            return(
                <div className="flex space-bet" key={term.term_id}>
                    <Link href={`/terms/${term.term_id}`} >
                        <a className={styles.list}>{termFormat(term.name)}</a>
                    </Link>
                    <span>{term.username}</span>
                </div>
            )
        })
  
        return(
            <div className={styles.word_wrapper} key={letter}>
                <div className={styles.list_title + " flex space-bet"} key={letter}>
                    <h4>{letter}</h4><h4>Submitted by</h4>
                </div>
                {termsOfThisLetter}
            </div>
        )
    })
    
    return (
        <div className="wrapper">
            <section className="container bg-red1">
                <div className='container bg-white'>
                    {terms ? titles : <div>Loading</div>}
                </div>
            </section>
        </div>
    )
}