import {Router} from  'express'
import  {getEstadoCta} from '../controllers/estadocta.controller'

const router = Router()

router.get('/api/estadocta', getEstadoCta)


export default router