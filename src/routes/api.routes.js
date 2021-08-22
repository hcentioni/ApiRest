import {Router} from  'express';
// import {getUsuarios} from '../controllers/usuarios'
import {verifyToken} from '../middleware/auth'
// import { singIn } from '../middleware/login'
// import {getparametersByUrl} from '../database/getparameters';

const router = Router()

//middleware
router.use('/api', verifyToken)
// router.use('/api/login', getparametersByUrl)

//rutas
// router.get('/api/productos', (req,res)=>{
//   //console.log(req.decoded.user.BaseDatos);
  
//   getUsuarios(req,res)
// })

// router.post('/api/login', (req,res)=>{
//   singIn(req,res,getConfigSql(req),req.dataConnection.recordset[0].BaseDatos)
// })

// // router.get('/api/usuarios', (req,res)=>{
// //     getUsuarios(res,getConfigSql(req),req.dataConnection.recordset[0].BaseDatos )
// // })

// function getConfigSql(req){
//   let sqlConfigDinamic = {
//     user: req.dataConnection.recordset[0].Usuario,
//     password: req.dataConnection.recordset[0].Clave,
//     database: req.dataConnection.recordset[0].BaseDatos,
//     server: req.dataConnection.recordset[0].svr,
//     port: req.dataConnection.recordset[0].port,
//     options: {
//       encrypt: false,
//       trustServerCertificate: true
//     }
//   }
//   return sqlConfigDinamic;
// }

export default router