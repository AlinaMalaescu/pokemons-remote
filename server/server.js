const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/UserList");
require("dotenv").config();
const { MONGO_URL } = process.env;
if (!MONGO_URL) {
    console.error("CHEY ERROR")
    process.exit(1);
}
const cors = require("cors");
const PORT = 3001;
app.use(cors())
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));



const main = async () => {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
      console.log("App is listening on 3001");
      console.log(`http://localhost:3001/`);
    });

}
app.post("/login", async (req, res) => {
    // console.log(req.body);
    const Users = await User.findOne({ username: `${req.body.user}` }).exec();
    const username = req.body.user;
    const password = req.body.password;
    // console.log(Users);
        (username == "" || password == "") ? res.json({ response: "case1" }) :
            Users ==null ? res.json({ response: "case2" }) :
                Users.password !== password ? res.json({ response: "case3" }) : res.json(Users) 

})
 
app.post("/signup", (req, res) => {

// console.log(req.body);
  const username = req.body.user;
  const email = req.body.email;
  const password = req.body.password;
  const createdAt = Date.now();
  const pokemons = req.body.pokemons;
  const experience = req.body.experience;

  const user = new User({
    username,
    email,
    password,
    createdAt,
    pokemons,
    experience,
  });
  user
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ succes: false }));
});

main().catch(err => {
    console.error(err)
    process.exit(1);
})