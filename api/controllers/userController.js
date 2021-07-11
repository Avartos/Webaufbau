const User = require("../models/user.js");
const Login = require("../models/login.js");
const Image = require("../models/image.js");
const bcrypt = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");
const Sequelize = require('sequelize');
const { CropLandscapeOutlined } = require("@material-ui/icons");

const findAll = (req, res) => {
  User.findAll({
      attributes: [
        'id',
        'userName',
        [Sequelize.col('login.isAdmin'), 'isAdmin'],
        [Sequelize.col('login.isEnabled'), 'isEnabled'],
        [Sequelize.col('image.profilePicturePath'), 'profilePicturePath'],
        [Sequelize.col('image.description'), 'imageDescription']

      ],
      // join with tables login and image
      include: [{
          model: Login,
          as: "login",
          attributes: []
        },
        {
          model: Image,
          as: "image",
          attributes: []
        },
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
  const userId = (req.user) ? req.user.id : -1;

  User.findByPk(userId, {
      include: [{
          model: Login,
          as: "login"
        },
        {
          model: Image,
          as: "image"
        },
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
      attributes: [
        'userName',
        'id',
        [Sequelize.col('login.passwordHash'), 'passwordHash'],
        [Sequelize.col('login.isAdmin'), 'isAdmin'],
        [Sequelize.col('login.isEnabled'), 'isEnabled'],
        [Sequelize.col('image.profilePicturePath'), 'profilePicturePath'],
      ],
      where: {
        userName: userName
      },
      include: [{
        model: Login,
        as: "login"
      }, {
        model: Image,
        as: 'image'
      }],
    })
    .then((user) => {
      user = user.dataValues;
      if (!user || !user.isEnabled) {
        res.sendStatus(401);
        console.error('Error:\t', `Login for user ${userName} failed`);
      } else {
        bcrypt
          .compare(password, user.passwordHash)
          .then((match) => {
            if (!match) {
              res.sendStatus(403);
            }

            //sign create the token
            const accessToken = sign({
                userName: user.userName,
                id: user.id,
                isAdmin: user.isAdmin,
              },
              "i677hf8kuah2basb0fasjb234faksbf"
            );
            const tokenObject = {
              accessToken: accessToken,
              profilePicturePath: user.profilePicturePath,
              isAdmin: user.isAdmin,
            }
            res.json(tokenObject);
          })
          .catch((error) => {
            console.log(error => {
              console.error('Error:\t', error);
              res.sendStatus(500);
            });
          });
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
};

const updateLogin = (req, res) => {
  const userId = req.params.id;
  const isAdmin = req.body.isAdmin;
  const isEnabled = req.body.isEnabled;
  const isCurrentUserAdmin = req.user.isAdmin;

  if(!isCurrentUserAdmin) {
    res.sendStatus(403);
    return;
  }

  Login.findOne({
    include: [{
      model: User,
      as: 'user',
      where: {id: userId},
      attributes: [],
    }],
    attributes: [
      'id',
      'isAdmin',
      'isEnabled',
      [Sequelize.col('user.id'), 'userId']
    ]
  })
  .then(login => {
    login.update({
      isAdmin: isAdmin,
      isEnabled: isEnabled
    })
    .then(updatedLogin => {
      console.log(updatedLogin);
      res.json(updatedLogin);
    })
  })
  .catch(error => {
    console.error('Error:\t', error);
    res.sendStatus(500);
  })
}

const add = (req, res) => {
  const user = req.body;
  bcrypt.hash(req.body.passwordHash, 10).then((hash) => {
    User.create({
        userName: user.userName,
        login: {
          passwordHash: hash,
        },
      }, {
        include: [{
          model: Login,
          as: "login"
        }], // join between User and Login. as means joincolumn
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:\t", error);
        res.sendStatus(500);
      });
  });
};

const updateImage = (req, res) => {
  const userId = req.user.id;
  const imageId = req.params.id;
  User.findByPk(userId, {
      include: {
        model: Image,
        as: 'image'
      }
    })
    .then(user => {
      user.update({
          imagesId: imageId
        })
        .then(user => {
          //search image to return
          Image.findByPk(imageId)
            .then(image => {
              console.log(image);
              res.json(image);
            })
        });
    })
    .catch(error => {
      res.sendStatus(500);
      console.error('Error:\t', error);
    });
}

const updatePassword = (req, res) => {
  const userId = req.user.id;
  const password = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const repeatedPassword = req.body.repeatedPassword;

  //find user from database
  Login.findOne({
      attributes: [
        'id',
        // 'usersId',
        'passwordHash'
      ],
      include: [{
        model: User,
        as: 'user',
        where: {
          id: userId
        },
        attributes: []
      }]
    })
    .then(login => {
      //check if the password matches the saved password
      bcrypt
        .compare(password, login.dataValues.passwordHash)
        .then((match) => {
          if (!match) {
            res.sendStatus(403);
          } else {
            //check if both new passwords are equal
            if (newPassword === repeatedPassword) {
              bcrypt.hash(newPassword, 10)
                .then((hash) => {
                  //save the new hash to the database
                  login.update({
                      passwordHash: hash
                    })
                    .then(data => {
                      res.sendStatus(200);
                    })
                });
            } else {
              res.sendStatus(500);
            }
          }
        });
    })
    .catch(error => {
      console.error('Error:\t', error);
      res.sendStatus(500);
    });
}

module.exports = {
  findAll,
  findOne,
  updateLogin,
  add,
  findOneByName,
  updateImage,
  updatePassword
};