import {getPoolExisting } from '../database/conections'

export function  getMarcas(req,res ) {
    console.log(req.query);
    let Publicable = null;
    if (req.query.Publicable) {
        Publicable = parseInt(req.query.Publicable);
    }
    getPoolExisting(req.decoded.user.BaseDatos)
       .then (pool => {
        pool.query(`Sistema.MarcasGet 
                        @Publicable = ${Publicable}` )
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