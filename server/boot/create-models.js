var async = require('async');

module.exports = function(app) {
  var mysqlDs = app.dataSources.db;
  async.parallel({
    people: async.apply(createMovies),
    users: async.apply(createUsers),
  }, function(err, results) {
    if (err) throw err;
  });

  // create reviewers
  function createMovies(cb) {
    mysqlDs.automigrate('Movie', function(err) {
      if (err) return cb(err);
      app.models.Movie.create([{
        name: 'Bob',
        year: 2015
      }], cb);
    });
  }

  function createUsers(cb) {
    mysqlDs.automigrate(['User', 'AccessToken', 'ACL'], function(err) {
      if (err) return cb(err);
      app.models.User.create([{
        username: 'kahwee',
        email: 'tengkahwee@gmail.com',
        password: '!password1'
      }], cb);
    });
  }
};
