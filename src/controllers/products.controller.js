import { getPoolExisting } from '../database/conections'

export function getProducts(req, res) {
  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`Web.ArticulosGet @IdLista =${req.decoded.user.IdLista}`)
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


export function getProduct(req, res) {
  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`Web.ArticulosGet @IdLista =${req.decoded.user.IdLista}, @IdArticulo = ${req.params.IdArticulo}`)
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

export function getProductDetalle(req, res) {
  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`Web.ArticuloDetalleWebGet @IdArticulo = ${req.params.IdArticulo},@IdCliente =${req.decoded.user.IdCliente}`)
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

export function getProductPaginado(req, res) {

  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {      
   
      let IdArticulo = null;
      if (req.query.IdArticulo) {
        IdArticulo = parseInt(req.query.IdArticulo);
      }

      let IdCategoria = null;
      if (req.query.IdCategoria) {
        IdCategoria = req.query.IdCategoria;
      }
      let IdMarca = null;
      if (req.query.IdMarca) {
        IdMarca = parseInt(req.query.IdMarca);
      }
      let tnCodigo = null;
      if (req.query.tnCodigo) {
        tnCodigo = `'${req.query.tnCodigo}'`;
      }
      let Detalle = null;
      if (req.query.Detalle) {
        Detalle = `'${req.query.Detalle}'`;
      }
      let IdSubCategoria = null;
      if (req.query.IdSubCategoria) {
        IdSubCategoria = parseInt(req.query.IdSubCategoria);
      }
      let IdFamlia = null;
      if (req.query.IdFamlia) {
        IdFamlia = parseInt(req.query.IdFamlia);
      }
      let tnTipoListado = null;
      if (req.query.tnTipoListado) {
        tnTipoListado = parseInt(req.query.tnTipoListado);
      }
      
      pool.query(`[Web].[ArticulosWebGet]
               @IdCliente =${req.decoded.user.IdCliente}, 
               @PageNum = ${req.query.PageNum} ,
               @PageSize = ${req.query.PageSize},
               @IdArticulo = ${IdArticulo},
               @IdCategoria = ${IdCategoria},
               @IdMarca = ${IdMarca},
               @tnCodigo= ${tnCodigo}, 
               @Detalle= ${Detalle}, 
               @IdSubCategoria= ${IdSubCategoria}, 
               @IdFamlia= ${IdFamlia},
               @tnTipoListado= ${tnTipoListado}`

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

export function getImagenes(req, res) {

  getPoolExisting(req.decoded.user.BaseDatos)
    .then(pool => {
      pool.query(`Compra.ArticuloImagenGet @IdArticulo = ${req.params.IdArticulo}`)
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