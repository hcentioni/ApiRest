import {Router} from  'express';
import { getUsuarios } from '../controllers/usuarios';
//import {verifyToken} from '../middleware/auth';

const router = Router()

//middleware
//router.use('/api/users', verifyToken)

router.get('/api/users/:idCliente',(req,res)=>{
  getUsuarios(req,res );
  res.sendStatus=(200);
  res.json
})


  export default router