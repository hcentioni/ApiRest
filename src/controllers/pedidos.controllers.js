import { getPoolExisting } from '../database/conections'

export function getPedidos(req, res) {

  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      let IdNotaDeVenta = null;
      if (req.query.IdNotaDeVenta) {
        IdNotaDeVenta = parseInt(req.query.IdNotaDeVenta);
      }
      pool.query(`[Venta].[NotaDeVentasGet]
                 @IdNotaDeVenta  =${IdNotaDeVenta} ,
                 @IdCliente =${req.decoded.user.IdCliente}, 
                 @fechaDesde = '${req.query.fechaDesde}' ,
                 @fechaHasta = '${req.query.fechaHasta}'`
      )
        .then(result => {
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

export function getPedidoDetalle(req, res) {

  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`Venta.NotaDeVentasDetalleGet
                 @IdNotaDeVenta  =${req.params.IdNotaDeVenta}`
      )
        .then(result => {
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

export function postPedidoInsert(req, res) {
  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`[Web].[NotadeVentasALLInsert] 
                      @TcJson ='${JSON.stringify(req.body)}'`
        ).then(result => {
          console.log('Ejecuto');
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