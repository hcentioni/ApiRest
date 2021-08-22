import {getPoolExisting } from '../database/conections'

export function  getSlaider(req,res ) {
    getPoolExisting(req.decoded.user.BaseDatos)
       .then (pool => {
        pool.query('Web.SliderGet' )
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