import { Router } from 'express'
import { auth } from '../helpers/auth.js'
import { getGroups } from '../controllers/groupController.js'

const router = Router()

router.get('/', getGroups)


export default router;