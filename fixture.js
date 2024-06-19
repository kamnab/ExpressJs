const dbConnect = require('./db/db')
const User = require('./models/user')
const { faker } = require('@faker-js/faker')

dbConnect().catch(err => console.log(err))

// generate fake data
// faker.js

const numUser = 2000;

async function generate() {
    for (let i = 0; i < numUser; i++) {
        const user = new User({
            name: faker.internet.userName(),
            age: faker.number.int({ max: 100 }),
            email: faker.internet.email()
        })

        const result = await user.save();
        console.log(`${i} - User: ${result.name} generated.`);
    }
}

generate();