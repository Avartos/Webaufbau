const User = require("../models/user.js");
const Login = require("../models/login.js");
const Image = require("../models/image.js");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authMiddleware.js");

const findAll = (req, res) => {
  User.findAll({
    // join with tables login and image
    include: [
      { model: Login, as: "login" },
      { model: Image, as: "image" },
    ],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:\t", error);
      res.sendStatus(500);
    });
};

const findOne = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId, {
    include: [
      { model: Login, as: "login" },
      { model: Image, as: "image" },
    ],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:\t", error);
      res.sendStatus(500);
    });
};

const findOneByName = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.passwordHash;

  User.findOne({
    where: { userName: userName },
    include: [{ model: Login, as: "login" }],
  })
    .then((user) => {
      if (!user) {
        console.log("nutzer nicht gefunden");
      } else {
        bcrypt
          .compare(password, user.login.passwordHash)
          .then((match) => {
            if (!match) console.log("No No");

            //sign create the token
            const accessToken = sign(
              { userName: user.userName, id: user.userId },
              "i677hf8kuah2basb0fasjb234faksbf"
            );

            res.json(accessToken);
          })

          .catch((error) => {
            console.log(
              "dis hat nich geklappt. der nutzer oder das passwort stimmen nich"
            );
          });
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const user = req.body;
  User.update(user)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:\t", error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;
  bcrypt.hash(req.body.passwordHash, 10).then((hash) => {
    User.create(
      {
        userName: user.userName,
        login: {
          passwordHash: hash,
        },
      },
      {
        include: [{ model: Login, as: "login" }], // join between User and Login. as means joincolumn
      }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:\t", error);
        res.sendStatus(500);
      });
  });
};

module.exports = {
  findAll,
  findOne,
  update,
  add,
  findOneByName,
};
