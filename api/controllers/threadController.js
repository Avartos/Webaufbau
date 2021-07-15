const Sequelize = require('sequelize')
const Thread = require('../models/thread');
const User = require('../models/user');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');


//the basic condition for thread requests
const threadCondition = (userId) => {
  return {
    //limits the attributes the result contains
    attributes: [
      'id',
      'title',
      'content',
      //reformats the date
      [Sequelize.fn('date_format', Sequelize.col('thread.createdAt'), '%d.%m.%Y'), 'createdAt'],
      'usersId',
      'forumsId',
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
  }
}


// returns all threads from the given forum id
const findAll = (req, res) => {
  const forumId = req.params.forumId;
  const userId = (req.user) ? req.user.id : -1;
  const user = req.user;

  const orderBy = req.query.orderBy;
  const order = req.query.order === 'asc' ? 'asc' : 'desc';

  let condition = {
    ...threadCondition(userId)
  };

  if (orderBy) {
    condition.order = [
      [orderBy, order]
    ];
  }

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


// Returns the thread that has the given id
const findOne = (req, res) => {
  const id = req.params.id;
  const userId = (req.user) ? req.user.id : -1;
  const user = (req.user) ? req.user : null;
  let condition = {
    ...threadCondition(userId)
  };
  condition.where = {
    'id': id
  };

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

// Adds a new thread to the given forum id
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
      //update the updatedAt column of the forum
      Forum.findByPk(forumId)
        .then(forum => {
          // necessary to change updated At, simple update would not work
          forum.changed('updatedAt', true);
          forum.update({
              updatedAt: Sequelize.fn('NOW'),
            })
            .then(updatedForum => {
              res.json(data);
            })
        })
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
      if (userId !== thread.usersId && !isAdmin) {
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

const findByName = (req, res) => {
  const query = decodeURIComponent(req.query.q);
  const queryArray = getQueryParametersMapped(query)
  console.log('Test');
  Thread.findAll({
      attributes: [
        [Sequelize.fn('concat', 'Thread:'), 'flag'],
        'title',
        [Sequelize.fn('concat', '/contributions/', Sequelize.col('id')), 'link']
      ],
      where: {
        title: {
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

/**
 * Adds a count value to the thread to show, how many contriubutions have been committed to the thread
 * @param {*} thread            the target thread
 * @param {*} contributionCount the contribution count that should be mapped, will be 0 if not defined
 * @returns
 */
const mapCountToThread = (thread, contributionCount) => {
  if (contributionCount) {
    thread.dataValues.contributionCount = contributionCount.count;
  } else {
    thread.dataValues.contributionCount = 0;
  }
  return thread;
}

/**
 * Adds visibility levels to all threads
 * @param {*} threads a list of threads
 * @param {*} user    the currently logged in user that should be compared with the thread
 * @returns
 */
const addVisibilityToThreads = (threads, user) => {
  const mappedThreads = threads.map(thread => {
    return addVisibilityLevelToThread(thread, user);
  });
  return mappedThreads;
}

/**
 * Adds the visibility to one single thread. If the thread has been created by the given user
 * or the user has administrative privileges, the visibility level will be true
 * @param {*} thread  the thread that should be extended
 * @param {*} user    the user that should be compared
 * @returns
 */
const addVisibilityLevelToThread = (thread, user) => {
  if (user && (user.id === thread.dataValues.usersId || user.isAdmin)) {
    thread.dataValues.isEditable = true;
  } else {
    thread.dataValues.isEditable = false;
  }
  return thread;
}

/**
 * splites the query by whitespaces
 * @param {*} query  query that should be splitted
 * @returns an array of sequelize-substrings
 */
const getQueryParametersMapped = (query) => {
  const queryArray = query.split(' ');
  const mappedArray = queryArray.map((queryString) => {
    return ({
      [Sequelize.Op.substring]: queryString
    });
  });
  return mappedArray;
}



module.exports = {
  findAll,
  findByName,
  findOne,
  add,
  update
}