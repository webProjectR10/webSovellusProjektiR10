import { pool } from '../helpers/db.js'

const selectGroups = async () => {
    return await pool.query('SELECT * FROM groups')
}

export { selectGroups }