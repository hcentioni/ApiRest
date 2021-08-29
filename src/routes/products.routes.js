import {Router} from  'express'
import  {getDetalle,getProductPaginado,getImagenes} from '../controllers/products.controller'

const router = Router()


router.get('/api/products/:IdArticulo',getDetalle)
router.get('/api/productspaginado/search',getProductPaginado)
router.get('/api/products/imagenes/:IdArticulo',getImagenes)

export default router