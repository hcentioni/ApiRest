import express from 'express'
import config from './config'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit  from 'express-rate-limit'


//RUTAS
import apiRoute from './routes/api.routes'
import login from './routes/login.routes';
import apiUsers from './routes/usuarios.routes'
import empresa from './routes/empresa.routes';
import products from './routes/products.routes';
import uplaod from './routes/upload.routes';
import googlecloud from './routes/googlecloud.routes';
import marcas from './routes/marcas.routes'
import suggest from './routes/suggest.routes'
import clientes from './routes/clientes.routes'
import dasboard from './routes/dashboard.routes'
import pedidos from './routes/pedidos.routes'

import bodyParser from 'body-parser'
import morgan from 'morgan'

const app = express();

app.use(morgan('dev'));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use (cors());
app.use (helmet());
//app.use(limiter);
app.use(bodyParser.json());
app.set('port', config.port);
app.set('secret', config.secret);
//google storage
app.set('view engine', 'pug');

app.use(express.json());
app.use(apiRoute,login,empresa,apiUsers,googlecloud,products,uplaod,marcas,suggest,clientes,dasboard,pedidos)




export default app
