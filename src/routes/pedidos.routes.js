import {Router} from  'express'
import  {getPedidoDetalle, getPedidos,postPedidoInsert} from '../controllers/pedidos.controllers'

const router = Router()


router.get('/api/pedidos/search',getPedidos)
router.get('/api/pedidos/:IdNotaDeVenta',getPedidoDetalle)
router.post('/api/pedidos/',(req,res)=>{
    postPedidoInsert(req,res );
  })



export default router