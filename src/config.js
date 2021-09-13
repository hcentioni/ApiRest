import {config} from 'dotenv'
config();

export default {
    port: process.env.PORT || 3001,
    secret: process.env.SECRETO || '*Abc123*???',
    dbuser: process.env.DBuser || 'sa',
    dbpass: process.env.DBpass || '*Abc123*??',
    dbcatalogo: process.env.dbcatalogo || 'AdmSrl',
    dbserver: process.env.DBserver || '192.168.88.2',
    dbport: process.env.DBport || 1434,
    DBencrypt: process.env.DBencrypt || true,
    DBtrustServerCertificate: process.env.DBtrustServerCertificate || false
}