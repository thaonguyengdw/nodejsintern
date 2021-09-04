const router = require("express").Router();
const User = require("../models/user");

router.route("/").get(async (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:keyword").get(async (req, res) => {
  const { keyword } = req.params;
  User.find({
    $or: [
      { username: new RegExp(keyword, "i") },
      { email: new RegExp(keyword, "i") },
    ],
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  User.findById(req.params.id).then((user) => {
    const { username, email, birthday } = req.body;
    user.username = username;
    user.email = email;
    user.birthday = birthday;

    user
      .save()
      .then(() => res.json(user))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
