import {getPoolExisting } from '../database/conections'

export function  getMarcas(req,res ) {
    getPoolExisting(req.decoded.user.BaseDatos)
       .then (pool => {
        pool.query(`Sistema.MarcasGet` )
            .then (result => {
                res.json(result.recordset)  
            })
        })
       .catch(error => {
         console.error(error)
         let respuesta = {
          error: true,
          status: 400,
          mensaje: 'No hay pool'
        };
        res.status(400);
        res.json(respuesta);
        });
  };