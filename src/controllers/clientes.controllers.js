import {getPoolExisting } from '../database/conections'

export function  getDatosCliente(req,res ) {
    getPoolExisting(req.decoded.user.BaseDatos)
       .then (pool => {
        pool.query(`[Web].[ClienteDetalleWebGet] @IdCliente= ${req.decoded.user.IdCliente}` )
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
  export function  getEstadoCta(req,res ) {
    getPoolExisting(req.decoded.user.BaseDatos)
       .then (pool => {
        console.log(req.query)
        pool.query(`[Venta].[ResumenDeMovimientosDeClientes] 
                     @IdCliente= ${req.decoded.user.IdCliente}
                    ,@fechaDesde ='${req.query.fechaDesde}' 
                    ,@fechaHasta='${req.query.fechaHasta}'
                    ,@Opcion  = 1
                    ,@OpcionCotiza  =0 ` )
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