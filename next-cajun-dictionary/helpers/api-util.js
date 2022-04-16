import db from './db';

export const getAllTerms = async() => {
    const res = await db.query(
      `
      select t.term_id, t.name, t.pronunciation, t.definition, t.use_case, u.username 
      from terms t
      join users u
      on t.user_id = u.user_id
      order by name asc;
      `
    )
    const terms = res[0];
    return terms;
}

export const getTermById = async(id) => {
    const res = await db.query(
        `
        select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
        from terms t
        join users u
        on t.user_id = u.user_id
        where term_id=${id};
        `
    )
    const term = res[0].pop();
    const likes = await db.query(`
    select count(*) as likes from likes
    where term_id=${term.term_id};
    `);
    console.log('THIS IS THE LIKES ===>', likes)
    const termObject = Object.assign({}, term, {likes: likes})
    console.log("TERM OBJECT ===> ", termObject['likes'])
    return termObject
}

export const getTermLikes = async(termId) => {
    const term = await getTermById(termId);
    const { term_id } = term;
    const data = await db.query(
        `
        select count(*) as likes from likes
        where term_id=${term_id};
        `
    )
    return data[0].pop()
}