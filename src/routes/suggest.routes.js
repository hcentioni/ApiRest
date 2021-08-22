import {Router} from  'express'
import {getSuggest} from '../controllers/suggest.controllers'
const router = Router()

router.get('/api/suggest/:suggest',getSuggest)
export default router
