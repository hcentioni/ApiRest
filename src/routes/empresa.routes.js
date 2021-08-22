import {Router} from  'express';
import { getEmpresa } from '../controllers/empresa.controllers';

const router = Router();


router.get('/api/empresa', getEmpresa)


export default router
