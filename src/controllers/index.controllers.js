import { pool } from '../db.js' 
 
 export const pingControllers = async (req, res) => {
    const [result] = await pool.query('SELECT 1+1 AS result')
    // [result] Extrae la propiedad result del objeto json
    res.json(result[0])
    // result[0] Devuelve el 1er resultado del arreglo de objetos
}