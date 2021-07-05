const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');


const currentUserId = 1;

const threadCondition = (userId) => {return {
  attributes: [
    'id',
    'title',
    'content',
    [Sequelize.fn('date_format', Sequelize.col('thread.createdAt'), '%d.%m.%Y'), 'createdAt'],
    'usersId',
    [Sequelize.col('user.userName'), 'creatorUserName'],
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
      limit: 1
    }
  ],
}}

/**
 * Returns all threads from the given forum id
 * @param {*} req 
 * @param {*} res 
 */
const findAll = (req, res) => {
  const forumId = req.params.forumId;
  const userId = (req.user) ? req.user.id : -1;
  let condition = {...threadCondition(userId)};

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
 * @param {*} req 
 * @param {*} res 
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
 * @param {*} req 
 * @param {*} res 
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

/**
 * deletes the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const deleteOne = (req, res) => {
  // const id = req.params.id;
  // threads = threads.filter(thread => parseInt(thread.id) !== parseInt(id));
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