const config = {
  //path to the server, should be changed to the actual ip, if testing from another device is desired
  serverPath: "http://localhost:3001",
  numberOfThreads: 5,
  //controls how many contributions are visible below a thread in preview mode
  numberOfContributionPreviews: 5,
  //the max length of contributions for forums and threads
  shortenedDescriptionLength: 250,
  //the max length for titles in forums and threads
  shortenedTitleLength: 50,
  //the max length of fav bar entries
  favBarStringLength: 20,
  //the max length for titles in the contribution dropdown
  shortenedNotificationLength: 30,
};

export default config;
