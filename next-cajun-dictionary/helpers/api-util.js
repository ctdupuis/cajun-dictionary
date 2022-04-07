import db from './db';

export const getAllTerms = async() => {
    const res = await db.query(
      `
      select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
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
        order by name asc
        where term_id='${id}';
        `
    )
    const term = res[0];
    return term;
}