import {Router} from  'express'
import  {getPedidoDetalle, getPedidos} from '../controllers/pedidos.controllers'

const router = Router()


router.get('/api/pedidos/search',getPedidos)
router.get('/api/pedidos/:IdNotaDeVenta',getPedidoDetalle)

export default router