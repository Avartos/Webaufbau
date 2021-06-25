let threads = [{
    id: 1,
    subject: "Ein erster Thread",
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    createdAt: "11.11.2011",
    numberOfPosts: 10,
    lastPoster: "Squid1701",
    lastPostDate: "12.11.2011",
    isSubscribed: false,
    posts: [{
        id: 0,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 1,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 2,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 3,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
    ],
  },
  {
    id: 2,
    subject: "Noch ein erster Thread",
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    createdAt: "11.11.2011",
    numberOfPosts: 10,
    lastPoster: "Squid1701",
    lastPostDate: "12.11.2011",
    isSubscribed: false,
    posts: [{
        id: 0,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 1,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 2,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 3,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
    ],
  },
  {
    id: 3,
    subject: "Ein ersterer Thread",
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    createdAt: "11.11.2011",
    numberOfPosts: 10,
    lastPoster: "Squid1701",
    lastPostDate: "12.11.2011",
    isSubscribed: false,
    posts: [{
        id: 0,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 1,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 2,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 3,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
    ],
  },
  {
    id: 4,
    subject: "Der ersteste Thread",
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    createdAt: "11.11.2011",
    numberOfPosts: 10,
    lastPoster: "Squid1701",
    lastPostDate: "12.11.2011",
    isSubscribed: false,
    posts: [{
        id: 0,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 1,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 2,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
      {
        id: 3,
        subject: "tehest",
        body: "tehestText",
        user: "Squid1701",
      },
    ],
  },
]

const sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');


const currentUserId = 1;

/**
 * Returns all threads from the given forum id
 * @param {*} req 
 * @param {*} res 
 */
const findAll = (req, res) => {
  const forumId = req.params.forumId;
  Thread.findAll({
    attributes: {
      include: [
        // format the given date into a dd.mm.YYYY string
        [sequelize.fn('date_format', sequelize.col('contributions.createdAt'), '%d.%m.%Y'), 'lastPostDate'],
        //add and rename the column to the result
        [sequelize.col('contributions.user.username'), 'lastPostUsername'],
        [sequelize.fn('date_format', sequelize.col('thread.createdAt'), '%d.%m.%Y'), 'createdAt'],
        //count the occurance of the contributions
        [sequelize.fn("COUNT", sequelize.col("contributions.id")), "contributionCount"],
        [sequelize.col('subscribedThreads.usersId'), 'subscriptionUsersId']
      ]
    },
    // restrict query by where clause
    where: {
      forumsId: forumId,
    },
    group: ['id'],
    // join with table users and contributions and subscriptions for current user
    include: [{
        model: User,
        as: 'user'
      },
      {
        model: Contribution,
        as: 'contributions',
        include: [{
          model: User,
          as: 'user'
        }],
      },
      {
        model: SubscribedThread,
        as: 'subscribedThreads',
        required: false,
        where: {usersId: currentUserId}
      }
    ],
    // sort contributions by date
    order: [
      [{
        model: Contribution,
        as: 'contributions'
      }, 'createdAt', 'DESC']
    ],
    //don't send sub-arrays
    includeIgnoreAttributes: false,
  }, ).then(data => {
    res.json(data);
  }).catch(error => {
    console.error('Error:\t', error);
    res.sendStatus(500);
  });
}

/**
 * Returns the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const findOne = (req, res) => {
  const id = req.params.id;
  const result = threads.find(thread => parseInt(thread.id) === parseInt(id));
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

/**
 * Adds a new thread to the given forum id
 * @param {*} req 
 * @param {*} res 
 */
const add = (req, res) => {
  const forumId = req.params.forumId;
  const thread = req.body;

  Thread.create({
      title: thread.title,
      content: thread.content,
      usersId: 1,
      forumsId: parseInt(forumId)
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Error:\t', error);
      res.sendStatus(500);
    });
}

/**
 * changes subscription state of the given thread
 * @param {*} req 
 * @param {*} res 
 */
const subscribeThread = (req, res) => {
  const threadId = req.params.id;
  let indexToUpdate = threads.findIndex((thread) => {
    return parseInt(thread.id) === parseInt(threadId);
  });
  if (indexToUpdate !== -1) {
    threads[indexToUpdate].isSubscribed = threads[indexToUpdate].isSubscribed === true ? false : true;
  }
  res.send(200);
}

/**
 * deletes the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const deleteOne = (req, res) => {
  const id = req.params.id;
  threads = threads.filter(thread => parseInt(thread.id) !== parseInt(id));
  res.sendStatus(200);
}

module.exports = {
  findAll,
  findOne,
  deleteOne,
  add,
  subscribeThread
}