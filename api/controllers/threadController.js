const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');


//the basic condition for thread requests
const threadCondition = (userId) => {return {
  //limits the attributes the result contains
  attributes: [
    'id',
    'title',
    'content',
    //reformats the date
    [Sequelize.fn('date_format', Sequelize.col('thread.createdAt'), '%d.%m.%Y'), 'createdAt'],
    'usersId',
    //get the username from the included table
    [Sequelize.col('user.userName'), 'creatorUserName'],
    //get the user id from the subscribed thread include
    [Sequelize.col('subscribedThreads.usersId'), 'subscriptionUsersId'],
  ],
  include: [{
      model: User,
      as: 'user',
      attributes: [],
    },
    {
      model: SubscribedThread,
      as: 'subscribedThreads',
      required: false,
      where: {
        usersId: userId
      },
      attributes: []
    },
    {
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
      //only get the most recent contribution
      limit: 1
    }
  ],
}}

/**
 * Returns all threads from the given forum id
 */
const findAll = (req, res) => {
  const forumId = req.params.forumId;
  const userId = (req.user) ? req.user.id : -1;
  let condition = {...threadCondition(userId)};
  condition.where = {
    forumsId: forumId,
  }
  console.log(forumId);
  //count all contributions before fetching the threads
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
      Thread.findAll(condition)
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
 */
const findOne = (req, res) => {
  const id = req.params.id;
  const userId = (req.user) ? req.user.id : -1;
  let condition = {...threadCondition(userId)};
  condition.where = {'id' : id};

  Contribution.count({
      group: ['threadsId'],
      where: {
        threadsId: id
      }
    })
    .then(data => {
      Thread.findAll(condition)
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
 */
const add = (req, res) => {
  const forumId = req.params.forumId;
  const thread = req.body;
  const userId = req.user.id;
  Thread.create({
      title: thread.title,
      content: thread.content,
      usersId: userId,
      forumsId: parseInt(forumId)
    })
    .then(data => {
      console.log(userId);
      res.json(data);
    })
    .catch(error => {
      console.error('Error:\t', error);
      res.sendStatus(500);
    });
}

const update = (req, res) => {
  console.log('Test');
  res.send(200);
  const receivedThread = req.body;
  const userId = req.user.id;
  Thread.findByPk(receivedThread.id)
  .then(thread => {
    thread.update({
      title: receivedThread.title,
      content: receivedThread.content
    })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
      console.error('Error:\t', error);
    })
  })
  .catch(error => {
    res.sendStatus(500);
    console.error('Error:\t', error);
  })
}

/**
 * deletes the thread that has the given id
 */
//TODO: remove or implement
const deleteOne = (req, res) => {
  res.sendStatus(200);
}

/**
 * This function is used to map the found contribution counts to the threads
 * @param {*} threads     the array of threads
 * @param {*} dataCounts  the array of counts that should be mapped to the threads
 * @returns mapped list of threads and counts
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
  update
}