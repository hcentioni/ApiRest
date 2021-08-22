import {Router} from  'express'
import {getMarcas} from '../controllers/marcas.controllers'
const router = Router()

router.get('/api/marcas',getMarcas)

export default router
