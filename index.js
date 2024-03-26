import express from 'express'
import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { config } from 'dotenv'

config()

let count = 1

const data = [
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
        "address": "123 Main St, City, Country",
        "age": 30
    },
    {
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "phone": "+1987654321",
        "address": "456 Elm St, Town, Country",
        "age": 25
    },
    {
        "name": "Michael Johnson",
        "email": "michaeljohnson@example.com",
        "phone": "+1122334455",
        "address": "789 Oak St, Village, Country",
        "age": 35
    },
    {
        "name": "Emily Brown",
        "email": "emilybrown@example.com",
        "phone": "+1555666777",
        "address": "101 Pine St, Hamlet, Country",
        "age": 28
    },
    {
        "name": "Daniel Martinez",
        "email": "danielmartinez@example.com",
        "phone": "+1444333222",
        "address": "202 Maple St, Village, Country",
        "age": 32
    }
]

const userSchema = new Schema({
    name: SchemaTypes.String,
    age: SchemaTypes.Number,
    email: SchemaTypes.String,
    phone: SchemaTypes.String,

    address: SchemaTypes.String,

    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema);

const configMongo = async () => {
    return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB')
            // const User = mongoose.model('User', userSchema);
        })
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

// User.insertMany(data).then(r => {
//     console.log(r);
// })

const main = () => {
    configMongo()

    const app = express()

    app.get("/users", async (req, res) => {
        count += 1
        console.log("request users: " + count);
        const dataMongo = await User.find()
        return res.send({
            data: dataMongo
        })
    })

    app.get("/count", (req, res) => {
        res.send({
            data: count
        })
    })

    app.listen(3000, () => {
        console.log("Sever start at http://localhost:3000");
    })
}

main()