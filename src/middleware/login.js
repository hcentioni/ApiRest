import { createPool } from '../database/conections'
import app from '../app'
import jwt from 'jsonwebtoken';


export function singIn(req, res, sqlConfig, poolName, next) {
    console.log(req.body);
    createPool(sqlConfig, poolName)
        .then(pool => {
            pool.query(`Venta.ClientesLogin @userName = '${req.body.userName}',@userPass = '${req.body.userPass}'`)
                .then(result => {
                    if (result.recordset.length > 0 && (result.recordset[0].idCliente !==0 || result.recordset[0].IdClienteContacto!==0)) {
                        //Esta todo ok debo generar el token
                        const user = {
                            IdCliente: result.recordset[0].idCliente,
                            Codigo: result.recordset[0].Codigo,
                            RazonSocial: result.recordset[0].RazonSocial,
                            IdClienteContacto:result.recordset[0].IdClienteContacto,
                            Usuario:result.recordset[0].Usuario,
                            IdCondicionIva: result.recordset[0].IdCondicionIva,
                            IdCondicionDePago: result.recordset[0].IdCondicionDePago,
                            CtaCte: result.recordset[0].CtaCte,
                            CreditoMax: result.recordset[0].CreditoMax,
                            Dto: result.recordset[0].Dto,
                            Dto2: result.recordset[0].Dto2,
                            IdVendedor: result.recordset[0].IdVendedor,
                            IdLista: result.recordset[0].IdLista,
                            emailFE: result.recordset[0].emailFE,
                            emailUser:result.recordset[0].emailUser,
                            IdTransporte: result.recordset[0].IdTransporte,
                            BaseDatos : sqlConfig.database
                        };
                        jwt.sign({ user },  app.get('secret'),{expiresIn: 60 * 60 * 24} ,(err, token) => {
                            res.json({
                                token
                            })
                            req.dataUser = token;
                            next();
                        })        
                    } else {
                        let respuesta = {
                            error: true,
                            status: 511,
                            mensaje: 'User or Password invalid'
                        };
                        res.status(511);    
                        res.json(respuesta); 
                    }
                })     
        })
        .catch(error => {
            console.error(error)
            let respuesta = {
                error: true,
                status: 500,
                mensaje: 'Error Data Base'
            };
            res.status(500);
            res.json(respuesta);
        });
};

