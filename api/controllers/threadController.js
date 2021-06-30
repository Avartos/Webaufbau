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

const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');


const currentUserId = 1;

const threadAttributes = [
  'id',
  'title',
  'content',
  [Sequelize.fn('date_format', Sequelize.col('thread.createdAt'), '%d.%m.%Y'), 'createdAt'],
  'usersId',
  [Sequelize.col('user.userName'), 'creatorUserName'],
  [Sequelize.col('subscribedThreads.usersId'), 'subscriptionUsersId'],
]

//Used to include contributions to thread
const contributionInclude = {
  model: Contribution,
  as: 'contributions',
  //Orders contributions to show the newest contribution first
  order: [
    [
      'createdAt', 'desc'
    ]
  ],
  //only display the creation date of the contribution
  attributes: [
    'usersId',
    [Sequelize.fn('date_format', Sequelize.col('contribution.createdAt'), '%d.%m.%Y'), 'createdAt'],
  ],
  //include the user to access its username
  include: [{
    model: User,
    as: 'user',
    attributes: ['userName']
  }],
  limit: 1
}

const subscriptionInclude = {
  model: SubscribedThread,
  as: 'subscribedThreads',
  required: false,
  where: {
    usersId: currentUserId
  },
  attributes: []
}

/**
 * Returns all threads from the given forum id
 * @param {*} req 
 * @param {*} res 
 */
const findAll = (req, res) => {
  const forumId = req.params.forumId;
  Contribution.count({
      group: ['threadsId'],
      include: [{
        model: Thread,
        as: 'thread',
        where: {
          forumsId: forumId
        }
      }],
    })
    .then(data => {
      Thread.findAll({
          attributes: threadAttributes,
          include: [{
              model: User,
              as: 'user',
              attributes: [],
            },
            subscriptionInclude,
            contributionInclude
          ],
          where: {
            forumsId: forumId
          },
        })
        .then(threadData => {
          let mappedData = addCountsToData(threadData, data);
          res.json(mappedData);
        })
        .catch(error => {
          console.error('Error:\t', error);
          res.sendStatus(500);
        })
    })
    .catch(error => {
      res.sendStatus(error);
    })
}

/**
 * Returns the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const findOne = (req, res) => {
  const id = req.params.id;
  Contribution.count({
    group: ['threadsId'],
    where: {
      threadsId: id
    }
  })
  .then(data => {
    Thread.findAll({
        attributes: threadAttributes,
        include: [{
            model: User,
            as: 'user',
            attributes: [],
          },
          subscriptionInclude,
          contributionInclude
        ],
        where: {
          id: id
        },
      })
      .then(threadData => {
        let mappedData = addCountsToData(threadData, data);
        res.json(mappedData);
      })
      .catch(error => {
        console.error('Error:\t', error);
        res.sendStatus(500);
      })
  })
  .catch(error => {
    res.sendStatus(error);
  })
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
 * deletes the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const deleteOne = (req, res) => {
  const id = req.params.id;
  threads = threads.filter(thread => parseInt(thread.id) !== parseInt(id));
  res.sendStatus(200);
}

/**
 * UThis function is used to map the found contribution counts to the threads
 * @param {*} threads
 * @param {*} dataCounts 
 * @returns 
 */
const addCountsToData = (threads, contributionCounts) => {
  const mappedArray = threads.map(entry => {
    let matchingCount = contributionCounts.find(countEntry => entry.id === countEntry.threadsId);
    if (matchingCount) {
      entry.dataValues.contributionCount = matchingCount.count;
    } else {
      entry.dataValues.contributionCount = 0;
    }
    return entry;
  });
  return mappedArray;
}

module.exports = {
  findAll,
  findOne,
  deleteOne,
  add,
}