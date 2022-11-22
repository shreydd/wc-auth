const { request, response } = require('express');
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'db.xrznsauaygbswamezacw.supabase.co',
    database: 'postgres',
    password: `${process.env.WC_USERS_SUPABASE_PASS}`,
    port: 5432,
});

let validUsers = [];

pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
        throw error
    }
    validUsers = results.rows;
})

const findUser = (phoneOrEmail, password, response) => {

    let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let phoneReg = /^\d+$/;

    let userExists = false;
    let userEmailExists = false;
    let userPhNoExists = false;

    // check if email and user email ID exists
    if (emailReg.test(phoneOrEmail)) {
        for (const validUser of validUsers) {
            if (validUser.email === phoneOrEmail) {
                userEmailExists = true;

                if (validUser.password === password) {
                    userExists = true;
                    response.status(200).json({"name":validUser.name})
                } else {
                    response.status(404).json({'error': 'password'});
                    break;
                }

            }
        }

        if (userEmailExists == false) {
            response.status(404).json({'error': 'email'})
        }
    }

    // check if ph no and user ph no exists
    else if (phoneReg.test(phoneOrEmail)) {
        for (const validUser of validUsers) {
            if (validUser.phone === phoneOrEmail) {
                userPhNoExists = true;

                if (validUser.password === password) {
                    userExists = true;
                    response.status(200).json({"name":validUser.name});
                } else {
                    response.status(404).json({"error": "password"});
                    break;
                }
            }
        }
        if (userPhNoExists == false) {
            response.status(404).json({"error": "phone"})
        }
    }

}

module.exports = { findUser }