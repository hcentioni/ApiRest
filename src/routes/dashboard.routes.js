import {Router} from  'express'
import {getSlaider, getWidget} from '../controllers/dashboard.controllers'
const router = Router()

router.get('/api/dashboard/slaider',getSlaider)

router.get('/api/dashboard/widget',getWidget)

export default router
