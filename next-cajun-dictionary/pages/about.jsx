import styles from '../styles/about.module.css';

export default function AboutPage() {
  return (
    <div className='wrapper'>
        <div className="flex space-even">
            <section className="container bg-red1">

                <div className={styles.title}>
                    <h3><i>Notre but</i> | Our Purpose</h3>
                </div>

                <div className="container bg-white">
                    <p>
                    Here at Cajun Dictionary, we take pride in educating others. There are plenty of people who aren't familiar with Cajun slang, and they should be. We Cajuns can be hard to understand fairly often, so this app is meant to ease that language barrier between Cajuns and everyone else. We've pulled in definitions far and wide, from the Boudreaux's and Thibodeaux's just to make sure outsiders can understand us when we speak.
                    </p>
                </div>

                <div className={styles.title} style={{ marginTop: "2%" }} >
                    <h3><i>Co fait necessaire?</i> | Why is this necessary?</h3>
                </div>


                <div className="container bg-white">
                    <p>
                        Some may argue it's not, but I asked my Parran his thoughts and his incoherent babbling invoked a thought inside of me: <i>What if I could actually understand what this man is saying?</i> 
                        I think he mentioned something about cracklin, which is totally unrelated but led me to believe I could help myself and others finally understand my Parran's colorful, heavy-accented speech. It also led me to believe that I'm way overdue for a visit to Billy's.
                    </p>
                </div>


                <div className={styles.title} style={{ marginTop: "2%" }}>
                    <h3><i>Merci Spécial</i> | Special Thanks</h3>
                </div>

                <div className="container bg-white">
                    <p>
                        I'd like to take a second to say <i>merci beacoup</i> to all dem who made this app possible: ma mère Paula, mon grand-père Paul Raymond, ma grand-mère Anna Jane, ma belle-mère Naomi, mon Parran, mon cousin T John, mon cousin Bubba, mon chien Milo, mon oncle Ferdinand, mon meenoo Cosmo, Google and the internet in general, ma cousine Mandy, ma tante Bertha, tout les garçons dans le Bayou, ma cousine Tootie, mon cousin Jody, et tout mes camarades de classe.
                    </p>
                </div>
            </section>
        </div>
    </div>
  )
}
