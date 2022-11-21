const { request, response } = require('express');

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'db.xrznsauaygbswamezacw.supabase.co',
    database: 'postgres',
    password: 'wc-be-19/11',
    port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const findUser = (phoneOrEmail, password, response) => {

    let reg = /^\d+$/;

    if (reg.test(phoneOrEmail)) {
        // if numeric
        pool.query(`SELECT name, phone, password 
        FROM users 
        WHERE phone=$1
        AND password =$2`, [phoneOrEmail, password], (error, results) => {
            if (error) {
                response.send(error);
            }
            response.status(200).json(results.rows);
        })

    } else {
        pool.query(`SELECT name, email, password 
        FROM users 
        WHERE email=$1
        AND password =$2`, [phoneOrEmail, password], (error, results) => {
            if (error) {
                response.send(error);
            }
            response.status(200).json(results.rows);
        })
    }

}

module.exports = { getUsers, findUser }