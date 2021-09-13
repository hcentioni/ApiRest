import config from '../config'
import { createPool, getPool,  closePool } from '../database/conections'

const sqlConfigStatic = {
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbcatalogo,
    server: config.dbserver,
    port: parseInt(config.dbport),
    options: {
      encrypt:  JSON.parse(config.DBencrypt), 
      trustServerCertificate: JSON.parse(config.DBtrustServerCertificate) 
    }
  }

export function  getparametersByUrl(req, res, next) {
    console.log(req.body)
    createPool(sqlConfigStatic,'poolStatic')
       .then (pool => {
        pool.query(`[WebCF].[StringConnection] @tcURLBasePedidos = '${req.body.baseUrl}'`)
            .then (result => {
              if (result.recordset.length > 0){
                req.dataConnection  = result;
                next();
              }else{
                let respuesta = {
                  error: true,
                  status: 403,
                  mensaje: 'Url Source invalida'
                };
                res.status(403);
                res.json(respuesta);
              }             
            })
        })
       .catch(error => {
         console.error(error)
         let respuesta = {
          error: true,
          status: 403,
          mensaje: 'Error: ' + error
        };
        res.status(403);
        res.json(respuesta);
        });
  };
  