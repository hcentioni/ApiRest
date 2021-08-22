import {config} from 'dotenv'
config();

export default {
    port: process.env.PORT || 3001,
    secret: process.env.SECRETO || '*Abc123*???'
}