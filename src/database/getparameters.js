import { createPool, getPool,  closePool } from '../database/conections'

const sqlConfigStatic = {
    user: "sa",
    password: "*Abc123*??",
    database: "AdmSrl",
    server: "192.168.88.2",
    port: 1434,
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

export function  getparametersByUrl(req, res, next) {
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
  