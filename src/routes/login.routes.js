import {Router} from  'express';
import {getparametersByUrl} from '../database/getparameters';
import { singIn } from '../middleware/login';
const router = Router()

//middleware
router.use('/login', getparametersByUrl)

//rutas
router.post('/login', (req,res)=>{
    singIn(req,res,getConfigSql(req),req.dataConnection.recordset[0].BaseDatos)
    if (res.error){
      res.send(error)
    }
  })

  function getConfigSql(req){
    let sqlConfigDinamic = {
      user: req.dataConnection.recordset[0].Usuario,
      password: req.dataConnection.recordset[0].Clave,
      database: req.dataConnection.recordset[0].BaseDatos,
      server: req.dataConnection.recordset[0].svr,
      port: req.dataConnection.recordset[0].port,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    }
    return sqlConfigDinamic;
  }

  export default router