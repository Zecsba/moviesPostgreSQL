require('../models')
const sequelize = require('../utils/connection')

const testMigrate = async() => {
    try {
        await sequelize.sync({force: true})
        console.log("DB reset 👌💪😊🚀");
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate()

//! 1- test post
//! 2- test getAll
//! 3- getOne
//! 4- put
//! 5- delete