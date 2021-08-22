import {Router} from  'express'
import  {getProducts,getProduct,getProductDetalle,getProductPaginado,getImagenes} from '../controllers/products.controller'

const router = Router()

router.get('/api/products',getProducts)
router.get('/api/products/:IdArticulo',getProduct)
router.get('/api/productDetalleOne/:IdArticulo',getProductDetalle)
router.get('/api/productspaginado/search',getProductPaginado)
router.get('/api/products/imagenes/:IdArticulo',getImagenes)

export default router