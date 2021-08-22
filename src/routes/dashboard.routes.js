import {Router} from  'express'
import {getSlaider} from '../controllers/dashboard.controllers'
const router = Router()

router.get('/api/dashboard/slaider',getSlaider)

export default router
