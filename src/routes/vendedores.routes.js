import {Router} from  'express';
import { getVendedor } from '../controllers/vendedores.controllers';

const router = Router();


router.get('/api/vendedores/:IdVendedor', getVendedor)


export default router
