import db from './db';
const bcrypt = require('bcrypt');

// TERMS
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
    const likes = await getTermLikes(term.term_id);
    let likeObj = { ...likes};
    likeObj['0'][0]['likes'] = parseInt(likeObj['0'][0]['likes']);
    const termObject = await Object.assign(term, likeObj['0'][0]);
    return termObject;
}

export const getTermLikes = async(termId) => {
    const data = await db.query(
        `
        select count(*) as likes from likes
        where term_id=${termId};
        `
    )
    return data;
}

export const getMostLikedTerm = async() => {
    const res = await db.query(
        `
        select count(*) as likes, t.term_id, t.name, t.pronunciation, t.definition, t.use_case
        from terms t
        join likes l
        on t.term_id = l.term_id
        group by t.term_id, t.name, t.pronunciation, t.definition, t.use_case
        order by likes desc
        limit 1
        `
    )
    return res[0];
}

// AUTH

export const apiAuthCheck = async() => {
    
}

export const apiLogin = async({ username, password }) => {
    const res = await db.query(
        `
        select * from users where username='${username}';
        `
    )
    const existingUser = res[0].pop();
    const authenticated = bcrypt.compareSync(password, existingUser.password)
    if (authenticated) {
        return existingUser
    } else {
        return { error: 'USERNAME OR PASSWORD IS INCORRECT'}
    }
}

export const apiRegister = async({ username, password }) => {

}

// LIKES