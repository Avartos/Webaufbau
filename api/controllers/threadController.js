const Sequelize = require('sequelize')
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
  const user = (req.user) ? req.user : null;

  let condition = {...threadCondition(userId)};
  condition.where = {
    forumsId: forumId,
  }
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
          mappedData = addVisibilityToThreads(mappedData, user);
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
  const user = (req.user) ? req.user : null;
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
          mappedData = addVisibilityToThreads(mappedData, user);
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
  const receivedThread = req.body;
  const userId = (req.user) ? req.user.id : -1;
  const isAdmin = (req.user) ? req.user.isAdmin : false
  Thread.findByPk(receivedThread.id)
  .then(thread => {
    if(userId !== thread.usersId && !isAdmin) {
      throw Error(`@user${userId} tried to modify @thread${receivedThread.id}`);
    }

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
    res.sendStatus(403);
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
  const mappedThreads = threads.map(thread => {
    let matchingCount = contributionCounts.find(countEntry => thread.id === countEntry.threadsId);
    return mapCountToThread(thread, matchingCount);
  });
  return mappedThreads;
}

const mapCountToThread = (thread, contributionCount) => {
  if (contributionCount) {
    thread.dataValues.contributionCount = contributionCount.count;
  } else {
    thread.dataValues.contributionCount = 0;
  }
  return thread;
}

const addVisibilityToThreads = (threads, user) => {
  const mappedThreads = threads.map(thread => {
    return addVisibilityLevelToThread(thread, user);
  });
  return mappedThreads;
}

const addVisibilityLevelToThread = (thread, user) => {
  if(user && (user.id === thread.dataValues.usersId || user.isAdmin)) {
    thread.dataValues.isEditable = true;
  } else {
    thread.dataValues.isEditable = false;
  }
  return thread;
}

const getQueryParametersMapped = (query) =>
{
  const queryArray = query.split(' ');
  const mappedArray = queryArray.map((queryString) => {
    return ({
      [Sequelize.Op.substring]: queryString
    });
  });
  return mappedArray;
}

const findByName = (req,res) => {
  const query = req.query.q;
  const queryArray = getQueryParametersMapped(query)
  Thread.findAll({
    where: {
      title:
          {
            [Sequelize.Op.or]: queryArray
          }
    }
  })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.log('Error:\t', error);
        res.sendStatus(500);
      })
}

module.exports = {
  findAll,
  findByName,
  findOne,
  deleteOne,
  add,
  update
}