import {Router} from  'express'
import {getDatosCliente,getEstadoCta} from '../controllers/clientes.controllers'
const router = Router()

router.get('/api/clientes/datoscta',getDatosCliente)
router.get('/api/clientes/estadocta/search', getEstadoCta)
export default router
