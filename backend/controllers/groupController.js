import { selectGroups } from '../models/group.js'


const getGroups = async (req, res, next) => {
    try {
        const result = await selectGroups()
        return res.status(200).json(result.rows)
    } catch (error){
        return next(error)
    }
}

export { getGroups }