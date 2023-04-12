const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    pokemons: Array,
    experience: Number,
    createdAt: Date,
})


const UserList = model("user", UserSchema);

module.exports = UserList;