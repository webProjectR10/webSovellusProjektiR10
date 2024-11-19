import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
//import { hash } from 'bcrypt'
//import jwt from 'jsonwebtoken'
//const { sign } = jwt

const __dirname = import.meta.dirname

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,"../test_movie.sql"), "utf8");
    pool.query(sql)
}

//no auth or protected routes yet so cant even test these
/*const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedPassword) =>{
        pool.query('INSERT INTO account (email,password) VALUES ($1,$2)',
            [email, hashedPassword]
        )
    })
}*/

/*const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY)
}*/

//export { initializeTestDb, insertTestUser, getToken }
export { initializeTestDb }