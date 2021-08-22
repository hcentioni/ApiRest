import { createPool } from '../database/conections'

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
  export function  getparametersByUrl() {
    createPool(sqlConfigStatic,'poolStatic')
       .then (pool => {
        pool.query('SELECT a.Usuario AS [user],a.Clave AS [password],a.BaseDatos AS [database],a.svr AS [server],a.port ,a.URL_BasePedidos FROM Licencia.Asociados a (NOLOCK) WHERE a.URL_BasePedidos is not null')
            .then (result => {
              if (result.recordset.length > 0){
                console.log(result.recordset);
                return result.recordset;
              }else{
                return {};
              }             
            })
        })
       .catch(error => {
         console.error(error)
         return [];
        });
  };