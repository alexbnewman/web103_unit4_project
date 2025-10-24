import pool from "../config/database.js"

// id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             color VARCHAR(255) NOT NULL,
//             price VARCHAR(10) NOT NULL,
//             wheels VARCHAR(255) NOT NULL,
//             interior TEXT NOT NULL,
//             convertible BOOLEAN NOT NULL

const createCar = async (req, res) => {
    try {
        const { name, color, price, wheels, interior, convertible } = req.body
        const results = await pool.query(`
            INSERT INTO cars (name, color, price, wheels, interior, convertible)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, color, price, wheels, interior, convertible])
        res.status(201).json(results.rows[0])
    } catch (error) {
        console.error('⚠️ error creating car', error)
        res.status(409).json({ error: error.message })
    }
}

const getCarsById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT name, price, wheels, interior, convertible, color
        FROM cars
        WHERE id = $1`
        const carId = req.params.carId;
        const results = await pool.query(selectQuery, [carId]);
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message} )
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, color, price, wheels, interior, convertible } = req.body
        const results = await pool.query(`
            UPDATE cars
            SET name = $1, color = $2, price = $3, wheels = $4, interior = $5, convertible = $6
            WHERE id = $7
        `, [name, color, price, wheels, interior, convertible, id])

        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error('⚠️ error updating car', error)
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error('⚠️ error deleting car', error)
        res.status(409).json({ error: error.message })
    }
}

const getCars = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM cars ORDER BY id`);
        res.status(200).json(results.rows)

    } catch (err) {
        res.status(409).json( { error: err.message } )
    }
}

export default {
    createCar,
    getCarsById,
    updateCar,
    deleteCar,
    getCars
}
