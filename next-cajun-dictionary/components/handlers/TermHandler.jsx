// import { getAllTerms } from '../../helpers/api-util';
// import { useContext, useEffect } from 'react';
// import TermContext from '../../context/TermContext';

// export default function TermHandler({ terms }) {
//     const { setTerms } = useContext(TermContext);

//     useEffect(() => {
//         setTerms(terms)
//     }, [])

//     return <></>
// }

// export async function getStaticProps() {
//     const terms = await getAllTerms();

//     return { props: { terms: terms }}
// }