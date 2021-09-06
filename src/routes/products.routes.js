import { Router} from  'express'
import  {getDetalle,getProductPaginado,getImagenes,getListaDePrecios} from '../controllers/products.controller'

const router = Router()


router.get('/api/products/:IdArticulo',getDetalle);
router.get('/api/productspaginado/search',getProductPaginado);
router.get('/api/products/imagenes/:IdArticulo',getImagenes);
router.get('/api/products/precios/listas',getListaDePrecios);
  

export default router