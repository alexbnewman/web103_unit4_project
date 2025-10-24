// Create tables, store custom items here

import pool from './database.js'
import './dotenv.js'

const createCustomCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            color VARCHAR(255) NOT NULL,
            price VARCHAR(10) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior TEXT NOT NULL,
            convertible BOOLEAN NOT NULL
        )
    `
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 car table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

createCustomCarTable()