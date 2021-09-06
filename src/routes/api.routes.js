import {Router} from  'express';
import {verifyToken} from '../middleware/auth'

const router = Router()

//middleware
router.use('/api', verifyToken)

export default router