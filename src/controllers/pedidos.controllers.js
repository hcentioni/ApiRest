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
      pool.query(`[Web].[NotaDeVentasWebInsert] 
                      @IdVendedor =${req.body.IdVendedor},
                      @IdCliente =${req.body.IdCliente},
                      @NetoGrabado =${req.body.NetoGrabado},
                      @Iva =${req.body.Iva},
                      @Total =${req.body.Total},
                      @Nota ='${req.body.Nota}'`)
        .then(result => {
 
          req.body.Productos.forEach(element => {

            pool.query(`[Web].[NotaDeVentasDetalleWebInsert] 
                         @IdNotaDeVenta =${result.recordset[0].ID},
                         @IdArticulo =${element.producto.IdArticulo},
                         @CodBarra ='${element.producto.Codigo}',
                         @ArtDetalle ='${element.producto.Detalle}',
                         @Cantidad =${element.cantidad},
                         @Lista_A =${element.producto.P_Neto},
                         @Lista_B =${element.producto.P_Final},
                         @SubTotal =${element.producto.P_FinalDto2},
                         @IdAlicuota =5,
                         @AlicuotaPorciento =${element.producto.Iva},
                         @AlicuotaValor =${element.producto.IvaValor},
                         @TotalConIva =${element.producto.IvaValor * element.cantidad},
                         @Idmoneda =5` )
          });
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

  
