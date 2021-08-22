import {ConnectionPool} from 'mssql'

const POOLS = {}

export function createPool(config, name) {
  if (getPool(name)) {
    //console.log ('reutiliza: ' + name)
    return Promise.resolve(POOLS[name])
    //Promise.reject(new Error('Pool with this name already exists'))
  }
 // console.log ('Creo: ' + name)
  return (new ConnectionPool(config)).connect().then((pool) => {
    return POOLS[name] = pool
  })
}

export function closePool(name) {
  const pool = getPool(name)
  if (pool) {
    delete POOLS[name]
    return pool.close()
  }
  return Promise.resolve()
}

export  function getPool(name) {
  if (POOLS[name]) {
    //return POOLS[name]
    return Promise.resolve(POOLS[name])
  }

}
export async function getPoolExisting(name) {
  if (!Object.prototype.hasOwnProperty.call(POOLS, name)) {
    Promise.reject(new Error('Pool with this name not already exists'))
    }
  return POOLS[name]
}