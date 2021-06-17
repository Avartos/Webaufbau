let threads = [
    {
      id: 1,
      subject: "Ein erster Thread",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      createdAt: "11.11.2011",
      numberOfPosts: 10,
      lastPoster: "Squid1701",
      lastPostDate: "12.11.2011",
      isSubscribed: false,
      posts: [
        {
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
      posts: [
        {
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
      posts: [
        {
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
      posts: [
        {
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

/**
 * Returns all threads from the given forum id
 * @param {*} req 
 * @param {*} res 
 */
const getAllThreads = (req,res) => {
    const forumId = req.params.forumId;
    res.json(threads);
}

/**
 * Returns the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const getSingleThread = (req, res) => {
    const id = req.params.id;
    const result = threads.find(thread => parseInt(thread.id) === parseInt(id));
    if(result) {
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
const addThread = (req, res) => {
    //get thread from body
    const thread = req.body;
    // calculate id for the new thread
    thread.id = Math.max.apply(Math, threads.map(thread => {return thread.id})) + 1;
    //get current date
    let today = new Date();
    let currentDateString = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
    thread.createdAt = currentDateString;
    //add thread to list
    threads = [...threads, thread];
    //send ok
    res.sendStatus(200);
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
    if(indexToUpdate !== -1) {
        threads[indexToUpdate].isSubscribed = threads[indexToUpdate].isSubscribed === true ? false : true;
    }
    res.send(200);
}

/**
 * deletes the thread that has the given id
 * @param {*} req 
 * @param {*} res 
 */
const deleteSingleThread = (req, res) => {
    const id = req.params.id;
    threads = threads.filter( thread => parseInt(thread.id) !== parseInt(id));
    res.sendStatus(200);
}

module.exports = {
    getAllThreads,
    getSingleThread,
    deleteSingleThread,
    addThread,
    subscribeThread
}