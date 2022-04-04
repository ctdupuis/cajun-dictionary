import axios from 'axios';

export default function TermList(props) {
    
    return (
        <div className="wrapper">
            <section className="container bg-red1">
                <div className='container bg-white'>
                    
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